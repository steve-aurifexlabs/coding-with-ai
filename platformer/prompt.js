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