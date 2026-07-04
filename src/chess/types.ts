export type PieceColor = 'white' | 'black';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

export type Square = Piece | null;
export type Board = Square[][];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
  isCastling?: boolean;
  isEnPassant?: boolean;
  promotion?: PieceType;
}

export interface GameState {
  board: Board;
  turn: PieceColor;
  history: Move[];
  enPassantTarget: Position | null;
  status: 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';
  winner: PieceColor | null;
}
