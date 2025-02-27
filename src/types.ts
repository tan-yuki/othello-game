// ボードの型定義
export type CellValue = 'black' | 'white' | null;
export type Board = CellValue[][];

// プレイヤーの型定義
export type Player = 'black' | 'white';

// スコアの型定義
export interface Scores {
  black: number;
  white: number;
}

// 方向の型定義
export type Direction = [number, number];