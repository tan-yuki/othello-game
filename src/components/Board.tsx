import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { Board as BoardType, Player } from '../types';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
  canPlaceDisc: (board: BoardType, row: number, col: number, player: Player) => boolean;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, currentPlayer, canPlaceDisc }) => {
  return (
    <BoardContainer data-testid="board">
      {board.map((row, rowIndex) => (
        <BoardRow key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isValidMove={canPlaceDisc(board, rowIndex, colIndex, currentPlayer)}
              data-testid={`cell-${rowIndex}-${colIndex}`}
            />
          ))}
        </BoardRow>
      ))}
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1b5e20;
  border: 8px solid #2e7d32;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const BoardRow = styled.div`
  display: flex;
`;

export default Board;