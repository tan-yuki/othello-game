import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import App from '../../App';

describe('App Component', () => {
  it('renders the game with initial state', () => {
    const { getByText, container } = render(<App />);
    
    // タイトルが表示されていることを確認
    expect(getByText('オセロゲーム')).toBeInTheDocument();
    
    // 初期状態では黒のターンであることを確認
    expect(getByText('現在のプレイヤー')).toBeInTheDocument();
    expect(getByText('黒')).toBeInTheDocument();
    
    // 初期スコアが表示されていることを確認
    expect(getByText('2')).toBeInTheDocument(); // 両方のスコアが2
    
    // ボードが表示されていることを確認
    const boardElement = container.querySelector('[data-testid="board"]');
    expect(boardElement).toBeInTheDocument();
  });
  
  it('allows placing discs and updates the game state', () => {
    const { getByText, getByTestId } = render(<App />);
    
    // 有効な手（初期状態で黒が置ける場所）を見つける
    // 例: (2, 3)の位置
    const validCell = getByTestId('cell-2-3');
    
    // セルをクリック
    fireEvent.click(validCell);
    
    // スコアが更新されていることを確認
    const blackScoreText = screen.getAllByText('4')[0];
    const whiteScoreText = screen.getAllByText('1')[0];
    
    expect(blackScoreText).toBeInTheDocument();
    expect(whiteScoreText).toBeInTheDocument();
    
    // 次のプレイヤーが白になっていることを確認
    expect(getByText('白')).toBeInTheDocument();
  });
  
  it('resets the game when reset button is clicked', () => {
    const { getByText, getAllByText } = render(<App />);
    
    // リセットボタンをクリック
    const resetButton = getByText('ゲームをリセット');
    fireEvent.click(resetButton);
    
    // 初期状態に戻っていることを確認
    expect(getByText('黒')).toBeInTheDocument();
    
    // スコアが初期値に戻っていることを確認
    const scoreElements = getAllByText('2');
    expect(scoreElements.length).toBe(2);
  });
});