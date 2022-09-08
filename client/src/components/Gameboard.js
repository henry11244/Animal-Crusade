import { React, useEffect, useState } from "react";
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement("body");

// this is the styling for the 'bird' aka Jerome
function randomNum(max) {
  return Math.floor(Math.random() * max);
};

// this is the styling for the modal
const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// this is the styling for the 'bird' aka Jerome
const Bird = styled.div`
 position: absolute;
 height: ${(props) => props.size}px;
 width: ${(props) => props.size}px;
 top: ${(props) => props.top}px;
 background: url('mvp.jfif');
 background-repeat: no-repeat;
 background-size: 60px 60px;
 border-radius: 50%
 `;

// this is the styling for the game container
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

// this is the styling for the actual game inside the container
const GameBox = styled.div`
 height: ${(props) => props.height}px;
 width: ${(props) => props.width}px;
 background-color: cyan;
 overflow: hidden;
 `;


// these are the variables that control the size of the game entities
const birdSize = 50;
const gameWidth = 500;
const gameHeight = 500;
const Gravity = 6;
const JumpHeight = 100;
const obstacleWidth = 30;
const obstacleGap = 250;

// this is the function that runs the game as a whole
function Gameboard() {

  // useState hook for modal
  const [modalIsOpen, setIsOpen] = useState(false);


  const [randomNumber, setRandomNumber] = useState(randomNum(3));

  useEffect(() => {
    const interval = setInterval(() => setRandomNumber(randomNum(3)), 3500);
  }, [])

  const Obstacle = styled.div`
 position: relative;
 top: ${(props) => props.top}px; 
 background-repeat: no-repeat;
 background: url('ta${randomNumber}.jfif');
 background-size: 40px ;
 width: ${(props) => props.width}px;
 height: ${(props) => props.height}px;
 left: ${(props) => props.left}px;
`;

  const [birdPosition, setBirdPosition] = useState(250);
  // this stops the game from starting constantly
  const [gameHasStarted, setGameHasStarted] = useState(false);
  // this sets the top obstacle height
  const [obstacleHeight, setObstacleHeight] = useState(200);
  // this reads the left right position of the bird
  const [obstacleLeft, setObstacleLeft] = useState(gameWidth - obstacleWidth);
  // this sets the user score
  const [score, setScore] = useState(-1);

  // closes the modal when the close button is clicked and sets the score back to 0
  function closeModal() {
    setIsOpen(false)
    setScore(0)
  };

  // this sets the bottom obstacle height
  const bottomObstacleHeight = gameHeight - obstacleGap - obstacleHeight;

  // this effect checks to see if the game started and makes the bird move
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

  // this makes the walls move toward 'Jerome'
  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -obstacleWidth) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
      }, 24);
      return () => {
        clearInterval(obstacleId);
      }
    }
    // this randomly generates a new wall each time
    else {
      setObstacleLeft(gameWidth - obstacleWidth);
      setObstacleHeight(
        Math.floor(Math.random() * (gameHeight - obstacleGap))
      );
      setScore(score => score + 1);
    }
  }, [gameHasStarted, obstacleLeft]);

  var modalScore = score - 2;

  // this effect is for the collisions on the pipes
  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObstacle = birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;

    if (obstacleLeft >= 0 && obstacleLeft <= obstacleWidth && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle)) {
      setIsOpen(true)
      setGameHasStarted(false);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft, score]);

  // this function controls 'Jerome' with each click/ aka handling what happens after each click
  const handleClick = () => {
    let newBirdPosition = birdPosition - JumpHeight;
    if (!gameHasStarted) {
      setGameHasStarted(true);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  };

  // this is generating the game through react
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
            width={obstacleWidth}
            height={bottomObstacleHeight}
            left={obstacleLeft}

          />
          <Bird size={birdSize} top={birdPosition} />
        </GameBox>
        <span> {score} </span>
      </Box>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Score: <span> {modalScore} </span></h2>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
    </>
  );
};

export default Gameboard;