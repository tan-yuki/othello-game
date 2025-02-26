import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import GameInfo from './components/GameInfo';

// 初期ボード状態を作成する関数
const createInitialBoard = () => {
  // 8x8の空のボードを作成
  const board = Array(8).fill().map(() => Array(8).fill(null));
  
  // 初期配置（中央の4マスに石を配置）
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  
  return board;
};

const App = () => {
  // ゲームの状態
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState('black'); // 黒が先手
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ black: 2, white: 2 });

  // 指定された位置に石を置けるかどうかを確認する関数
  const canPlaceDisc = (row, col, player) => {
    // すでに石が置かれている場合は置けない
    if (board[row][col] !== null) {
      return false;
    }

    const opponent = player === 'black' ? 'white' : 'black';
    const directions = [
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
  const flipDiscs = (row, col, player) => {
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = player;

    const opponent = player === 'black' ? 'white' : 'black';
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    // 各方向をチェック
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const discsToFlip = [];

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

  // 石を置く処理
  const handleCellClick = (row, col) => {
    if (gameOver || !canPlaceDisc(row, col, currentPlayer)) {
      return;
    }

    // 石を置いてひっくり返す
    const newBoard = flipDiscs(row, col, currentPlayer);
    setBoard(newBoard);

    // 次のプレイヤーを設定
    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
    
    // 次のプレイヤーが石を置けるかチェック
    let canNextPlayerMove = false;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (canPlaceDisc(i, j, nextPlayer)) {
          canNextPlayerMove = true;
          break;
        }
      }
      if (canNextPlayerMove) break;
    }

    // 次のプレイヤーが石を置けない場合
    if (!canNextPlayerMove) {
      // 現在のプレイヤーも石を置けるかチェック
      let canCurrentPlayerMove = false;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (canPlaceDisc(i, j, currentPlayer)) {
            canCurrentPlayerMove = true;
            break;
          }
        }
        if (canCurrentPlayerMove) break;
      }

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

    setScores({ black: blackCount, white: whiteCount });
  }, [board]);

  // ゲームをリセット
  const resetGame = () => {
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