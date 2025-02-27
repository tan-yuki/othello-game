import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Player } from '../types';

interface DiscProps {
  color: Player;
}

const Disc: React.FC<DiscProps> = ({ color }) => {
  return <DiscContainer color={color} />;
};

const flipAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

interface DiscContainerProps {
  color: Player;
}

const DiscContainer = styled.div<DiscContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color === 'black' ? '#000' : '#fff'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${flipAnimation} 0.3s ease-out;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export default Disc;