// Javsacript/ Bash
// Write a Javascript function that calls an inline bash script using `` that creates the following on the filesystem:

const folderStructure = `
## Folder Structure

/game
    /assets
        /images
        /sounds
    /js
        /states
            /boot.js
            /game.js
            /menu.js
            /preload.js
        /main.js
    /index.html`
 
const fs = require('fs');
const path = require('path');

function createFolderStructure() {
    const folders = ['./game', './game/assets', './game/assets/images', './game/assets/sounds', './game/js', './game/js/states'];
    const files = ['./game/js/states/boot.js', './game/js/states/game.js', './game/js/states/menu.js', './game/js/states/preload.js', './game/js/main.js', './game/index.html'];
    folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    });
    files.forEach(file => {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, '');
        }
    });
}

createFolderStructure();