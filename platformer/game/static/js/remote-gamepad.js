
// Create a class that extend the buildin GamePad and uses fetch with the '/gameController' endpoint
class RemoteGamePad extends Gamepad {
    constructor(playerId) {
        super();
        this.playerId = playerId;
    }
    
    getState() {
        return fetch(`/gameController?playerId=${this.playerId}`)
        .then(res => res.json())
        .then(gameState => {
            this.buttons = gameState.buttons;
            this.axes = gameState.axes;
        });
    }
    }

// Create a new instance of the RemoteGamePad class
const gamePad = new RemoteGamePad(playerId);

// Add the gamepad to the browser's gamepad api as an additional gamepad
navigator.getGamepads = () => {
    const gamepads = navigator.getGamepads();
    gamepads.push(gamePad);
    return gamepads;
};