import Peer, { DataConnection } from 'peerjs';
import type { Move, PieceColor } from '../chess/types';

export type OnlineRole = 'host' | 'guest';

export interface MoveMessage {
  type: 'move';
  move: Move;
  /** Sıra bilgisi (hamle sonrası yeni sıra) */
  nextTurn: PieceColor;
  fen: string; // board state hash for sync
  ply: number; // hamle sayısı
}

export interface StateMessage {
  type: 'state';
  board: import('../chess/types').Board;
  turn: PieceColor;
  history: Move[];
  enPassantTarget: import('../chess/types').Position | null;
  status: 'playing' | 'check' | 'checkmate' | 'stalemate';
  winner: PieceColor | null;
  ply: number;
}

export interface HelloMessage {
  type: 'hello';
  role: OnlineRole;
  campaignId: string;
  /** Misafirin host'a gönderdiği bağlantı onayı */
}

export interface ResignMessage {
  type: 'resign';
  /** İstifa eden taraf */
  by: PieceColor;
}

export interface RematchMessage {
  type: 'rematch';
}

export interface ChatMessage {
  type: 'chat';
  text: string;
  from: PieceColor;
}

export type OnlineMessage =
  | HelloMessage
  | MoveMessage
  | StateMessage
  | ResignMessage
  | RematchMessage
  | ChatMessage;

export interface OnlineCallbacks {
  onConnected?: () => void;
  onDisconnected?: () => void;
  onError?: (err: string) => void;
  onMove?: (msg: MoveMessage) => void;
  onState?: (msg: StateMessage) => void;
  onPeerJoined?: (role: OnlineRole) => void;
  onResign?: (msg: ResignMessage) => void;
  onRematch?: () => void;
  onChat?: (msg: ChatMessage) => void;
}

export type OnlineStatus =
  | 'idle'
  | 'creating'
  | 'waiting'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

/** 6 karakterlik okunabilir oda kodu üretir. */
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

/**
 * Online servis. Host veya Guest modunda çalışabilir.
 * - Host: peerId = roomCode, gelen bağlantıları kabul eder
 * - Guest: verilen peerId'ye bağlanır
 */
export class OnlineService {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private role: OnlineRole = 'host';
  private status: OnlineStatus = 'idle';
  private callbacks: OnlineCallbacks = {};
  private statusListeners: Set<(s: OnlineStatus) => void> = new Set();
  private roomCode: string = '';

  getStatus(): OnlineStatus {
    return this.status;
  }

  getRole(): OnlineRole {
    return this.role;
  }

  getRoomCode(): string {
    return this.roomCode;
  }

  getConnection(): DataConnection | null {
    return this.conn;
  }

  on(_event: 'status', cb: (s: OnlineStatus) => void): () => void {
    this.statusListeners.add(cb);
    return () => {
      this.statusListeners.delete(cb);
    };
  }

  setCallbacks(cb: OnlineCallbacks) {
    this.callbacks = cb;
  }

  private setStatus(s: OnlineStatus) {
    this.status = s;
    this.statusListeners.forEach((l) => l(s));
  }

  /** Oda kurar (host). roomCode otomatik üretilir. */
  async hostRoom(roomCode?: string): Promise<string> {
    this.disconnect();
    this.role = 'host';
    this.roomCode = roomCode ?? generateRoomCode();
    this.setStatus('creating');

    return new Promise((resolve, reject) => {
      // PeerJS'in default broker'ı 0.peerjs.com (ücretsiz, public).
      // Üretimda kendi broker'ımızı kurmak daha sağlıklı olur.
      this.peer = new Peer(this.roomCode, {
        debug: 0,
      });

      const timeout = setTimeout(() => {
        this.setStatus('error');
        this.callbacks.onError?.('Oda kurulamadı (zaman aşımı). Tekrar deneyin.');
        reject(new Error('timeout'));
        this.cleanup();
      }, 15000);

      this.peer.on('open', (id) => {
        clearTimeout(timeout);
        this.roomCode = id;
        this.setStatus('waiting');
        resolve(id);
      });

      this.peer.on('error', (err) => {
        clearTimeout(timeout);
        // 'unavailable-id' hatası: aynı ID kullanılıyor
        if (err.type === 'unavailable-id') {
          this.callbacks.onError?.('Bu oda kodu kullanımda. Yeni bir tane oluşturuluyor...');
          // otomatik yeniden dene
          this.cleanup();
          this.roomCode = generateRoomCode();
          this.hostRoom(this.roomCode).then(resolve).catch(reject);
        } else if (err.type === 'network' || err.type === 'server-error') {
          this.setStatus('error');
          this.callbacks.onError?.('Ağ hatası. İnternet bağlantınızı kontrol edin.');
          reject(err);
        } else if (err.type === 'peer-unavailable') {
          // misafir henüz bağlanmamış
        } else {
          this.setStatus('error');
          this.callbacks.onError?.(`Bağlantı hatası: ${err.message ?? err.type}`);
          reject(err);
        }
      });

      this.peer.on('connection', (conn) => {
        this.handleIncomingConnection(conn);
      });

      this.peer.on('disconnected', () => {
        if (this.status !== 'error') {
          this.setStatus('disconnected');
          this.callbacks.onDisconnected?.();
        }
      });
    });
  }

  /** Verilen roomCode'a misafir olarak bağlanır. */
  async joinRoom(roomCode: string): Promise<void> {
    this.disconnect();
    this.role = 'guest';
    this.roomCode = roomCode.trim().toUpperCase();
    this.setStatus('connecting');

    return new Promise((resolve, reject) => {
      // Misafir için rastgele bir peer ID
      const guestId = `g-${Math.random().toString(36).slice(2, 10)}`;
      this.peer = new Peer(guestId, { debug: 0 });

      const timeout = setTimeout(() => {
        this.setStatus('error');
        this.callbacks.onError?.('Odaya bağlanılamadı (zaman aşımı).');
        reject(new Error('timeout'));
        this.cleanup();
      }, 15000);

      this.peer.on('open', () => {
        clearTimeout(timeout);
        const conn = this.peer!.connect(this.roomCode, {
          reliable: true,
        });
        this.setupConnection(conn);
        conn.on('open', () => {
          this.setStatus('connected');
          this.sendHello();
          resolve();
        });
        conn.on('error', (err) => {
          this.setStatus('error');
          this.callbacks.onError?.(`Bağlantı hatası: ${err.message ?? err}`);
          reject(err);
        });
      });

      this.peer.on('error', (err) => {
        clearTimeout(timeout);
        if (err.type === 'peer-unavailable') {
          this.setStatus('error');
          this.callbacks.onError?.('Oda bulunamadı. Kodu kontrol edin.');
        } else if (err.type === 'network') {
          this.setStatus('error');
          this.callbacks.onError?.('Ağ hatası. İnternet bağlantınızı kontrol edin.');
        } else {
          this.setStatus('error');
          this.callbacks.onError?.(`Hata: ${err.message ?? err.type}`);
        }
        reject(err);
      });
    });
  }

  private handleIncomingConnection(conn: DataConnection) {
    if (this.conn && this.conn.open) {
      // Zaten bir bağlantımız var, yenisi reddedilir
      conn.close();
      return;
    }
    this.setupConnection(conn);
    conn.on('open', () => {
      this.setStatus('connected');
      this.sendHello();
      this.callbacks.onPeerJoined?.('guest');
    });
  }

  private setupConnection(conn: DataConnection) {
    this.conn = conn;
    conn.on('data', (data) => {
      this.handleMessage(data as OnlineMessage);
    });
    conn.on('close', () => {
      this.setStatus('disconnected');
      this.callbacks.onDisconnected?.();
    });
    conn.on('error', (err) => {
      this.setStatus('error');
      this.callbacks.onError?.(`Bağlantı koptu: ${err.message ?? err}`);
    });
  }

  private handleMessage(msg: OnlineMessage) {
    if (!msg || typeof msg !== 'object' || !('type' in msg)) return;
    switch (msg.type) {
      case 'move':
        this.callbacks.onMove?.(msg);
        break;
      case 'state':
        this.callbacks.onState?.(msg);
        break;
      case 'hello':
        this.callbacks.onPeerJoined?.(msg.role === 'host' ? 'host' : 'guest');
        break;
      case 'resign':
        this.callbacks.onResign?.(msg);
        break;
      case 'rematch':
        this.callbacks.onRematch?.();
        break;
      case 'chat':
        this.callbacks.onChat?.(msg);
        break;
    }
  }

  private sendHello() {
    if (this.conn?.open) {
      this.conn.send({ type: 'hello', role: this.role, campaignId: '' } as HelloMessage);
    }
  }

  sendMove(move: Move, nextTurn: PieceColor, ply: number) {
    if (this.conn?.open) {
      const msg: MoveMessage = {
        type: 'move',
        move,
        nextTurn,
        fen: '', // opsiyonel, senkron için eklenebilir
        ply,
      };
      this.conn.send(msg);
    }
  }

  sendState(state: Omit<StateMessage, 'type'>) {
    if (this.conn?.open) {
      const msg: StateMessage = { type: 'state', ...state };
      this.conn.send(msg);
    }
  }

  sendResign(by: PieceColor) {
    if (this.conn?.open) {
      this.conn.send({ type: 'resign', by } as ResignMessage);
    }
  }

  sendRematch() {
    if (this.conn?.open) {
      this.conn.send({ type: 'rematch' } as RematchMessage);
    }
  }

  sendChat(text: string, from: PieceColor) {
    if (this.conn?.open) {
      this.conn.send({ type: 'chat', text, from } as ChatMessage);
    }
  }

  /** Bağlantıyı temiz bir şekilde kapatır. */
  disconnect() {
    this.cleanup();
  }

  private cleanup() {
    try {
      this.conn?.close();
    } catch {
      // ignore
    }
    try {
      this.peer?.destroy();
    } catch {
      // ignore
    }
    this.conn = null;
    this.peer = null;
    this.setStatus('idle');
  }
}

/** Singleton servis — uygulama boyunca tek bir bağlantı. */
export const onlineService = new OnlineService();
