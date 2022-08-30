const gameConfig = {


  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },


};

const game = new Phaser.Game(gameConfig);

module.exports = game;