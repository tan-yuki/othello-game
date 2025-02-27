import React from 'react';
import styled from 'styled-components';
import Disc from './Disc';
import { CellValue } from '../types';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isValidMove: boolean;
  'data-testid'?: string;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isValidMove, 'data-testid': dataTestId }) => {
  return (
    <CellContainer
      onClick={onClick}
      $isValidMove={isValidMove}
      data-testid={dataTestId}
      className={isValidMove ? 'valid-move' : ''}
    >
      {value && <Disc color={value} />}
      {!value && isValidMove && <ValidMoveIndicator />}
    </CellContainer>
  );
};

interface CellContainerProps {
  $isValidMove: boolean;
}

const CellContainer = styled.div<CellContainerProps>`
  width: 50px;
  height: 50px;
  background-color: #43a047;
  border: 1px solid #2e7d32;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: ${props => props.$isValidMove ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => props.$isValidMove ? '#66bb6a' : '#43a047'};
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ValidMoveIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Cell;