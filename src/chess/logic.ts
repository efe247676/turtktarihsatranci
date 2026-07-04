import type { Board, Move, Piece, PieceColor, Position, Square } from './types';

export const BOARD_SIZE = 8;

export const PIECE_NAMES_TR: Record<string, string> = {
  pawn: 'Yeniçeri',
  rook: 'Sipahi',
  knight: 'Akıncı',
  bishop: 'Vezir',
  queen: 'Sadrazam',
  king: 'Padişah',
};

export const PIECE_NAMES_TR_BLACK: Record<string, string> = {
  pawn: 'Mirza',
  rook: 'Tümen Komutanı',
  knight: 'Bahadır',
  bishop: 'Vezir-i Azam',
  queen: 'Emirü’l-Ümera',
  king: 'Timur',
};

export function createInitialBoard(): Board {
  const board: Board = Array.from({ length: BOARD_SIZE }, () =>
    Array<Square>(BOARD_SIZE).fill(null)
  );

  // Black (Timurlular) at top (row 0, 1)
  const backRank: Piece['type'][] = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
  ];
  for (let c = 0; c < BOARD_SIZE; c++) {
    board[0][c] = { type: backRank[c], color: 'black' };
    board[1][c] = { type: 'pawn', color: 'black' };
    board[6][c] = { type: 'pawn', color: 'white' };
    board[7][c] = { type: backRank[c], color: 'white' };
  }
  return board;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((s) => (s ? { ...s } : null)));
}

export function posEq(a: Position | null, b: Position | null): boolean {
  if (!a || !b) return false;
  return a.row === b.row && a.col === b.col;
}

export function inBounds(p: Position): boolean {
  return p.row >= 0 && p.row < BOARD_SIZE && p.col >= 0 && p.col < BOARD_SIZE;
}

export function findKing(board: Board, color: PieceColor): Position | null {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const p = board[r][c];
      if (p && p.type === 'king' && p.color === color) return { row: r, col: c };
    }
  }
  return null;
}

const KNIGHT_OFFSETS = [
  [-1, -2], [-1, 2], [1, -2], [1, 2],
  [-2, -1], [-2, 1], [2, -1], [2, 1],
];
const KING_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];
const BISHOP_DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ROOK_DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function slideMoves(
  board: Board,
  from: Position,
  color: PieceColor,
  dirs: number[][]
): Position[] {
  const moves: Position[] = [];
  for (const [dr, dc] of dirs) {
    let r = from.row + dr;
    let c = from.col + dc;
    while (inBounds({ row: r, col: c })) {
      const t = board[r][c];
      if (!t) {
        moves.push({ row: r, col: c });
      } else {
        if (t.color !== color) moves.push({ row: r, col: c });
        break;
      }
      r += dr;
      c += dc;
    }
  }
  return moves;
}

function rawMoves(board: Board, from: Position, enPassantTarget: Position | null): Position[] {
  const p = board[from.row][from.col];
  if (!p) return [];
  const moves: Position[] = [];
  const dir = p.color === 'white' ? -1 : 1;

  if (p.type === 'pawn') {
    const oneStep = { row: from.row + dir, col: from.col };
    if (inBounds(oneStep) && !board[oneStep.row][oneStep.col]) {
      moves.push(oneStep);
      if (!p.hasMoved) {
        const twoStep = { row: from.row + 2 * dir, col: from.col };
        if (!board[twoStep.row][twoStep.col]) moves.push(twoStep);
      }
    }
    // Captures
    for (const dc of [-1, 1]) {
      const t = { row: from.row + dir, col: from.col + dc };
      if (!inBounds(t)) continue;
      const target = board[t.row][t.col];
      if (target && target.color !== p.color) moves.push(t);
      if (enPassantTarget && posEq(t, enPassantTarget)) moves.push(t);
    }
  } else if (p.type === 'knight') {
    for (const [dr, dc] of KNIGHT_OFFSETS) {
      const t = { row: from.row + dr, col: from.col + dc };
      if (!inBounds(t)) continue;
      const target = board[t.row][t.col];
      if (!target || target.color !== p.color) moves.push(t);
    }
  } else if (p.type === 'bishop') {
    moves.push(...slideMoves(board, from, p.color, BISHOP_DIRS));
  } else if (p.type === 'rook') {
    moves.push(...slideMoves(board, from, p.color, ROOK_DIRS));
  } else if (p.type === 'queen') {
    moves.push(...slideMoves(board, from, p.color, BISHOP_DIRS));
    moves.push(...slideMoves(board, from, p.color, ROOK_DIRS));
  } else if (p.type === 'king') {
    for (const [dr, dc] of KING_OFFSETS) {
      const t = { row: from.row + dr, col: from.col + dc };
      if (!inBounds(t)) continue;
      const target = board[t.row][t.col];
      if (!target || target.color !== p.color) moves.push(t);
    }
  }
  return moves;
}

function isSquareAttacked(board: Board, target: Position, byColor: PieceColor): boolean {
  // Pawns
  const pawnDir = byColor === 'white' ? 1 : -1;
  for (const dc of [-1, 1]) {
    const r = target.row + pawnDir;
    const c = target.col + dc;
    if (inBounds({ row: r, col: c })) {
      const p = board[r][c];
      if (p && p.type === 'pawn' && p.color === byColor) return true;
    }
  }
  // Knights
  for (const [dr, dc] of KNIGHT_OFFSETS) {
    const r = target.row + dr;
    const c = target.col + dc;
    if (!inBounds({ row: r, col: c })) continue;
    const p = board[r][c];
    if (p && p.type === 'knight' && p.color === byColor) return true;
  }
  // King
  for (const [dr, dc] of KING_OFFSETS) {
    const r = target.row + dr;
    const c = target.col + dc;
    if (!inBounds({ row: r, col: c })) continue;
    const p = board[r][c];
    if (p && p.type === 'king' && p.color === byColor) return true;
  }
  // Sliding - bishops/queens
  for (const [dr, dc] of BISHOP_DIRS) {
    let r = target.row + dr;
    let c = target.col + dc;
    while (inBounds({ row: r, col: c })) {
      const p = board[r][c];
      if (p) {
        if (p.color === byColor && (p.type === 'bishop' || p.type === 'queen')) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }
  // Sliding - rooks/queens
  for (const [dr, dc] of ROOK_DIRS) {
    let r = target.row + dr;
    let c = target.col + dc;
    while (inBounds({ row: r, col: c })) {
      const p = board[r][c];
      if (p) {
        if (p.color === byColor && (p.type === 'rook' || p.type === 'queen')) return true;
        break;
      }
      r += dr;
      c += dc;
    }
  }
  return false;
}

export function isInCheck(board: Board, color: PieceColor): boolean {
  const king = findKing(board, color);
  if (!king) return false;
  return isSquareAttacked(board, king, color === 'white' ? 'black' : 'white');
}

function applyMove(board: Board, move: Move): Board {
  const nb = cloneBoard(board);
  const piece = nb[move.from.row][move.from.col]!;
  piece.hasMoved = true;

  if (move.isEnPassant) {
    const capturedPawnRow = move.from.row;
    nb[capturedPawnRow][move.to.col] = null;
  }

  nb[move.to.row][move.to.col] = piece;
  nb[move.from.row][move.from.col] = null;

  if (move.isCastling) {
    // Move rook
    if (move.to.col === 6) {
      const rook = nb[move.from.row][7]!;
      rook.hasMoved = true;
      nb[move.from.row][5] = rook;
      nb[move.from.row][7] = null;
    } else if (move.to.col === 2) {
      const rook = nb[move.from.row][0]!;
      rook.hasMoved = true;
      nb[move.from.row][3] = rook;
      nb[move.from.row][0] = null;
    }
  }

  // Promotion
  if (move.promotion && piece.type === 'pawn') {
    piece.type = move.promotion;
  }

  return nb;
}

export function getLegalMoves(
  board: Board,
  from: Position,
  enPassantTarget: Position | null
): Move[] {
  const piece = board[from.row][from.col];
  if (!piece) return [];
  const targets = rawMoves(board, from, enPassantTarget);
  const legal: Move[] = [];

  // Castling - need to check king hasn't moved and squares not attacked
  if (piece.type === 'king' && !piece.hasMoved) {
    const row = from.row;
    // King-side
    const rookK = board[row][7];
    if (
      rookK && rookK.type === 'rook' && rookK.color === piece.color && !rookK.hasMoved &&
      !board[row][5] && !board[row][6]
    ) {
      if (
        !isSquareAttacked(board, { row, col: 4 }, piece.color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 5 }, piece.color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 6 }, piece.color === 'white' ? 'black' : 'white')
      ) {
        legal.push({
          from,
          to: { row, col: 6 },
          piece,
          isCastling: true,
        });
      }
    }
    // Queen-side
    const rookQ = board[row][0];
    if (
      rookQ && rookQ.type === 'rook' && rookQ.color === piece.color && !rookQ.hasMoved &&
      !board[row][1] && !board[row][2] && !board[row][3]
    ) {
      if (
        !isSquareAttacked(board, { row, col: 4 }, piece.color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 3 }, piece.color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 2 }, piece.color === 'white' ? 'black' : 'white')
      ) {
        legal.push({
          from,
          to: { row, col: 2 },
          piece,
          isCastling: true,
        });
      }
    }
  }

  for (const to of targets) {
    const target = board[to.row][to.col];
    const isEP = piece.type === 'pawn' && posEq(to, enPassantTarget);
    const captured = isEP ? board[from.row][to.col] : target;
    const move: Move = {
      from,
      to,
      piece,
      captured: captured || undefined,
      isEnPassant: isEP,
    };
    const nb = applyMove(board, move);
    if (!isInCheck(nb, piece.color)) {
      legal.push(move);
    }
  }
  return legal;
}

export function getAllLegalMoves(
  board: Board,
  color: PieceColor,
  enPassantTarget: Position | null
): Move[] {
  const all: Move[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const p = board[r][c];
      if (p && p.color === color) {
        all.push(...getLegalMoves(board, { row: r, col: c }, enPassantTarget));
      }
    }
  }
  return all;
}

export function computeNewEnPassantTarget(move: Move): Position | null {
  if (move.piece.type === 'pawn' && Math.abs(move.to.row - move.from.row) === 2) {
    return { row: (move.from.row + move.to.row) / 2, col: move.from.col };
  }
  return null;
}

export function makeMove(state: { board: Board; turn: PieceColor; enPassantTarget: Position | null }, move: Move) {
  const newBoard = applyMove(state.board, move);
  const newEnPassant = computeNewEnPassantTarget(move);
  const newTurn: PieceColor = state.turn === 'white' ? 'black' : 'white';
  const inCheck = isInCheck(newBoard, newTurn);
  const allMoves = getAllLegalMoves(newBoard, newTurn, newEnPassant);
  let status: 'playing' | 'check' | 'checkmate' | 'stalemate' = 'playing';
  let winner: PieceColor | null = null;
  if (allMoves.length === 0) {
    if (inCheck) {
      status = 'checkmate';
      winner = state.turn;
    } else {
      status = 'stalemate';
    }
  } else if (inCheck) {
    status = 'check';
  }
  return {
    board: newBoard,
    turn: newTurn,
    enPassantTarget: newEnPassant,
    status,
    winner,
  };
}

export function squareName(pos: Position): string {
  return `${String.fromCharCode(97 + pos.col)}${8 - pos.row}`;
}
