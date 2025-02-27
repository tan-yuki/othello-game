import {
  createInitialBoard,
  canPlaceDisc,
  flipDiscs,
  countDiscs,
  canPlayerMove,
  getWinner
} from '../../utils/gameLogic';
import { Board as BoardType } from '../../types';
import '@testing-library/jest-dom';

describe('Game Logic', () => {
  describe('createInitialBoard', () => {
    it('should create an 8x8 board with initial disc placement', () => {
      const board = createInitialBoard();
      
      // ボードのサイズが8x8であることを確認
      expect(board.length).toBe(8);
      board.forEach(row => {
        expect(row.length).toBe(8);
      });
      
      // 初期配置が正しいことを確認
      expect(board[3][3]).toBe('white');
      expect(board[3][4]).toBe('black');
      expect(board[4][3]).toBe('black');
      expect(board[4][4]).toBe('white');
      
      // その他のセルがnullであることを確認
      expect(board[0][0]).toBeNull();
      expect(board[7][7]).toBeNull();
    });
  });
  
  describe('canPlaceDisc', () => {
    it('should return false if the cell is already occupied', () => {
      const board = createInitialBoard();
      // すでに石が置かれているセルにはおけない
      expect(canPlaceDisc(board, 3, 3, 'black')).toBe(false);
    });
    
    it('should return false if placing a disc does not flip any opponent discs', () => {
      const board = createInitialBoard();
      // 相手の石をひっくり返せない場所には置けない
      expect(canPlaceDisc(board, 0, 0, 'black')).toBe(false);
    });
    
    it('should return true if placing a disc flips opponent discs', () => {
      const board = createInitialBoard();
      // 初期状態で黒が置ける場所
      expect(canPlaceDisc(board, 2, 3, 'black')).toBe(true);
      expect(canPlaceDisc(board, 3, 2, 'black')).toBe(true);
      expect(canPlaceDisc(board, 4, 5, 'black')).toBe(true);
      expect(canPlaceDisc(board, 5, 4, 'black')).toBe(true);
    });
  });
  
  describe('flipDiscs', () => {
    it('should place a disc and flip opponent discs', () => {
      const board = createInitialBoard();
      const newBoard = flipDiscs(board, 2, 3, 'black');
      
      // 新しい石が置かれていることを確認
      expect(newBoard[2][3]).toBe('black');
      
      // 相手の石がひっくり返されていることを確認
      expect(newBoard[3][3]).toBe('black');
      
      // 他の石は変わっていないことを確認
      expect(newBoard[3][4]).toBe('black');
      expect(newBoard[4][3]).toBe('black');
      expect(newBoard[4][4]).toBe('white');
    });
    
    it('should flip discs in multiple directions', () => {
      // カスタムボードを作成
      const customBoard: BoardType = Array(8).fill(null).map(() => Array(8).fill(null));
      customBoard[3][3] = 'white';
      customBoard[3][4] = 'white';
      customBoard[3][5] = 'black';
      customBoard[4][3] = 'white';
      customBoard[4][4] = 'black';
      customBoard[5][3] = 'black';
      
      const newBoard = flipDiscs(customBoard, 2, 2, 'black');
      
      // 新しい石が置かれていることを確認
      expect(newBoard[2][2]).toBe('black');
      
      // 複数方向の石がひっくり返されていることを確認
      expect(newBoard[3][3]).toBe('black');
      expect(newBoard[4][4]).toBe('black');
    });
  });
  
  describe('countDiscs', () => {
    it('should count the number of discs for each player', () => {
      const board = createInitialBoard();
      const counts = countDiscs(board);
      
      expect(counts.black).toBe(2);
      expect(counts.white).toBe(2);
    });
    
    it('should return correct counts after moves', () => {
      let board = createInitialBoard();
      board = flipDiscs(board, 2, 3, 'black');
      
      const counts = countDiscs(board);
      expect(counts.black).toBe(4);
      expect(counts.white).toBe(1);
    });
  });
  
  describe('canPlayerMove', () => {
    it('should return true if player can make a move', () => {
      const board = createInitialBoard();
      expect(canPlayerMove(board, 'black')).toBe(true);
      expect(canPlayerMove(board, 'white')).toBe(true);
    });
    
    it('should return false if player cannot make a move', () => {
      // カスタムボードを作成（黒が置けない状態）
      const customBoard: BoardType = Array(8).fill(null).map(() => Array(8).fill(null));
      // 白で埋める
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          customBoard[i][j] = 'white';
        }
      }
      
      expect(canPlayerMove(customBoard, 'black')).toBe(false);
    });
  });
  
  describe('getWinner', () => {
    it('should return black if black has more discs', () => {
      expect(getWinner(10, 5)).toBe('black');
    });
    
    it('should return white if white has more discs', () => {
      expect(getWinner(3, 7)).toBe('white');
    });
    
    it('should return draw if both players have the same number of discs', () => {
      expect(getWinner(8, 8)).toBe('draw');
    });
  });
});