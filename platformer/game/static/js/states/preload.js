/* Javascript / phaser.js

Implements preload.js for a phaser game with assets in this folder structure:
/assets
    /images
    /sounds

and these game objects:

## Game objects

### Player

### Enemy

### Platform

### Collectable
*/

// Preload assets
function preload() {
    // Load images
    game.load.image('player', 'assets/images/player.png');
    game.load.image('enemy', 'assets/images/enemy.png');
    game.load.image('platform', 'assets/images/platform.png');
    game.load.image('collectable', 'assets/images/collectable.png');

    // Load sounds
    game.load.audio('jump', 'assets/sounds/jump.wav');
    game.load.audio('collect', 'assets/sounds/collect.wav');
}