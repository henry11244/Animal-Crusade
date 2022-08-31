import React, { PureComponent } from "react";
import { concat, drop } from "lodash";

import "./styles.css";

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

class Dot extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            running: props.running
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.running !== this.props.running) {
            this.setState({
                running: this.props.running
            });
        }
    }
    render() {
        const { running } = this.state;
        const size = 80;
        const x = this.props.x + size / 2;
        const y = this.props.y - size + -12;
        return (
            <div
                className={running ? "dot__running" : "dot__waiting"}
                style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    backgroundColor: "orangered",
                    left: x,
                    top: y,
                    borderRadius: "50%",
                    transition: "all 50ms ease-out"
                }}
            />
        );
    }
}

class Block extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            opacity: 0
        };
        this.size = 30;
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                x: this.props.x,
                y: 300,
                opacity: 1
            });
            setTimeout(() => {
                this.setState({
                    x: 0 - this.size
                });
            }, 350);
        }, 2000);
    }
    render() {
        const x = this.state.x;
        const y = this.state.y - this.size;
        const opacity = this.state.opacity;
        return (
            <div
                style={{
                    position: "absolute",
                    width: this.size,
                    height: this.size,
                    backgroundColor: "darkcyan",
                    left: x,
                    top: y,
                    transition: "top 300ms ease-in, left 2000ms ease-in",
                    opacity: opacity
                }}
            />
        );
    }
}

class Blocks extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            gameWidth: null,
            zoneMin: null,
            zoneMax: null,
            running: props.running,
            blocks: []
        };
        this.gameWindow = React.createRef();
    }
    componentDidMount() {
        const clientWidth = this.gameWindow.current.clientWidth;
        this.setState({
            gameWidth: clientWidth,
            zoneMin: clientWidth / 4,
            zoneMax: clientWidth
        });
    }
    componentDidUpdate(prevProps, prevState) {
        const { blocks, zoneMin, zoneMax } = this.state;
        const { running } = this.props;
        const newID = Math.random();

        if (prevProps.running !== running) {
            this.setState({
                running: running,
                blocks: running
                    ? concat(blocks, [
                        <Block x={getRandomInt(zoneMin, zoneMax)} y={0} key={newID} />
                    ])
                    : blocks.splice(0, blocks.length)
            });
        }

        if (prevState.blocks.length !== blocks.length) {
            if (running) {
                setTimeout(() => {
                    if (blocks.length < 12) {
                        this.setState({
                            blocks: concat(blocks, [
                                <Block x={getRandomInt(zoneMin, zoneMax)} y={0} key={newID} />
                            ])
                        });
                    } else if (blocks.length) {
                        this.setState({
                            blocks: drop(blocks)
                        });
                    }
                }, 1000);
            }
        }
    }
    render() {
        const { blocks, running } = this.state;

        return (
            <div ref={this.gameWindow} className="blocks__container">
                {running && blocks.length && blocks.map(x => x)}
            </div>
        );
    }
}

export { Dot, Blocks };
