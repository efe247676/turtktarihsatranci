import type { Board, Move, PieceColor, Position } from './types';
import { BOARD_SIZE, getAllLegalMoves, makeMove } from './logic';

const PIECE_VALUES: Record<string, number> = {
  pawn: 100,
  knight: 320,
  bishop: 330,
  rook: 500,
  queen: 900,
  king: 20000,
};

const PAWN_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5,  5, 10, 25, 25, 10,  5,  5],
  [0,  0,  0, 20, 20,  0,  0,  0],
  [5, -5,-10,  0,  0,-10, -5,  5],
  [5, 10, 10,-20,-20, 10, 10,  5],
  [0,  0,  0,  0,  0,  0,  0,  0],
];

const KNIGHT_TABLE = [
  [-50,-40,-30,-30,-30,-30,-40,-50],
  [-40,-20,  0,  0,  0,  0,-20,-40],
  [-30,  0, 10, 15, 15, 10,  0,-30],
  [-30,  5, 15, 20, 20, 15,  5,-30],
  [-30,  0, 15, 20, 20, 15,  0,-30],
  [-30,  5, 10, 15, 15, 10,  5,-30],
  [-40,-20,  0,  5,  5,  0,-20,-40],
  [-50,-40,-30,-30,-30,-30,-40,-50],
];

const BISHOP_TABLE = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20],
];

const ROOK_TABLE = [
  [0,  0,  0,  0,  0,  0,  0,  0],
  [5, 10, 10, 10, 10, 10, 10,  5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [-5,  0,  0,  0,  0,  0,  0, -5],
  [0,  0,  0,  5,  5,  0,  0,  0],
];

const QUEEN_TABLE = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [ -5,  0,  5,  5,  5,  5,  0, -5],
  [  0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  0,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20],
];

const KING_TABLE = [
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-30,-40,-40,-50,-50,-40,-40,-30],
  [-20,-30,-30,-40,-40,-30,-30,-20],
  [-10,-20,-20,-20,-20,-20,-20,-10],
  [ 20, 20,  0,  0,  0,  0, 20, 20],
  [ 20, 30, 10,  0,  0, 10, 30, 20],
];

function getTable(type: string): number[][] {
  switch (type) {
    case 'pawn': return PAWN_TABLE;
    case 'knight': return KNIGHT_TABLE;
    case 'bishop': return BISHOP_TABLE;
    case 'rook': return ROOK_TABLE;
    case 'queen': return QUEEN_TABLE;
    case 'king': return KING_TABLE;
    default: return [];
  }
}

function evaluate(board: Board): number {
  let score = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const p = board[r][c];
      if (!p) continue;
      const val = PIECE_VALUES[p.type];
      const table = getTable(p.type);
      const posVal = p.color === 'white' ? table[r][c] : table[BOARD_SIZE - 1 - r][c];
      const total = val + posVal;
      if (p.color === 'white') score += total;
      else score -= total;
    }
  }
  return score;
}

interface SearchState {
  board: Board;
  turn: PieceColor;
  enPassantTarget: Position | null;
}

function orderMoves(moves: Move[]): Move[] {
  return moves.sort((a, b) => {
    const aCap = a.captured ? PIECE_VALUES[a.captured.type] - PIECE_VALUES[a.piece.type] / 10 : 0;
    const bCap = b.captured ? PIECE_VALUES[b.captured.type] - PIECE_VALUES[b.piece.type] / 10 : 0;
    return bCap - aCap;
  });
}

function minimax(state: SearchState, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  const moves = getAllLegalMoves(state.board, state.turn, state.enPassantTarget);
  if (depth === 0 || moves.length === 0) {
    if (moves.length === 0) {
      // checkmate or stalemate
      const evalScore = evaluate(state.board);
      if (maximizing && evalScore < -15000) return -100000 + depth;
      if (!maximizing && evalScore > 15000) return 100000 - depth;
      return evalScore;
    }
    return evaluate(state.board);
  }

  const ordered = orderMoves(moves);

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of ordered) {
      const newState = makeMove(state, move);
      const ev = minimax(newState, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, ev);
      alpha = Math.max(alpha, ev);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of ordered) {
      const newState = makeMove(state, move);
      const ev = minimax(newState, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, ev);
      beta = Math.min(beta, ev);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function findBestMove(
  board: Board,
  turn: PieceColor,
  enPassantTarget: Position | null,
  depth: number = 3
): Move | null {
  const moves = getAllLegalMoves(board, turn, enPassantTarget);
  if (moves.length === 0) return null;

  const ordered = orderMoves(moves);
  let bestMove: Move | null = null;
  let bestValue = turn === 'white' ? -Infinity : Infinity;

  for (const move of ordered) {
    const newState = makeMove({ board, turn, enPassantTarget }, move);
    const ev = minimax(newState, depth - 1, -Infinity, Infinity, turn === 'black');
    if (turn === 'white') {
      if (ev > bestValue) {
        bestValue = ev;
        bestMove = move;
      }
    } else {
      if (ev < bestValue) {
        bestValue = ev;
        bestMove = move;
      }
    }
  }
  return bestMove;
}
