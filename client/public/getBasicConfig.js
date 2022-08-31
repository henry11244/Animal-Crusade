import React, { Component } from 'react';
import Phaser from 'phaser';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.game = null;
    this.create = () => {
      this.game.stage.backgroundColor = '#124184';
    }
  }

  componentDidMount() {
    this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-target',
      {
        create: this.create
      }
    );

    console.log(this.create);
  }

  render() {
    return (
      <section id="phaser-target">
        hello there old friend
      </section>
    )
  }
}