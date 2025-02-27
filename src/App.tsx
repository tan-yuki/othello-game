import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { Board as BoardType, Player, Scores } from './types';
import {
  createInitialBoard,
  canPlaceDisc,
  flipDiscs,
  countDiscs,
  canPlayerMove
} from './utils/gameLogic';

const App: React.FC = () => {
  // ゲームの状態
  const [board, setBoard] = useState<BoardType>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black'); // 黒が先手
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores>({ black: 2, white: 2 });

  // 石を置く処理
  const handleCellClick = (row: number, col: number): void => {
    if (gameOver || !canPlaceDisc(board, row, col, currentPlayer)) {
      return;
    }

    // 石を置いてひっくり返す
    const newBoard = flipDiscs(board, row, col, currentPlayer);
    setBoard(newBoard);

    // 次のプレイヤーを設定
    const nextPlayer: Player = currentPlayer === 'black' ? 'white' : 'black';
    
    // 次のプレイヤーが石を置けるかチェック
    const canNextPlayerMove = canPlayerMove(newBoard, nextPlayer);

    // 次のプレイヤーが石を置けない場合
    if (!canNextPlayerMove) {
      // 現在のプレイヤーも石を置けるかチェック
      const canCurrentPlayerMove = canPlayerMove(newBoard, currentPlayer);

      // 両プレイヤーとも石を置けない場合はゲーム終了
      if (!canCurrentPlayerMove) {
        setGameOver(true);
      }
    } else {
      // 次のプレイヤーに交代
      setCurrentPlayer(nextPlayer);
    }
  };

  // スコアを計算
  useEffect(() => {
    const { black, white } = countDiscs(board);
    setScores({ black, white });
  }, [board]);

  // ゲームをリセット
  const resetGame = (): void => {
    setBoard(createInitialBoard());
    setCurrentPlayer('black');
    setGameOver(false);
    setScores({ black: 2, white: 2 });
  };

  return (
    <AppContainer>
      <Title>オセロゲーム</Title>
      <GameContainer>
        <Board 
          board={board} 
          onCellClick={handleCellClick} 
          currentPlayer={currentPlayer}
          canPlaceDisc={canPlaceDisc}
        />
        <GameInfo 
          currentPlayer={currentPlayer} 
          scores={scores} 
          gameOver={gameOver} 
          onReset={resetGame}
        />
      </GameContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export default App;