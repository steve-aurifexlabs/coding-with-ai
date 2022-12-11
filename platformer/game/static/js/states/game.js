// Javascript
// A NES style platformer using phaser.js

// There a 5 levels in the core game.
// Each level has a different theme: pirates, ninjas, vampires, fantasy, sci-fi
// There is a spritesheet for the platforms for each level.
// There are 2 large background images that use parallax for each level.

// There is a simple OO heirarchy with GameObject at the root.
// All GameObject instances use the component-entity model for implementing most systems.
// Player, Enemy, NPC, and Projectile are subclasses of GameObject.
// Enemy and Projectile have subclasses.
// If in doubt try to follow Game Programming Patterns by Robert Nystrom.

// The player uses animation spritesheets for walk, jog, and run.
// The animation is selected based on the player's speed.
// The player is only animated while on the ground.
// Our hero (the player) is named Kay Keycone.

// There large and small enemies and then a bunch of each of those type.
// Each level has different enemies and projectiles.
// Enemies get progressively harder.
// Occasionally later levels will includes an enemy from an earlier level using a projectile from this level.
// Enemies move and attack differently from each other.

// There are 2 or 3 NPCs per level.
// One of the NPCs from level 1 re-appears in level 5.
// NPCs talk to the player using speech bubbles when the player attacks them.
// NPCs can't fight or get hurt. They never move.

// The controls should use a gamepad and keyboard with A and B buttons and a C-pad (direction pad or arrows)
// The A button makes the player jump.
// The B button makes the player run faster like mario.
// The player automatically attacks when it gets near an ememy and does an attack animation.
// The C-pad controls the player's acceleration with a very fast acceleration to a max speed.

// Each level is 10-20 boards long.
// Each level has 20-30 enemies.
// Levels get progressively longer.

// There are some special rules for the core levels to give them personality.
// Level 2 is in the style of Starry Night by Van Gogh.
// Level 3 has holes in the ground that if you fall through you lose.
// Level 4 is in the forest and has ladders that let you climb up like the ewok village on endor.
// Level 5 is on the inside of a spaceship and has lower gravity.


/////////////////////////////
// Implementation starts here

class Game {
  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: this.preload, create: this.create, update: this.update });
  }

  preload() {
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sky = this.game.add.sprite(0, 0, 'sky');

    this.levels = []
    for (var i = 0; i < 5; i++) {
      this.levels.push(new Level());
    }

    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    this.player = new Player(this.game, 32, this.game.world.height - 150);

    this.stars = this.game.add.group();
    this.stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
      var star = this.stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 6;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.game.physics.arcade.collide(this.player.sprite, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.overlap(this.player.sprite, this.stars, this.collectStar, null, this);

    this.player.update();
  }

  collectStar(player, star) {
    star.kill();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  }
}

class GameObject {
  constructor(game) {
    this.game = game;
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
    component.gameObject = this;
  }

  update() {
    this.components.forEach(function(component) {
      component.update();
    });
  }
}

class Player extends GameObject {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'dude');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.addComponent(new PlayerInput(this.game));
  }
}

class PlayerInput {
  constructor(game) {
    this.game = game;
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    var player = this.gameObject;
    var sprite = player.sprite;
    var cursors = this.cursors;

    sprite.body.velocity.x = 0;

    if (cursors.left.isDown) {
      sprite.body.velocity.x = -150;
      sprite.animations.play('left');
    } else if (cursors.right.isDown) {
      sprite.body.velocity.x = 150;
      sprite.animations.play('right');
    } else {
      sprite.animations.stop();
      sprite.frame = 4;
    }

    if (cursors.up.isDown && sprite.body.touching.down) {
      sprite.body.velocity.y = -350;
    }
  }
}

class Enemy extends GameObject {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'dude');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.addComponent(new EnemyInput(this.game));
  }
}

class EnemyInput {
  constructor(game) {
    this.game = game;
    this.cursors = (new BasicEnemyAi(this)).createCursorKeys();
  }

  update() {
    var enemy = this.gameObject;
    var sprite = enemy.sprite;
    var cursors = this.cursors;

    sprite.body.velocity.x = 0;

    if (cursors.left.isDown) {
      sprite.body.velocity.x = -150;
      sprite.animations.play('left');
    } else if (cursors.right.isDown) {
      sprite.body.velocity.x = 150;
      sprite.animations.play('right');
    } else {
      sprite.animations.stop();
      sprite.frame = 4;
    }

    if (cursors.up.isDown && sprite.body.touching.down) {
      sprite.body.velocity.y = -350;
    }
  }
}

class BasicEnemyAi {
  constructor(enemy) {
    this.enemy = enemy;
  }

  createCursorKeys() {
    var cursors = {};
    cursors.left = {};
    cursors.right = {};
    cursors.up = {};
    cursors.down = {};
    cursors.left.isDown = Math.random() < 0.8 ? false : true;
    cursors.right.isDown = !cursors.left.isDown;
    cursors.up.isDown = false;
    cursors.down.isDown = false;
    return cursors;
  }
}

class NPC extends GameObject {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'dude');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.addComponent(new NPCInput(this.game));
  }
}

class NPCInput {
  constructor(game) {
    this.game = game;
    this.cursors = (new BasicNpcAi(this)).createCursorKeys();
  }

  update() {
    var npc = this.gameObject;
    var sprite = npc.sprite;
    var cursors = this.cursors;

    sprite.body.velocity.x = 0;

    if (cursors.left.isDown) {
      sprite.body.velocity.x = -150;
      sprite.animations.play('left');
    } else if (cursors.right.isDown) {
      sprite.body.velocity.x = 150;
      sprite.animations.play('right');
    } else {
      sprite.animations.stop();
      sprite.frame = 4;
    }

    if (cursors.up.isDown && sprite.body.touching.down) {
      sprite.body.velocity.y = -350;
    }
  }
}

class BasicNpcAi {
  constructor(npc) {
    this.npc = npc;
  }

  createCursorKeys() {
    var cursors = {};
    cursors.left = {};
    cursors.right = {};
    cursors.up = {};
    cursors.down = {};
    cursors.left.isDown = false;
    cursors.right.isDown = false;
    cursors.up.isDown = false;
    cursors.down.isDown = false;
    return cursors;
  }
}

class Projectile extends GameObject {
  constructor(game, x, y) {
    super(game);
    this.sprite = game.add.sprite(x, y, 'fireball');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
  }
}

 
class Level {
    constructor(levelNumber) {
      this.levelNumber = levelNumber
  
      this.addPlatforms()
      this.addEnemies()
      this.addNPCs()
      this.addParallaxBackgroundToLevel()
    }
    
    addPlatforms() {
      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
    }
}
