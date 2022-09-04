import { React, useEffect, useState } from "react";
import styled from 'styled-components';
import Timer from "../components/Timer";
import "../styles.css";

// import { GameEngine } from "react-game-engine";
// import { Jump, GameControls } from "../systems";
// import { Dot, Blocks } from "../renderers";

const Bird = styled.div`
position: absolute;
background-color: red;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.top}px;
border-radius: 50%`;

const Box = styled.div`
 display: flex;
 width: 100%;
 justify-content: center;
`;

const GameBox = styled.div`
 height: ${(props) => props.height}px;
 width: ${(props) => props.width}px;
 background-color: cyan;
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
const obstacleGap = 200;

// const styles = {
//   container: {
//     width: "100%",
//     height: "100%"
//   }
// };

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       running: false,
//       paused: false
//     };
//     this.gameEngine = React.createRef();
//   }
//   componentDidMount() {
//     document.addEventListener("keydown", this.handleKeyDown, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.handleKeyDown, false);
//   }

//   handleKeyDown = e => {
//     e.preventDefault();

//     if (e.keyCode === 32 && this.state.running === false) {
//       this.setState({
//         running: true
//       });
//       this.gameEngine.current.start();
//     } else if (e.keyCode === 32 && this.state.paused) {
//       this.setState({
//         paused: false
//       });
//       this.gameEngine.current.dispatch({ type: "unpaused" });
//     } else if (e.keyCode === 27) {
//       this.setState({
//         paused: true
//       });
//       this.gameEngine.current.dispatch({ type: "pause" });
//     }
//   };

//   handleGameEvent = e => {
//     console.log("game event => ", e);
//   };
// };

function Gameboard() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [ gameHasStarted, setGameHasStarted ] = useState(false);
  const [ obstacleHeight, setObstacleHeight ] = useState(100);
  const [ obstacleLeft, setObstacleLeft ] = useState(gameWidth - obstacleWidth);

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
  }, [ birdPosition, gameHasStarted ]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JumpHeight;
    if(!gameHasStarted) {
      setGameHasStarted(true);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition)
    }
  };

  return (
    <>
      <div className="border col-1" id='timer' >
        <Timer />
      </div>
      <div className="game border col-9">
        <div className="game__instructions">
          <p>
            <code>Space</code> to Jump | <code>Esc</code> to Stop
          </p>
        </div>
      </div>
      <Box onClick={handleClick}>
        <GameBox height={gameHeight} width={gameWidth}>
          <Obstacle
          top= {0}
          width= {obstacleWidth}
          height= {obstacleHeight}
          left= {obstacleLeft}
          />
          <Obstacle
          top= {gameHeight - (obstacleHeight + bottomObstacleHeight)}
          width= {obstacleWidth}
          height= {bottomObstacleHeight}
          left= {obstacleLeft}
          />
          <Bird size={birdSize} top={birdPosition} />
        </GameBox>
      </Box>
    </>
  );
};

export default Gameboard;