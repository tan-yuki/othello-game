import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const Board = ({ board, onCellClick, currentPlayer, canPlaceDisc }) => {
  return (
    <BoardContainer>
      {board.map((row, rowIndex) => (
        <BoardRow key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isValidMove={canPlaceDisc(rowIndex, colIndex, currentPlayer)}
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