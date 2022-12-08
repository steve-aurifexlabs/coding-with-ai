// Write a phaser.js game boilerplate that includes a game class, a player class, and an enemy class.
// The game class should have a preload, create, and update methods.
// The player class should have a create method that creates a sprite and adds it to the game.
// The enemy class should have a create method that creates a sprite and adds it to the game.
// The player and enemy classes should have an update method that moves the sprite.
// The player class should have a handleInput method that moves the sprite based on the keyboard input.
// The game class should have a checkCollisions method that checks for collisions between the player and enemy sprites.
// The game class should have a gameOver method that displays a game over message.
// The game class should have a reset method that resets the game.
// The game class should have a win method that displays a win message.
// The game class should have a displayScore method that displays the score.
// The game class should have a displayLives method that displays the number of lives.
// The game class should have a displayLevel method that displays the level.
// The game class should have a displayMessage method that displays a message.
// The game class should have a displayGameOver method that displays a game over

// Here are the implementations of those 3 classes

class Game {
    constructor() {
      this.game = new Phaser.Game(
        config.width,
        config.height,
        Phaser.AUTO,
        '',
        {
          preload: this.preload,
          create: this.create,
          update: this.update,
        }
      );
    }
  
    preload() {
      this.game.load.image('player', 'assets/images/player.png');
      this.game.load.image('enemy', 'assets/images/enemy.png');
    }
  
    create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.stage.backgroundColor = '#fff';
      this.game.world.enableBody = true;
  
      this.player = new Player(this.game);
      this.enemy = new Enemy(this.game);
    }
  
    update() {
      this.player.update();
      this.enemy.update();
      this.checkCollisions();
    }
  
    checkCollisions() {
      this.game.physics.arcade.collide(this.player.sprite, this.enemy.sprite, () => {
        this.gameOver();
      });
    }
  
    gameOver() {
      this.displayMessage('Game Over');
      this.reset();
    }
  
    reset() {
      this.player.reset();
      this.enemy.reset();
    }
  
    win() {
      this.displayMessage('You Win!');
      this.reset();
    }
  
    displayScore() {
      this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }
  
    displayLives() {
      this.livesText = this.game.add.text(16, 50, 'lives: 3', { fontSize: '32px', fill: '#000' });
    }
  
    displayLevel() {
      this.levelText = this.game.add.text(16, 84, 'level: 1', { fontSize: '32px', fill: '#000' });
    }
  
    displayMessage(message) {
      this.messageText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, message, { fontSize: '32px', fill: '#000' });
      this.messageText.anchor.setTo(0.5, 0.5);
    }
  
    displayGameOver() {
      this.gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over', { fontSize: '32px', fill: '#000' });
      this.gameOverText.anchor.setTo(0.5, 0.5);
    }
  }
  
  class Player {
    constructor(game) {
      this.game = game;
      this.create();
    }
  
    create() {
      this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
      this.sprite.anchor.setTo(0.5, 0.5);
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
    }
  
    update() {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
      if (this.game.cursors.left.isDown) {
        this.sprite.body.velocity.x = -150;
      } else if (this.game.cursors.right.isDown) {
        this.sprite.body.velocity.x = 150;
      } else if (this.game.cursors.up.isDown) {
        this.sprite.body.velocity.y = -150;
      } else if (this.game.cursors.down.isDown) {
        this.sprite.body.velocity.y = 150;
      }
    }
  
    reset() {
      this.sprite.reset(this.game.world.centerX, this.game.world.centerY);
    }
  }
  
  class Enemy {
    constructor(game) {
      this.game = game;
      this.create();
    }
  
    create() {
      this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'enemy');
      this.sprite.anchor.setTo(0.5, 0.5);
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
    }
  
    update() {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
      if (this.game.cursors.left.isDown) {
        this.sprite.body.velocity.x = -150;
      } else if (this.game.cursors.right.isDown) {
        this.sprite.body.velocity.x = 150;
      } else if (this.game.cursors.up.isDown) {
        this.sprite.body.velocity.y = -150;
      } else if (this.game.cursors.down.isDown) {
        this.sprite.body.velocity.y = 150;
      }
    }
  
    reset() {
      this.sprite.reset(this.game.world.centerX, this.game.world.centerY);
    }
  }
  
  // Here is the game class instantiation
  
  const game = new Game();
  
  class Goblin extends Enemy {
      // A Goblin moves slower than a base Enemy. And Goblins have a single spell called "Goblin Time"
      // Goblin Time is a spell that slows down the player for a short period of time.
      // The Goblin class should have a constructor that takes in a game object and a position object.
      // The Goblin class should have a create method that creates a sprite and adds it to the game.
      // The Goblin class should have an update method that moves the sprite.
      // The Goblin class should have a castSpell method that casts the Goblin Time spell.
      // The Goblin class should have a reset method that resets the Goblin.
  
      constructor(game, position) {
          super(game, position);
          this.speed = 100;
          this.spell = 'Goblin Time';
      }
  
      create() {
          this.sprite = this.game.add.sprite(this.position.x, this.position.y, 'goblin');
          this.sprite.anchor.setTo(0.5, 0.5);
          this.game.physics.arcade.enable(this.sprite);
          this.sprite.body.collideWorldBounds = true;
      }
  
      update() {
          this.sprite.body.velocity.x = 0;
          this.sprite.body.velocity.y = 0;
          if (this.game.cursors.left.isDown) {
              this.sprite.body.velocity.x = -this.speed;
          } else if (this.game.cursors.right.isDown) {
              this.sprite.body.velocity.x = this.speed;
          } else if (this.game.cursors.up.isDown) {
              this.sprite.body.velocity.y = -this.speed;
          } else if (this.game.cursors.down.isDown) {
              this.sprite.body.velocity.y = this.speed;
          }
      }
  
      castSpell() {
          // TODO: Implement this method
      }
  
      reset() {
          this.sprite.reset(this.position.x, this.position.y);
      }
  }
  
  class Wizard extends Player {
      // A Wizard moves slower than a base Player.
      // And Wizards have a two spells, one called "Wizard Time" and the other "Teleport" that should randomly move the Wizard about a distance of 400 away from it's current position 
      // Wizard Time is a spell that slows down the enemy.
      // The Wizard class should have a constructor that takes in a game object and a position object.
      // The Wizard class should have a create method that creates a sprite and adds it to the game.
      // The Wizard class should have an update method that moves the sprite.
      // The Wizard class should have a castSpell method that casts the Wizard Time spell.
      // The Wizard class should have a teleport method that teleports the Wizard.
      // The Wizard class should have a reset method that resets the Wizard.
  
      constructor(game, position) {
          super(game, position);
          this.speed = 100;
          this.spell = 'Wizard Time';
      }
  
      create() {
          this.sprite = this.game.add.sprite(this.position.x, this.position.y, 'wizard');
          this.sprite.anchor.setTo(0.5, 0.5);
          this.game.physics.arcade.enable(this.sprite);
          this.sprite.body.collideWorldBounds = true;
      }
  
      update() {
          this.sprite.body.velocity.x = 0;
          this.sprite.body.velocity.y = 0;
          if (this.game.cursors.left.isDown) {
              this.sprite.body.velocity.x = -this.speed;
          } else if (this.game.cursors.right.isDown) {
              this.sprite.body.velocity.x = this.speed;
          } else if (this.game.cursors.up.isDown) {
              this.sprite.body.velocity.y = -this.speed;
          } else if (this.game.cursors.down.isDown) {
              this.sprite.body.velocity.y = this.speed;
          }
      }
  
      castSpell() {
          // TODO: Implement this method
      }
  
      teleport() {
          if(this.teleporter) {
              this.teleporter.teleport(this)
          } else {
              teleport(this)
          }
      }
  
      reset() {
          this.sprite.reset(this.position.x, this.position.y);
      }
  }
  
  // Use this.sprite.body attributes to directly set the position using += with a random x and y values so that the distance is always 100 away 
  function teleport(obj) {
      obj.sprite.body.x += Math.random() * 400;
      obj.sprite.body.y += Math.random() * 400;
  }
  
  // This code at the top level overrides the player with a Wizard instead
  game.player = new Wizard(game);
  
  // This overrides the player's teleport method with a version that moves in the negative directions
  game.player.teleporter = class BackwardsTeleporter {
      teleport(obj) {
          obj.sprite.body.x -= Math.random() * 400;
          obj.sprite.body.y -= Math.random() * 400;
      }
  }