import React from "react";
import { GameEngine } from "react-game-engine";

import { Jump, GameControls } from "../systems";
import { Dot, Blocks } from "../renderers";

import "../styles.css";

const styles = {
  container: {
    width: "100%",
    height: "100%"
  }

};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      paused: false
    };
    this.gameEngine = React.createRef();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = e => {
    e.preventDefault();

    if (e.keyCode === 32 && this.state.running === false) {
      this.setState({
        running: true
      });
      this.gameEngine.current.start();
    } else if (e.keyCode === 32 && this.state.paused) {
      this.setState({
        paused: false
      });
      this.gameEngine.current.dispatch({ type: "unpaused" });
    } else if (e.keyCode === 27) {
      this.setState({
        paused: true
      });
      this.gameEngine.current.dispatch({ type: "pause" });
    }
  };

  handleGameEvent = e => {
    console.log("game event => ", e);
  };

  render() {
    const { running } = this.state;
    return (
      
      <div className="game border col-9">

        <div className="game__container">
          <GameEngine
            ref={this.gameEngine}
            running={running}
            onEvent={this.handleGameEvent}
            style={styles.container}
            systems={[Jump, GameControls]}
            entities={{
              dot: {
                renderer: Dot,
                x: 24,
                y: 300,
                running: running
              },
              blocks: {
                renderer: Blocks,
                running: running
              }
            }}
          />
        </div>
        <div className="game__instructions">
          <p>
            <code>Space</code> to Jump | <code>Esc</code> to Stop
          </p>
        </div>
      </div>
    );
  }
}