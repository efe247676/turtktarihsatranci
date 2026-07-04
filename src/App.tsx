import { useCallback, useEffect, useState } from 'react';
import { BoardView } from './chess/Board';
import { StartScreen } from './chess/StartScreen';
import { BattleSelectScreen } from './chess/BattleSelectScreen';
import { BattleIntroScreen } from './chess/BattleIntroScreen';
import { OnlineMenu } from './chess/OnlineMenu';
import { MatchmakingScreen } from './chess/MatchmakingScreen';
import { InviteHostScreen } from './chess/InviteHostScreen';
import { InviteGuestScreen } from './chess/InviteGuestScreen';
import { LandingPage } from './chess/LandingPage';
import { createInitialBoard, makeMove } from './chess/logic';
import { findBestMove } from './chess/ai';
import { CAMPAIGNS, type Campaign } from './chess/campaigns';
import type { GameState, Move, PieceColor } from './chess/types';
import { onlineService } from './network/online';
import { initAdMob, showBanner, hideBanner } from './network/admob';

function createInitialState(): GameState {
  return {
    board: createInitialBoard(),
    turn: 'white',
    history: [],
    enPassantTarget: null,
    status: 'playing',
    winner: null,
  };
}

type Screen =
  | 'landing'
  | 'menu'
  | 'battleSelect'
  | 'battleIntro'
  | 'onlineMenu'
  | 'matchmaking'
  | 'inviteHost'
  | 'inviteGuest'
  | 'game';

type Difficulty = 'easy' | 'medium' | 'hard';

const AI_DEPTHS: Record<Difficulty, number> = {
  easy: 2,
  medium: 3,
  hard: 4,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [state, setState] = useState<GameState>(createInitialState);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [thinking, setThinking] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>(CAMPAIGNS.ankara1402);
  const [isOnline, setIsOnline] = useState(false);
  const [myColor, setMyColor] = useState<PieceColor>('white');
  const [opponentConnected, setOpponentConnected] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // AdMob init — uygulama başladığında bir kez
  useEffect(() => {
    initAdMob();
  }, []);

  // URL routing — sayfa yüklendiğinde ?room=CODE kontrolü
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room && room.length >= 4) {
      // Otomatik olarak misafir olarak odaya katıl
      setCampaign(CAMPAIGNS.ankara1402);
      setScreen('inviteGuest');
      // input state'ine yerleştirmek için custom event
      setTimeout(() => {
        const event = new CustomEvent('auto-join-room', { detail: room.toUpperCase() });
        window.dispatchEvent(event);
      }, 100);
    }
  }, []);

  // Banner reklam yönetimi: oyun dışı ekranlarda göster, oyun sırasında gizle
  useEffect(() => {
    // Oyun sırasında ve kritik beklemelerde banner gizli, diğer her yerde görünür
    const hideInScreens: Screen[] = ['game'];
    if (hideInScreens.includes(screen)) {
      hideBanner();
    } else {
      // Küçük bir gecikme ile göster — ekran geçişi daha akıcı olsun
      const t = setTimeout(() => {
        showBanner();
      }, 400);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // Online callback'leri kurulum
  useEffect(() => {
    onlineService.setCallbacks({
      onPeerJoined: () => {
        setOpponentConnected(true);
      },
      onDisconnected: () => {
        setOpponentConnected(false);
        if (isOnline) {
          setErrorToast('Rakip bağlantısı koptu');
          setTimeout(() => setErrorToast(null), 4000);
        }
      },
      onError: (msg) => {
        setErrorToast(msg);
        setTimeout(() => setErrorToast(null), 4000);
      },
      onMove: (msg) => {
        // Rakip hamle yaptı, local state'i güncelle
        setState((prev) => {
          const result = makeMove(prev, msg.move);
          return {
            ...result,
            history: [...prev.history, msg.move],
          };
        });
      },
      onState: (msg) => {
        setState({
          board: msg.board,
          turn: msg.turn,
          history: msg.history,
          enPassantTarget: msg.enPassantTarget,
          status: msg.status,
          winner: msg.winner,
        });
      },
    });
  }, [isOnline]);

  const handleOpenBattleSelect = useCallback(() => setScreen('battleSelect'), []);
  const handleOpenOnline = useCallback(() => setScreen('onlineMenu'), []);

  const handleSelectCampaign = useCallback((c: Campaign) => {
    setCampaign(c);
    setScreen('battleIntro');
  }, []);

  const handleStart = useCallback(
    (options: { vsAI: boolean; difficulty: Difficulty }) => {
      setAiEnabled(options.vsAI);
      setDifficulty(options.difficulty);
      setIsOnline(false);
      setState(createInitialState());
      setScreen('game');
    },
    []
  );

  // Online modda bağlantı kurulduğunda oyuna geç
  const handleOnlineConnected = useCallback(
    (role: 'host' | 'guest') => {
      setIsOnline(true);
      setAiEnabled(false);
      setMyColor(role === 'host' ? 'white' : 'black');
      setState(createInitialState());
      setScreen('game');
    },
    []
  );

  const handleBackToMenu = useCallback(() => {
    onlineService.disconnect();
    setIsOnline(false);
    setOpponentConnected(false);
    setScreen('menu');
  }, []);

  const handleBackToBattleSelect = useCallback(() => setScreen('battleSelect'), []);
  const handleBackToOnlineMenu = useCallback(() => setScreen('onlineMenu'), []);
  const handleLeaveOnline = useCallback(() => {
    onlineService.disconnect();
    setIsOnline(false);
    setOpponentConnected(false);
    setScreen('menu');
  }, []);

  const handleMove = useCallback(
    (move: Move) => {
      setState((prev) => {
        const result = makeMove(prev, move);
        const newState = {
          ...result,
          history: [...prev.history, move],
        };
        // Online modda hamleyi rakibe gönder
        if (isOnline) {
          onlineService.sendMove(move, newState.turn, newState.history.length);
        }
        return newState;
      });
    },
    [isOnline]
  );

  const handleReset = useCallback(() => {
    if (isOnline) {
      // Online'da sıfırlama: yeni state oluşturup rakibe gönder
      const newState = createInitialState();
      setState(newState);
      onlineService.sendState({
        board: newState.board,
        turn: newState.turn,
        history: newState.history,
        enPassantTarget: newState.enPassantTarget,
        status: newState.status === 'draw' ? 'playing' : newState.status,
        winner: newState.winner,
        ply: 0,
      });
    } else {
      setState(createInitialState());
    }
  }, [isOnline]);

  const toggleAI = useCallback(() => setAiEnabled((v) => !v), []);

  // AI move (sadece yerel oyunda)
  useEffect(() => {
    if (isOnline) return;
    if (!aiEnabled) return;
    if (state.status === 'checkmate' || state.status === 'stalemate') return;
    if (state.turn !== 'black') return;
    if (state.history.length === 0 && !thinking) return;

    setThinking(true);
    const depth = AI_DEPTHS[difficulty];
    const timer = setTimeout(() => {
      const best = findBestMove(state.board, state.turn, state.enPassantTarget, depth);
      if (best) {
        const moveWithPromo =
          best.piece.type === 'pawn' && (best.to.row === 0 || best.to.row === 7)
            ? { ...best, promotion: 'queen' as const }
            : best;
        handleMove(moveWithPromo);
      }
      setThinking(false);
    }, 350);
    return () => {
      clearTimeout(timer);
      setThinking(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.turn, state.status, aiEnabled, state.board, state.enPassantTarget, difficulty, isOnline]);

  const lastMove = state.history.length > 0 ? state.history[state.history.length - 1] : null;

  // Render by screen
  if (screen === 'landing') {
    return (
      <LandingPage
        onPlay={() => setScreen('menu')}
        onOnline={() => setScreen('onlineMenu')}
      />
    );
  }

  if (screen === 'menu') {
    return (
      <StartScreen
        onOpenBattles={handleOpenBattleSelect}
        onOpenOnline={handleOpenOnline}
        onBackToLanding={() => setScreen('landing')}
      />
    );
  }

  if (screen === 'battleSelect') {
    return (
      <BattleSelectScreen
        onSelect={handleSelectCampaign}
        onBack={handleBackToMenu}
      />
    );
  }

  if (screen === 'battleIntro') {
    return (
      <BattleIntroScreen
        campaign={campaign}
        onStart={handleStart}
        onBack={handleBackToBattleSelect}
      />
    );
  }

  if (screen === 'onlineMenu') {
    return (
      <OnlineMenu
        onMatchmaking={() => {
          setCampaign(CAMPAIGNS.ankara1402);
          setScreen('matchmaking');
        }}
        onHost={() => {
          setCampaign(CAMPAIGNS.ankara1402);
          setScreen('inviteHost');
        }}
        onJoin={() => {
          setCampaign(CAMPAIGNS.ankara1402);
          setScreen('inviteGuest');
        }}
        onBack={handleBackToMenu}
      />
    );
  }

  if (screen === 'matchmaking') {
    return (
      <MatchmakingScreen
        onMatched={() => handleOnlineConnected('host')}
        onBack={handleBackToOnlineMenu}
      />
    );
  }

  if (screen === 'inviteHost') {
    return (
      <InviteHostScreen
        onConnected={() => handleOnlineConnected('host')}
        onBack={handleBackToOnlineMenu}
      />
    );
  }

  if (screen === 'inviteGuest') {
    return (
      <InviteGuestScreen
        onConnected={() => handleOnlineConnected('guest')}
        onBack={handleBackToOnlineMenu}
      />
    );
  }

  // game screen
  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden px-2 py-2 sm:px-6 sm:py-6 bg-gradient-to-br ${campaign.bgGradient}`}
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <BoardView
          board={state.board}
          turn={state.turn}
          enPassantTarget={state.enPassantTarget}
          lastMove={lastMove}
          status={state.status}
          winner={state.winner}
          onMove={handleMove}
          onReset={handleReset}
          history={state.history}
          thinking={thinking}
          aiEnabled={aiEnabled}
          onToggleAI={toggleAI}
          onBackToMenu={handleBackToMenu}
          campaign={campaign}
          isOnline={isOnline}
          myColor={isOnline ? myColor : undefined}
          onLeaveOnline={isOnline ? handleLeaveOnline : undefined}
        />
        <footer className="mt-3 text-center text-[10px] text-amber-200/60 sm:mt-6 sm:text-xs">
          <p>⚔️ {campaign.name} • {campaign.year} ⚔️</p>
          <p className="mt-0.5 sm:mt-1">
            {isOnline
              ? opponentConnected
                ? '🌍 Çevrimiçi • Rakiple oynanıyor'
                : '🌍 Çevrimiçi • Rakip bekleniyor...'
              : 'Rok, geçerken alma, terfi, şah-mat desteklenir'}
          </p>
        </footer>
      </div>

      {/* Error toast */}
      {errorToast && (
        <div
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-lg border-2 border-red-500 bg-red-950/95 px-4 py-2.5 text-sm font-bold text-red-100 shadow-2xl backdrop-blur sm:top-6"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' }}
        >
          ⚠️ {errorToast}
        </div>
      )}
    </div>
  );
}
