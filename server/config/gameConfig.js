const gameConfig = {
  plugins: {
    scene: [
      {
        key: 'gridEngine',
        plugin: GridEngine,
        mapping: 'gridEngine',
      },
    ],
  },
};

const game = new Phaser.Game(gameConfig);

function preload() {
  this.load.tilemapTiledJSON('game-map', 'map/animalcrusademap.json');
};


function create() {
  const tileMap = this.make.tilemap({ key: 'game-map' });

  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const npcSprite = this.add.sprite(0, 0, "dog");
  npcSprite.scale = 1.5;

  const gridEngineConfig = {
    characters: [
      {
        id: 'player',
        sprite: playerSprite,
        walkingAnimationMapping: 6,
      },
      {
        id: "npc0",
        sprite: npcSprite,
        walkingAnimationMapping: 0,
        speed: 3,
      },
    ],
  };

  this.gridEngine.create(tileMap, gridEngineConfig);
  this.gridEngine.moveRandomly("npc0");
};



function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.gridEngine.move("player", "left");
  } else if (cursors.right.isDown) {
    this.gridEngine.move("player", "right");
  } else if (cursors.up.isDown) {
    this.gridEngine.move("player", "up");
  } else if (cursors.down.isDown) {
    this.gridEngine.move("player", "down");
  }
};


