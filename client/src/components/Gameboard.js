import { React, useEffect, useState } from "react";
import styled from 'styled-components';
import Timer from "../components/Timer";
import "../styles.css";

const Bird = styled.div`
position: absolute;

height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.top}px;
background: url('mvp.jfif');

background-repeat: no-repeat;
  background-size: 20px 20px;
border-radius: 50%`;

const Box = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
 & span{
  color: white;
  font-size: 24px;
  position: absolute;
 }
`;

const GameBox = styled.div`
 height: ${(props) => props.height}px;
 width: ${(props) => props.width}px;
 background-color: cyan;
 overflow: hidden;
`;

const Obstacle = styled.div`
position: relative;
top: ${(props) => props.top}px;  
background-color: green;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
left: ${(props) => props.left}px;

`

const birdSize = 20;
const gameWidth = 1000;
const gameHeight = 700;
const Gravity = 6;
const JumpHeight = 100;
const obstacleWidth = 40;
const obstacleBottomWidth = 40;
const obstacleGap = 220;

function Gameboard() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [obstacleLeft, setObstacleLeft] = useState(gameWidth - obstacleWidth);
  const [score, setScore] = useState(0);

  const bottomObstacleHeight = gameHeight - obstacleGap - obstacleHeight;

  useEffect(() => {

    let timeId;
    if (gameHasStarted && birdPosition < gameHeight - birdSize) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + Gravity)
      }, 24);
    }
    return () => {
      clearInterval(timeId)
    }
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -obstacleWidth) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 7);
      }, 24);
      return () => {
        clearInterval(obstacleId);
      }
    }
    else {
      setObstacleLeft(gameWidth - obstacleWidth);
      setObstacleHeight(Math.floor(Math.random() * (gameHeight - obstacleGap)));
      setScore(score => score + 1);
    }
  }, [gameHasStarted, obstacleLeft]);

  useEffect(() => {
    const hasCollidedWithTopObsticle = birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObsticle = birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;

    if (obstacleLeft >= 0 && (obstacleLeft <= obstacleWidth && obstacleLeft <= obstacleBottomWidth) && (hasCollidedWithBottomObsticle || hasCollidedWithTopObsticle)) {
      setGameHasStarted(false);
      setScore(-1)
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JumpHeight;
    if (!gameHasStarted) {
      setGameHasStarted(true);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition)
    }
  };

  return (
    <>
      <Box onClick={handleClick}>
        <GameBox height={gameHeight} width={gameWidth}>
          <Obstacle
            top={0}
            width={obstacleWidth}
            height={obstacleHeight}
            left={obstacleLeft}
          />
          <Obstacle
            top={gameHeight - (obstacleHeight + bottomObstacleHeight)}
            width={obstacleBottomWidth}
            height={bottomObstacleHeight}
            left={obstacleLeft}
          />
          <Bird size={birdSize} top={birdPosition} />
        </GameBox>
        <span> {score} </span>
      </Box>
    </>
  );
};

export default Gameboard;