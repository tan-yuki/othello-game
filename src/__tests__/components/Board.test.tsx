import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Board from '../../components/Board';
import { createInitialBoard } from '../../utils/gameLogic';

describe('Board Component', () => {
  it('renders board with correct structure', () => {
    const board = createInitialBoard();
    const mockOnCellClick = jest.fn();
    const mockCanPlaceDisc = jest.fn().mockReturnValue(false);
    
    const { container, getByTestId } = render(
      <Board
        board={board}
        onCellClick={mockOnCellClick}
        currentPlayer="black"
        canPlaceDisc={mockCanPlaceDisc}
      />
    );
    
    // ボードのスタイルをテスト
    const boardElement = getByTestId('board');
    expect(boardElement).toBeInTheDocument();
    expect(boardElement).toHaveStyleRule('background-color', '#1b5e20');
    expect(boardElement).toHaveStyleRule('border', '8px solid #2e7d32');
    
    // 行の数をテスト
    const rows = container.querySelectorAll('[data-testid="board"] > div');
    expect(rows.length).toBe(8);
    
    // 各行のセルの数をテスト
    const firstRow = rows[0];
    const cells = firstRow.querySelectorAll('div');
    expect(cells.length).toBe(8);
    
    // canPlaceDiscが各セルに対して呼び出されることを確認
    expect(mockCanPlaceDisc).toHaveBeenCalledTimes(64); // 8x8のボード
  });
});