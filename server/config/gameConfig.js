const game = new Phaser.Game(config);

function preload() {
    this.load.tilemapTiledJSON("game-map", "map/animalcrusademap.json");
  }

function create() {

  
    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
        },
      ],
    };
  
    this.gridEngine.create(tilemap, gridEngineConfig);
  

  }