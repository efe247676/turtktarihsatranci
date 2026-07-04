import { useMemo, useState, type ReactElement, type ReactNode } from 'react';
import type { Board, Move, Piece, PieceColor, Position } from './types';
import { BOARD_SIZE, getLegalMoves, posEq, squareName } from './logic';
import { PieceIcon, getPieceName } from './pieces';
import { useMediaQuery } from '../hooks/useMediaQuery';
import type { Campaign } from './campaigns';
import { LokumSVG, BokSVG } from './EasterEgg';

interface BoardViewProps {
  board: Board;
  turn: PieceColor;
  enPassantTarget: Position | null;
  lastMove: Move | null;
  status: string;
  winner: PieceColor | null;
  onMove: (move: Move) => void;
  onReset: () => void;
  history: Move[];
  thinking: boolean;
  aiEnabled: boolean;
  onToggleAI: () => void;
  onBackToMenu?: () => void;
  campaign: Campaign;
  /** Online modda rakibin rolü (host/guest) */
  isOnline?: boolean;
  /** Online modda bu cihazın oynadığı taraf */
  myColor?: PieceColor;
  /** Online'da rakip bağlantısı koptuğunda haber ver */
  onLeaveOnline?: () => void;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function GameOverOverlay({
  status,
  winner,
  campaign,
  onRematch,
  onBackToMenu,
  isMobile,
}: {
  status: string;
  winner: PieceColor | null;
  campaign: Campaign;
  onRematch: () => void;
  onBackToMenu: () => void;
  isMobile: boolean;
}) {
  if (status !== 'checkmate' && status !== 'stalemate') return null;

  const isStalemate = status === 'stalemate';
  const isOttomanWinner = winner === 'white';
  const easterEgg = campaign.easterEgg === true;

  // easter egg modunda kazanan lokum, kaybeden bok
  const showEasterEgg = easterEgg && !isStalemate;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto p-3 sm:p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
      }}
    >
      <style>{`
        @keyframes ggPop { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes ggWobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
        @keyframes ggBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes ggFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ggSparkle { 0%, 100% { opacity: 0; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes ggPoof { 0% { transform: scale(1) rotate(0); opacity: 1; } 100% { transform: scale(1.4) rotate(20deg); opacity: 0; } }
        .gg-pop { animation: ggPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .gg-wobble { animation: ggWobble 2s ease-in-out infinite; }
        .gg-bounce { animation: ggBounce 1.4s ease-in-out infinite; }
        .gg-fade-up { animation: ggFadeUp 0.6s ease-out both; animation-delay: 0.4s; }
        .gg-sparkle { animation: ggSparkle 1.5s ease-in-out infinite; }
        .gg-poof { animation: ggPoof 0.4s ease-out both; }
      `}</style>

      <div
        className={`relative w-full max-w-md rounded-2xl border-2 ${
          isStalemate
            ? 'border-stone-500'
            : isOttomanWinner
            ? 'border-emerald-400 shadow-2xl shadow-emerald-500/40'
            : 'border-red-400 shadow-2xl shadow-red-500/40'
        } bg-gradient-to-b from-stone-900/95 to-stone-950/95 p-4 text-center backdrop-blur-md sm:p-6`}
      >
        {/* Background sparkles for easter egg */}
        {showEasterEgg && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {[
              [10, 15], [85, 20], [15, 80], [80, 75], [50, 10], [90, 50], [5, 50], [50, 90],
            ].map(([x, y], i) => (
              <span
                key={i}
                className="gg-sparkle absolute text-2xl"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                ✨
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          {/* Title */}
          <div className="mb-2 sm:mb-3">
            {isStalemate ? (
              <>
                <div className="gg-pop text-5xl sm:text-6xl">🤝</div>
                <h2 className="mt-1 bg-gradient-to-r from-stone-300 to-stone-100 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                  BERABERLİK
                </h2>
                <p className="mt-0.5 text-[11px] text-stone-400 sm:text-xs">
                  Pat durumu — ne kazanan ne kaybeden
                </p>
              </>
            ) : showEasterEgg ? (
              <>
                <div
                  className={`mb-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs ${
                    isOttomanWinner ? 'text-emerald-300' : 'text-red-300'
                  }`}
                >
                  🏆 {isOttomanWinner ? campaign.osmanliRulerTitle : campaign.enemyRulerTitle} KAZANDI!
                </div>
                <h2
                  className={`text-2xl font-black sm:text-3xl ${
                    isOttomanWinner
                      ? 'bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-red-200 to-red-400 bg-clip-text text-transparent'
                  }`}
                >
                  ŞAH MAT!
                </h2>
              </>
            ) : (
              <>
                <div
                  className={`gg-pop text-5xl sm:text-6xl ${
                    isOttomanWinner ? '' : 'gg-wobble'
                  }`}
                >
                  {isOttomanWinner ? '🏆' : '💀'}
                </div>
                <h2
                  className={`mt-1 bg-gradient-to-r ${
                    isOttomanWinner
                      ? 'from-emerald-200 to-emerald-400'
                      : 'from-red-200 to-red-400'
                  } bg-clip-text text-2xl font-black text-transparent sm:text-3xl`}
                >
                  ŞAH MAT!
                </h2>
                <p className="mt-0.5 text-[11px] text-amber-200/70 sm:text-xs">
                  {isOttomanWinner
                    ? `${campaign.osmanliRulerTitle} galip geldi!`
                    : `${campaign.enemyRulerTitle} galip geldi!`}
                </p>
              </>
            )}
          </div>

          {/* Images (easter egg) */}
          {showEasterEgg && (
            <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4 sm:gap-4">
              <div
                className={`flex flex-col items-center ${
                  isOttomanWinner ? 'gg-bounce' : 'gg-poof'
                }`}
                style={{ animationDelay: isOttomanWinner ? '0.2s' : '0s' }}
              >
                <LokumSVG size={isMobile ? 110 : 140} />
                <span
                  className={`mt-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs ${
                    isOttomanWinner ? 'text-pink-300' : 'text-stone-500 line-through'
                  }`}
                >
                  {campaign.osmanli.king}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] ${
                    isOttomanWinner ? 'text-emerald-300' : 'text-stone-500'
                  }`}
                >
                  Kazanan 🎉
                </span>
              </div>

              <div className="text-2xl text-amber-400 sm:text-3xl">⚔️</div>

              <div
                className={`flex flex-col items-center ${
                  !isOttomanWinner ? 'gg-bounce' : 'gg-poof'
                }`}
                style={{ animationDelay: !isOttomanWinner ? '0.2s' : '0s' }}
              >
                <BokSVG size={isMobile ? 110 : 140} />
                <span
                  className={`mt-1 text-[10px] font-bold uppercase tracking-widest sm:text-xs ${
                    !isOttomanWinner ? 'text-amber-300' : 'text-stone-500 line-through'
                  }`}
                >
                  {campaign.enemy.king}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] ${
                    !isOttomanWinner ? 'text-red-300' : 'text-stone-500'
                  }`}
                >
                  Kaybeden 💩
                </span>
              </div>
            </div>
          )}

          {!showEasterEgg && !isStalemate && (
            <div className="mb-3 sm:mb-4">
              <div className="gg-fade-up text-6xl sm:text-7xl">
                {isOttomanWinner ? '🌙' : '⚔️'}
              </div>
            </div>
          )}

          {showEasterEgg && (
            <p className="gg-fade-up mb-3 px-2 text-[11px] italic text-amber-200/80 sm:mb-4 sm:text-sm">
              {isOttomanWinner
                ? 'Osmanlılar zafer tatlısını hak etti! 🌙'
                : `${campaign.enemyName} bir gün bile sürmedi...`}
            </p>
          )}

          {/* Buttons */}
          <div className="gg-fade-up flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              onClick={onRematch}
              className="flex-1 rounded-xl border-2 border-amber-400 bg-gradient-to-br from-amber-500 to-amber-700 px-4 py-3 text-sm font-black text-amber-50 shadow-lg transition active:scale-95 hover:from-amber-400 hover:to-amber-600 sm:py-2.5 sm:text-base"
              style={{ touchAction: 'manipulation' }}
            >
              🔄 Yeni Savaş
            </button>
            <button
              onClick={onBackToMenu}
              className="flex-1 rounded-xl border-2 border-stone-500 bg-stone-800 px-4 py-3 text-sm font-bold text-stone-100 shadow transition active:scale-95 hover:bg-stone-700 sm:py-2.5 sm:text-base"
              style={{ touchAction: 'manipulation' }}
            >
              🏠 Ana Menü
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromotionDialog({
  color,
  onSelect,
  onCancel,
  isMobile,
}: {
  color: PieceColor;
  onSelect: (p: 'queen' | 'rook' | 'bishop' | 'knight') => void;
  onCancel: () => void;
  isMobile: boolean;
}) {
  const options: ('queen' | 'rook' | 'bishop' | 'knight')[] = ['queen', 'rook', 'bishop', 'knight'];
  const labels: Record<string, string> = {
    queen: color === 'white' ? 'Sadrazam' : 'Emirü’l-Ümera',
    rook: color === 'white' ? 'Sipahi' : 'Tümen Komutanı',
    bishop: color === 'white' ? 'Vezir' : 'Vezir-i Azam',
    knight: color === 'white' ? 'Akıncı' : 'Bahadır',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      onClick={onCancel}
    >
      <div
        className={`w-full rounded-t-2xl border-2 border-amber-600 bg-gradient-to-b from-amber-50 to-amber-100 shadow-2xl sm:max-w-md sm:rounded-2xl ${
          isMobile ? 'pb-[env(safe-area-inset-bottom)]' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        {isMobile && (
          <div className="flex justify-center pt-2">
            <div className="h-1.5 w-12 rounded-full bg-amber-700/40" />
          </div>
        )}
        <h3 className="px-4 pb-3 pt-3 text-center text-base font-bold text-amber-900 sm:text-lg">
          Terfi Seçimi — Yeniçeri/Mirza'yı seçin
        </h3>
        <div className="grid grid-cols-4 gap-2 px-4 pb-5 sm:gap-3 sm:px-6 sm:pb-6">
          {options.map((opt) => {
            const piece: Piece = { type: opt, color };
            return (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className="flex flex-col items-center gap-1 rounded-lg border-2 border-amber-700 bg-amber-50 p-2 transition active:scale-95 hover:bg-amber-200 sm:p-3"
              >
                <PieceIcon piece={piece} size={isMobile ? 44 : 56} />
                <span className="text-[10px] font-semibold text-amber-900 sm:text-xs">
                  {labels[opt]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface SidePanelProps {
  title: string;
  icon: string;
  active: boolean;
  onToggle: () => void;
  children: ReactNode;
  isMobile: boolean;
}

function SidePanel({ title, icon, active, onToggle, children, isMobile }: SidePanelProps) {
  if (!isMobile) {
    return <div className="w-full lg:w-64">{children}</div>;
  }
  return (
    <div className="w-full rounded-xl border border-stone-700 bg-stone-900/80">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition active:bg-stone-800"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-amber-200">
          <span className="text-lg">{icon}</span>
          {title}
        </span>
        <span
          className={`text-amber-400 transition-transform ${active ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      {active && <div className="border-t border-stone-700 p-3">{children}</div>}
    </div>
  );
}

export function BoardView({
  board,
  turn,
  enPassantTarget,
  lastMove,
  status,
  winner,
  onMove,
  onReset,
  history,
  thinking,
  aiEnabled,
  onToggleAI,
  onBackToMenu,
  campaign,
  isOnline = false,
  myColor,
  onLeaveOnline,
}: BoardViewProps) {
  const [selected, setSelected] = useState<Position | null>(null);
  const [promotion, setPromotion] = useState<{ from: Position; to: Position } | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [mobileTab, setMobileTab] = useState<'osmanli' | 'timur' | 'history' | null>(null);

  const isMobile = useMediaQuery('(max-width: 1023px)');

  const legalMoves = useMemo(() => {
    if (!selected) return [];
    return getLegalMoves(board, selected, enPassantTarget);
  }, [board, selected, enPassantTarget]);

  const checkedKingPos = useMemo(() => {
    if (status !== 'check' && status !== 'checkmate') return null;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const p = board[r][c];
        if (p && p.type === 'king' && p.color === turn) return { row: r, col: c };
      }
    }
    return null;
  }, [board, turn, status]);

  const handleSquareClick = (pos: Position) => {
    if (promotion) return;
    if (status === 'checkmate' || status === 'stalemate') return;
    // Sıra kısıtlaması: AI modunda siyah AI'ya ait, online'da sıra kimdeyse o
    if (turn === 'black' && aiEnabled) return;
    if (isOnline && myColor && turn !== myColor) return;

    const piece = board[pos.row][pos.col];

    if (selected) {
      const move = legalMoves.find((m) => posEq(m.to, pos));
      if (move) {
        if (move.piece.type === 'pawn') {
          const promoRow = move.piece.color === 'white' ? 0 : 7;
          if (move.to.row === promoRow) {
            setPromotion({ from: move.from, to: move.to });
            setSelected(null);
            return;
          }
        }
        onMove(move);
        setSelected(null);
        return;
      }
      if (piece && piece.color === turn) {
        setSelected(pos);
        return;
      }
      setSelected(null);
    } else {
      if (piece && piece.color === turn) {
        setSelected(pos);
      }
    }
  };

  const handlePromotion = (p: 'queen' | 'rook' | 'bishop' | 'knight') => {
    if (!promotion) return;
    const allMoves = getLegalMoves(board, promotion.from, enPassantTarget);
    const move = allMoves.find((m) => posEq(m.to, promotion.to));
    if (move) {
      onMove({ ...move, promotion: p });
    }
    setPromotion(null);
  };

  const renderBoard = (): ReactElement[] => {
    const rows: ReactElement[] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const displayR = flipped ? BOARD_SIZE - 1 - r : r;
        const displayC = flipped ? BOARD_SIZE - 1 - c : c;
        const piece = board[displayR][displayC];
        const isLight = (displayR + displayC) % 2 === 0;
        const isSelected = selected && posEq(selected, { row: displayR, col: displayC });
        const isLegal = legalMoves.some((m) => posEq(m.to, { row: displayR, col: displayC }));
        const isCapture = isLegal && piece;
        const isLastFrom = lastMove && posEq(lastMove.from, { row: displayR, col: displayC });
        const isLastTo = lastMove && posEq(lastMove.to, { row: displayR, col: displayC });
        const isChecked = checkedKingPos && posEq(checkedKingPos, { row: displayR, col: displayC });

        const baseColor = isLight ? 'bg-amber-100' : 'bg-amber-700';
        const highlight = isSelected
          ? 'ring-[3px] ring-yellow-400 ring-inset sm:ring-4'
          : isLastFrom || isLastTo
          ? 'ring-[3px] ring-blue-400/60 ring-inset sm:ring-4'
          : isChecked
          ? 'ring-[3px] ring-red-500 ring-inset animate-pulse sm:ring-4'
          : '';
        rows.push(
          <div
            key={`${displayR}-${displayC}`}
            onClick={() => handleSquareClick({ row: displayR, col: displayC })}
            className={`relative flex aspect-square w-full cursor-pointer items-center justify-center ${baseColor} ${highlight} transition-all active:brightness-95`}
            style={{
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {displayR === (flipped ? 0 : 7) && (
              <span
                className={`absolute bottom-px right-1 text-[8px] font-bold sm:bottom-0.5 sm:text-[10px] ${
                  isLight ? 'text-amber-800' : 'text-amber-100'
                }`}
              >
                {FILES[displayC]}
              </span>
            )}
            {displayC === (flipped ? 7 : 0) && (
              <span
                className={`absolute left-1 top-px text-[8px] font-bold sm:top-0.5 sm:text-[10px] ${
                  isLight ? 'text-amber-800' : 'text-amber-100'
                }`}
              >
                {RANKS[displayR]}
              </span>
            )}
            {isLegal && !isCapture && (
              <div className="absolute inset-0 m-auto h-[28%] w-[28%] rounded-full bg-emerald-500/70 shadow-lg" />
            )}
            {isCapture && (
              <div className="absolute inset-1 rounded-full border-[3px] border-emerald-500/80 sm:border-4" />
            )}
            {piece && (
              <div className="relative z-10 h-[88%] w-[88%] drop-shadow-lg">
                <PieceIcon piece={piece} size={isMobile ? 100 : 64} />
              </div>
            )}
          </div>
        );
      }
    }
    return rows;
  };

  const getStatusMessage = () => {
    if (status === 'checkmate') {
      const winnerName = winner === 'white'
        ? `Osmanlılar (${campaign.osmanliRulerTitle})`
        : `${campaign.enemyName} (${campaign.enemyRulerTitle})`;
      return `Şah Mat! 🏆 ${winnerName} kazandı!`;
    }
    if (status === 'stalemate') return 'Pat! Beraberlik.';
    if (status === 'check') return `⚠️ Şah! ${turn === 'white' ? campaign.osmanliRulerTitle : campaign.enemyRulerTitle} tehdit altında!`;
    if (isOnline) {
      if (turn === myColor) return '🟢 Senin sıran';
      return '🔴 Rakip düşünüyor...';
    }
    if (thinking) return `🤔 ${campaign.enemyName} düşünüyor...`;
    if (turn === 'white') return `Sıra: Osmanlılar (${campaign.osmanliRulerTitle})`;
    return `Sıra: ${campaign.enemyName} (${campaign.enemyRulerTitle})`;
  };

  const osmanliPanel = (
    <div
      className={`rounded-xl border-2 p-3 transition sm:p-4 ${
        turn === 'white'
          ? 'border-emerald-500 bg-emerald-50 shadow-2xl shadow-emerald-500/30'
          : 'border-stone-300 bg-stone-100'
      }`}
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 text-xl shadow-lg ring-2 ring-emerald-500 sm:h-12 sm:w-12 sm:text-2xl">
          🌙
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-emerald-800 sm:text-lg">Osmanlılar</h2>
          <p className="text-[10px] sm:text-xs">Hükümdar: {campaign.osmanliRulerTitle}</p>
        </div>
      </div>
      <div className="space-y-0.5 text-[11px] text-stone-700 sm:space-y-1 sm:text-xs">
        <p>♟ Piyon: {campaign.osmanli.pawn}</p>
        <p>♜ Kale: {campaign.osmanli.rook}</p>
        <p>♞ At: {campaign.osmanli.knight}</p>
        <p>♝ Fil: {campaign.osmanli.bishop}</p>
        <p>♛ Vezir: {campaign.osmanli.queen}</p>
        <p>♚ Şah: {campaign.osmanli.king}</p>
      </div>
      <div className="mt-2 rounded border border-emerald-300 bg-emerald-100/60 p-1.5 text-[9px] italic text-emerald-900 sm:mt-3 sm:p-2 sm:text-[10px]">
        "{campaign.osmanliQuote}" — {campaign.osmanliRulerTitle}
      </div>
    </div>
  );

  const enemyPanel = (
    <div
      className={`rounded-xl border-2 p-3 transition sm:p-4 ${
        turn === 'black'
          ? `${campaign.enemyAccent.secondary} bg-stone-800 text-amber-50 shadow-2xl ${campaign.enemyAccent.glow}`
          : 'border-stone-700 bg-stone-900/80 text-stone-300'
      }`}
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl shadow-lg ring-2 sm:h-12 sm:w-12 sm:text-2xl ${
          campaign.id === 'caldiran1514'
            ? 'bg-gradient-to-br from-red-800 to-stone-900 ring-red-500'
            : 'bg-gradient-to-br from-red-900 to-stone-900 ring-red-500'
        }`}>
          {campaign.enemyAccent.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className={`text-base font-bold sm:text-lg ${turn === 'black' ? campaign.enemyAccent.primary : ''}`}>
            {campaign.enemyName}
          </h2>
          <p className="text-[10px] sm:text-xs">Hükümdar: {campaign.enemyRulerTitle}</p>
        </div>
      </div>
      <div className="space-y-0.5 text-[11px] sm:space-y-1 sm:text-xs">
        <p>♟ Piyon: {campaign.enemy.pawn}</p>
        <p>♜ Kale: {campaign.enemy.rook}</p>
        <p>♞ At: {campaign.enemy.knight}</p>
        <p>♝ Fil: {campaign.enemy.bishop}</p>
        <p>♛ Vezir: {campaign.enemy.queen}</p>
        <p>♚ Şah: {campaign.enemy.king}</p>
      </div>
      <div className={`mt-2 rounded border p-1.5 text-[9px] italic sm:mt-3 sm:p-2 sm:text-[10px] ${
        turn === 'black'
          ? `border-amber-700/50 bg-stone-950/40 ${campaign.enemyAccent.primary} opacity-80`
          : 'border-stone-600 bg-stone-800/40 text-stone-300 opacity-80'
      }`}>
        "{campaign.enemyQuote}" — {campaign.enemyRulerTitle}
      </div>
    </div>
  );

  const historyPanel = (
    <div className="rounded-xl border-2 border-stone-300 bg-stone-50 p-3 sm:p-4">
      <h3 className="mb-2 text-sm font-bold text-stone-800 sm:text-base">📜 Hamle Geçmişi</h3>
      <div className="max-h-48 overflow-y-auto rounded border border-stone-300 bg-white p-2 text-[11px] sm:max-h-56 sm:text-xs">
        {history.length === 0 ? (
          <p className="text-stone-400">Henüz hamle yapılmadı.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-1.5 sm:gap-x-2">
            {history.map((m, i) => (
              <div key={i} className="font-mono">
                <span className="text-stone-500">{Math.floor(i / 2) + 1}.</span>{' '}
                <span className="font-semibold">{getPieceName(m.piece, campaign).split(' ')[0]}</span>{' '}
                <span>
                  {squareName(m.from)}→{squareName(m.to)}
                  {m.isCastling ? '♜' : m.isEnPassant ? '✶' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 text-[10px] text-stone-500 sm:text-[11px]">
        Toplam: {history.length} hamle
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-start lg:justify-center lg:gap-6">
      {/* Desktop: left side panel (Enemy) */}
      {!isMobile && (
        <div className="w-full lg:w-64 lg:order-1">
          {enemyPanel}
        </div>
      )}

      {/* Board area */}
      <div className="flex w-full flex-col items-center lg:order-2">
        {/* Title bar - mobile optimized */}
        <div className="mb-2 w-full max-w-[min(96vw,560px)] rounded-lg border-2 border-amber-600 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 px-3 py-1.5 shadow-lg sm:mb-3 sm:px-6 sm:py-2">
          <h1 className="text-center text-sm font-bold tracking-wider text-amber-50 sm:text-xl sm:tracking-widest">
            🏰 {campaign.name.toUpperCase()} 🏰
          </h1>
          <p className="text-center text-[9px] text-amber-200 sm:text-xs">
            {campaign.year} • {campaign.location}
          </p>
        </div>

        {/* Board */}
        <div
          className="grid w-full max-w-[min(96vw,560px)] grid-cols-8 overflow-hidden rounded-lg border-[3px] border-amber-900 shadow-2xl sm:border-4"
          style={{ touchAction: 'manipulation' }}
        >
          {renderBoard()}
        </div>

        {/* Status */}
        <div className="mt-3 flex w-full max-w-[min(96vw,560px)] flex-col items-stretch gap-2 sm:mt-4">
          <div
            className={`rounded-lg border-2 px-3 py-2.5 text-center text-sm font-bold shadow-md sm:px-4 sm:py-3 sm:text-base ${
              status === 'checkmate'
                ? 'border-yellow-400 bg-gradient-to-r from-yellow-500 to-amber-600 text-white'
                : status === 'check'
                ? 'border-red-500 bg-red-100 text-red-900 animate-pulse'
                : turn === 'white'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                : 'border-stone-700 bg-stone-200 text-stone-900'
            }`}
          >
            {getStatusMessage()}
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
            <button
              onClick={onReset}
              className="rounded-lg bg-amber-700 px-3 py-2.5 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-amber-800 sm:px-4 sm:py-2 sm:text-sm"
              style={{ touchAction: 'manipulation' }}
            >
              🔄 Yeni Savaş
            </button>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="rounded-lg bg-stone-700 px-3 py-2.5 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-stone-800 sm:px-4 sm:py-2 sm:text-sm"
              style={{ touchAction: 'manipulation' }}
            >
              🔃 Çevir
            </button>
            {!isOnline && (
              <button
                onClick={onToggleAI}
                className={`rounded-lg px-3 py-2.5 text-xs font-semibold text-white shadow transition active:scale-95 sm:px-4 sm:py-2 sm:text-sm ${
                  aiEnabled ? 'bg-red-700 hover:bg-red-800' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
                style={{ touchAction: 'manipulation' }}
              >
                {aiEnabled ? '🤖 AI' : '👥 2K'}
              </button>
            )}
            {isOnline ? (
              onLeaveOnline && (
                <button
                  onClick={onLeaveOnline}
                  className="rounded-lg bg-red-700 px-3 py-2.5 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
                  style={{ touchAction: 'manipulation' }}
                >
                  🚪 Ayrıl
                </button>
              )
            ) : (
              onBackToMenu && (
                <button
                  onClick={onBackToMenu}
                  className="rounded-lg bg-stone-600 px-3 py-2.5 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-stone-500 sm:px-4 sm:py-2 sm:text-sm"
                  style={{ touchAction: 'manipulation' }}
                >
                  🏠 Menü
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Desktop: right side panel (Osmanli + history) */}
      {!isMobile && (
        <div className="flex w-full flex-col gap-3 lg:w-64 lg:order-3">
          {osmanliPanel}
          {historyPanel}
        </div>
      )}

      {/* Mobile: collapsible side panels */}
      {isMobile && (
        <div className="flex w-full flex-col gap-2">
          <SidePanel
            title={`Osmanlılar (${campaign.osmanliRulerTitle})`}
            icon="🌙"
            active={mobileTab === 'osmanli'}
            onToggle={() => setMobileTab(mobileTab === 'osmanli' ? null : 'osmanli')}
            isMobile={isMobile}
          >
            <div
              className={`rounded-lg border-2 p-3 sm:p-4 ${
                turn === 'white'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-stone-300 bg-stone-100'
              }`}
            >
              <div className="space-y-0.5 text-[11px] text-stone-700 sm:space-y-1 sm:text-xs">
                <p>♟ Piyon: Yeniçeri</p>
                <p>♜ Kale: Sipahi</p>
                <p>♞ At: Akıncı</p>
                <p>♝ Fil: Vezir</p>
                <p>♛ Vezir: Sadrazam</p>
                <p>♚ Şah: Bayezid</p>
              </div>
              <div className="mt-2 rounded border border-emerald-300 bg-emerald-100/60 p-1.5 text-[10px] italic text-emerald-900">
                "Devletimin bekası için çalışın." — Bayezid
              </div>
            </div>
          </SidePanel>
          <SidePanel
            title="Timurlular (Timur)"
            icon="⚔️"
            active={mobileTab === 'timur'}
            onToggle={() => setMobileTab(mobileTab === 'timur' ? null : 'timur')}
            isMobile={isMobile}
          >
            <div
              className={`rounded-lg border-2 p-3 sm:p-4 ${
                turn === 'black'
                  ? 'border-amber-500 bg-stone-800 text-amber-50'
                  : 'border-stone-700 bg-stone-900/80 text-stone-300'
              }`}
            >
              <div className="space-y-0.5 text-[11px] sm:space-y-1 sm:text-xs">
                <p>♟ Piyon: Mirza</p>
                <p>♜ Kale: Tümen Komutanı</p>
                <p>♞ At: Bahadır</p>
                <p>♝ Fil: Vezir-i Azam</p>
                <p>♛ Vezir: Emirü'l-Ümera</p>
                <p>♚ Şah: Timur</p>
              </div>
              <div className="mt-2 rounded border border-amber-700/50 bg-stone-950/40 p-1.5 text-[10px] italic text-amber-200/80">
                "Korku yıldızlardadır." — Timur
              </div>
            </div>
          </SidePanel>
          <SidePanel
            title="Hamle Geçmişi"
            icon="📜"
            active={mobileTab === 'history'}
            onToggle={() => setMobileTab(mobileTab === 'history' ? null : 'history')}
            isMobile={isMobile}
          >
            <div className="rounded-lg border-2 border-stone-300 bg-stone-50 p-3 sm:p-4">
              <div className="max-h-48 overflow-y-auto rounded border border-stone-300 bg-white p-2 text-[11px] sm:max-h-56 sm:text-xs">
                {history.length === 0 ? (
                  <p className="text-stone-400">Henüz hamle yapılmadı.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-1.5 sm:gap-x-2">
                    {history.map((m, i) => (
                      <div key={i} className="font-mono">
                        <span className="text-stone-500">{Math.floor(i / 2) + 1}.</span>{' '}
                        <span className="font-semibold">{getPieceName(m.piece).split(' ')[0]}</span>{' '}
                        <span>
                          {squareName(m.from)}→{squareName(m.to)}
                          {m.isCastling ? '♜' : m.isEnPassant ? '✶' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-2 text-[10px] text-stone-500 sm:text-[11px]">
                Toplam: {history.length} hamle
              </div>
            </div>
          </SidePanel>
        </div>
      )}

      {promotion && (
        <PromotionDialog
          color="white"
          onSelect={handlePromotion}
          onCancel={() => setPromotion(null)}
          isMobile={isMobile}
        />
      )}

      {onBackToMenu && (
        <GameOverOverlay
          status={status}
          winner={winner}
          campaign={campaign}
          onRematch={onReset}
          onBackToMenu={onBackToMenu}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
