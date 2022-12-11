/* Javascript / phaser.js

Implements menu.js state for a phaser game that has a start and setting buttons and a settings page with input selection

## Menu

### Start

### Settings

#### Input

#### Multiplayer

*/

var Menu = function(game) {
	this.game = game;
};

Menu.prototype = {
	preload: function() {
		this.game.load.image('start', 'assets/start.png');
		this.game.load.image('settings', 'assets/settings.png');
		this.game.load.image('back', 'assets/back.png');
		this.game.load.image('input', 'assets/input.png');
		this.game.load.image('multiplayer', 'assets/multiplayer.png');
		this.game.load.image('keyboard', 'assets/keyboard.png');
		this.game.load.image('gamepad', 'assets/gamepad.png');
		this.game.load.image('mouse', 'assets/mouse.png');
		this.game.load.image('touch', 'assets/touch.png');
		this.game.load.image('off', 'assets/off.png');
		this.game.load.image('on', 'assets/on.png');
	},
	create: function() {
		this.game.stage.backgroundColor = '#000000';
		this.start = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'start', this.startGame, this);
		this.settings = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'settings', this.settingsPage, this);
	},
	startGame: function() {
		this.game.state.start('Game');
	},
	settingsPage: function() {
		this.start.destroy();
		this.settings.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToMenu, this);
		this.input = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'input', this.inputPage, this);
		this.multiplayer = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'multiplayer', this.multiplayerPage, this);
	},
	backToMenu: function() {
		this.back.destroy();
		this.input.destroy();
		this.multiplayer.destroy();
		this.start = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'start', this.startGame, this);
		this.settings = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'settings', this.settingsPage, this);
	},
	inputPage: function() {
		this.back.destroy();
		this.input.destroy();
		this.multiplayer.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToSettings, this);
		this.keyboard = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'keyboard', this.keyboardInput, this);
		this.gamepad = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'gamepad', this.gamepadInput, this);
		this.mouse = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 200, 'mouse', this.mouseInput, this);
		this.touch = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 300, 'touch', this.touchInput, this);
	},
	backToSettings: function() {
		this.back.destroy();
		this.keyboard.destroy();
		this.gamepad.destroy();
		this.mouse.destroy();
		this.touch.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToMenu, this);
		this.input = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'input', this.inputPage, this);
		this.multiplayer = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'multiplayer', this.multiplayerPage, this);
	},
	keyboardInput: function() {
		this.keyboard.destroy();
		this.gamepad.destroy();
		this.mouse.destroy();
		this.touch.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToInput, this);
		this.keyboard = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'keyboard', this.keyboardInput, this);
		this.gamepad = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'gamepad', this.gamepadInput, this);
		this.mouse = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 200, 'mouse', this.mouseInput, this);
		this.touch = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 300, 'touch', this.touchInput, this);
	},
	gamepadInput: function() {
		this.keyboard.destroy();
		this.gamepad.destroy();
		this.mouse.destroy();
		this.touch.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToInput, this);
		this.keyboard = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'keyboard', this.keyboardInput, this);
		this.gamepad = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'gamepad', this.gamepadInput, this);
		this.mouse = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 200, 'mouse', this.mouseInput, this);
		this.touch = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 300, 'touch', this.touchInput, this);
	},
	mouseInput: function() {
		this.keyboard.destroy();
		this.gamepad.destroy();
		this.mouse.destroy();
		this.touch.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToInput, this);
		this.keyboard = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'keyboard', this.keyboardInput, this);
		this.gamepad = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'gamepad', this.gamepadInput, this);
		this.mouse = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 200, 'mouse', this.mouseInput, this);
		this.touch = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 300, 'touch', this.touchInput, this);
	},
	touchInput: function() {
		this.keyboard.destroy();
		this.gamepad.destroy();
		this.mouse.destroy();
		this.touch.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToInput, this);
		this.keyboard = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'keyboard', this.keyboardInput, this);
		this.gamepad = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'gamepad', this.gamepadInput, this);
		this.mouse = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 200, 'mouse', this.mouseInput, this);
		this.touch = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 300, 'touch', this.touchInput, this);
	},
	multiplayerPage: function() {
		this.back.destroy();
		this.input.destroy();
		this.multiplayer.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToSettings, this);
		this.off = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'off', this.offMultiplayer, this);
		this.on = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'on', this.onMultiplayer, this);
	},
	offMultiplayer: function() {
		this.off.destroy();
		this.on.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToMultiplayer, this);
		this.off = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'off', this.offMultiplayer, this);
		this.on = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'on', this.onMultiplayer, this);
	},
	onMultiplayer: function() {
		this.off.destroy();
		this.on.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToMultiplayer, this);
		this.off = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'off', this.offMultiplayer, this);
		this.on = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'on', this.onMultiplayer, this);
	},
	backToMultiplayer: function() {
		this.back.destroy();
		this.off.destroy();
		this.on.destroy();
		this.back = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 100, 'back', this.backToSettings, this);
		this.input = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'input', this.inputPage, this);
		this.multiplayer = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY + 100, 'multiplayer', this.multiplayerPage, this);
	}
};