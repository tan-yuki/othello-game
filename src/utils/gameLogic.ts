import { Board as BoardType, Player, Direction, CellValue } from '../types';

// 初期ボード状態を作成する関数
export const createInitialBoard = (): BoardType => {
  // 8x8の空のボードを作成
  const board: BoardType = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // 初期配置（中央の4マスに石を配置）
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  
  return board;
};

// 指定された位置に石を置けるかどうかを確認する関数
export const canPlaceDisc = (board: BoardType, row: number, col: number, player: Player): boolean => {
  // すでに石が置かれている場合は置けない
  if (board[row][col] !== null) {
    return false;
  }

  const opponent: Player = player === 'black' ? 'white' : 'black';
  const directions: Direction[] = [
    [-1, -1], [-1, 0], [-1, 1], // 上方向
    [0, -1], [0, 1],           // 左右
    [1, -1], [1, 0], [1, 1]    // 下方向
  ];

  // 各方向をチェック
  for (const [dx, dy] of directions) {
    let x = row + dx;
    let y = col + dy;
    let foundOpponent = false;

    // ボード内かつ相手の石がある間ループ
    while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
      x += dx;
      y += dy;
      foundOpponent = true;
    }

    // ボード内かつ自分の石があり、その間に相手の石があれば置ける
    if (foundOpponent && x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
      return true;
    }
  }

  return false;
};

// 石を置いた後にひっくり返す関数
export const flipDiscs = (board: BoardType, row: number, col: number, player: Player): BoardType => {
  const newBoard: BoardType = [...board.map(row => [...row])];
  newBoard[row][col] = player;

  const opponent: Player = player === 'black' ? 'white' : 'black';
  const directions: Direction[] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  // 各方向をチェック
  for (const [dx, dy] of directions) {
    let x = row + dx;
    let y = col + dy;
    const discsToFlip: [number, number][] = [];

    // ボード内かつ相手の石がある間ループ
    while (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === opponent) {
      discsToFlip.push([x, y]);
      x += dx;
      y += dy;
    }

    // ボード内かつ自分の石があれば、間の石をひっくり返す
    if (discsToFlip.length > 0 && x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === player) {
      for (const [flipX, flipY] of discsToFlip) {
        newBoard[flipX][flipY] = player;
      }
    }
  }

  return newBoard;
};

// ボード上の石の数を数える関数
export const countDiscs = (board: BoardType): { black: number; white: number } => {
  let blackCount = 0;
  let whiteCount = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === 'black') {
        blackCount++;
      } else if (board[i][j] === 'white') {
        whiteCount++;
      }
    }
  }

  return { black: blackCount, white: whiteCount };
};

// プレイヤーが石を置ける場所があるかチェックする関数
export const canPlayerMove = (board: BoardType, player: Player): boolean => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (canPlaceDisc(board, i, j, player)) {
        return true;
      }
    }
  }
  return false;
};

// 勝者を判定する関数
export const getWinner = (blackCount: number, whiteCount: number): Player | 'draw' => {
  if (blackCount > whiteCount) return 'black';
  if (whiteCount > blackCount) return 'white';
  return 'draw';
};