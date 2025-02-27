import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import GameInfo from '../../components/GameInfo';

describe('GameInfo Component', () => {
  it('renders current player info when game is not over', () => {
    const mockOnReset = jest.fn();
    const { getByText, queryByText } = render(
      <GameInfo
        currentPlayer="black"
        scores={{ black: 2, white: 2 }}
        gameOver={false}
        onReset={mockOnReset}
      />
    );
    
    // 現在のプレイヤー情報が表示されていることを確認
    expect(getByText('現在のプレイヤー')).toBeInTheDocument();
    expect(getByText('黒')).toBeInTheDocument();
    
    // ゲーム終了メッセージが表示されていないことを確認
    expect(queryByText('ゲーム終了')).toBeNull();
    
    // スコアが表示されていることを確認
    expect(getByText('スコア')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument(); // 両方のスコアが2
    
    // リセットボタンが表示されていることを確認
    const resetButton = getByText('ゲームをリセット');
    expect(resetButton).toBeInTheDocument();
  });
  
  it('renders game over info with black as winner', () => {
    const mockOnReset = jest.fn();
    const { getByText, queryByText } = render(
      <GameInfo
        currentPlayer="black"
        scores={{ black: 5, white: 3 }}
        gameOver={true}
        onReset={mockOnReset}
      />
    );
    
    // ゲーム終了メッセージが表示されていることを確認
    expect(getByText('ゲーム終了')).toBeInTheDocument();
    expect(getByText('黒の勝利！')).toBeInTheDocument();
    
    // 現在のプレイヤー情報が表示されていないことを確認
    expect(queryByText('現在のプレイヤー')).toBeNull();
  });
  
  it('renders game over info with white as winner', () => {
    const mockOnReset = jest.fn();
    const { getByText } = render(
      <GameInfo
        currentPlayer="black"
        scores={{ black: 3, white: 5 }}
        gameOver={true}
        onReset={mockOnReset}
      />
    );
    
    expect(getByText('白の勝利！')).toBeInTheDocument();
  });
  
  it('renders game over info with draw', () => {
    const mockOnReset = jest.fn();
    const { getByText } = render(
      <GameInfo
        currentPlayer="black"
        scores={{ black: 4, white: 4 }}
        gameOver={true}
        onReset={mockOnReset}
      />
    );
    
    expect(getByText('引き分け')).toBeInTheDocument();
  });
  
  it('calls onReset when reset button is clicked', () => {
    const mockOnReset = jest.fn();
    const { getByText } = render(
      <GameInfo
        currentPlayer="black"
        scores={{ black: 2, white: 2 }}
        gameOver={false}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = getByText('ゲームをリセット');
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});