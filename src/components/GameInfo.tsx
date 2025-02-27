import React from 'react';
import styled from 'styled-components';
import Disc from './Disc';
import { Player, Scores } from '../types';

interface GameInfoProps {
  currentPlayer: Player;
  scores: Scores;
  gameOver: boolean;
  onReset: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, scores, gameOver, onReset }) => {
  const getWinner = (): Player | 'draw' => {
    if (scores.black > scores.white) return 'black';
    if (scores.white > scores.black) return 'white';
    return 'draw';
  };

  return (
    <GameInfoContainer>
      {!gameOver ? (
        <>
          <InfoSection>
            <InfoTitle>現在のプレイヤー</InfoTitle>
            <CurrentPlayerContainer>
              <Disc color={currentPlayer} />
              <PlayerName>{currentPlayer === 'black' ? '黒' : '白'}</PlayerName>
            </CurrentPlayerContainer>
          </InfoSection>
        </>
      ) : (
        <InfoSection>
          <InfoTitle>ゲーム終了</InfoTitle>
          <WinnerContainer>
            {getWinner() === 'draw' ? (
              <WinnerText>引き分け</WinnerText>
            ) : (
              <>
                <Disc color={getWinner() as Player} />
                <WinnerText>
                  {getWinner() === 'black' ? '黒' : '白'}の勝利！
                </WinnerText>
              </>
            )}
          </WinnerContainer>
        </InfoSection>
      )}

      <InfoSection>
        <InfoTitle>スコア</InfoTitle>
        <ScoreContainer>
          <ScoreItem>
            <Disc color="black" />
            <Score>{scores.black}</Score>
          </ScoreItem>
          <ScoreItem>
            <Disc color="white" />
            <Score>{scores.white}</Score>
          </ScoreItem>
        </ScoreContainer>
      </InfoSection>

      <ResetButton onClick={onReset}>
        ゲームをリセット
      </ResetButton>
    </GameInfoContainer>
  );
};

const GameInfoContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  border-bottom: 2px solid #43a047;
  padding-bottom: 5px;
`;

const CurrentPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayerName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const WinnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WinnerText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Score = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ResetButton = styled.button`
  background-color: #43a047;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2e7d32;
  }
`;

export default GameInfo;