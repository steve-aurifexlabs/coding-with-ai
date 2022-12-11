import { Level, Platform, Enemy, NPC } from 'game.js'

export class Level1 extends Level {
    constructor() {
        super(1)
    }
    
    addPlatforms() {
        this.platforms.push(new Platform(0, 0, 100, 100))
        this.platforms.push(new Platform(100, 0, 100, 100))
        this.platforms.push(new Platform(200, 0, 100, 100))
        this.platforms.push(new Platform(300, 0, 100, 100))
        this.platforms.push(new Platform(400, 0, 100, 100))
        this.platforms.push(new Platform(500, 0, 100, 100))
        this.platforms.push(new Platform(600, 0, 100, 100))
        this.platforms.push(new Platform(700, 0, 100, 100))
        this.platforms.push(new Platform(800, 0, 100, 100))
        this.platforms.push(new Platform(900, 0, 100, 100))
        this.platforms.push(new Platform(1000, 0, 100, 100))
        this.platforms.push(new Platform(1100, 0, 100, 100))
    }
    
    addEnemies() {
        this.enemies.push(new Enemy(100, 0, 100, 100))
        this.enemies.push(new Enemy(200, 0, 100, 100))
        this.enemies.push(new Enemy(300, 0, 100, 100))
        this.enemies.push(new Enemy(400, 0, 100, 100))
        this.enemies.push(new Enemy(500, 0, 100, 100))
        this.enemies.push(new Enemy(600, 0, 100, 100))
        this.enemies.push(new Enemy(700, 0, 100, 100))
        this.enemies.push(new Enemy(800, 0, 100, 100))
        this.enemies.push(new Enemy(900, 0, 100, 100))
        this.enemies.push(new Enemy(1000, 0, 100, 100))
        this.enemies.push(new Enemy(1100, 0, 100, 100))
    }
    
    addNPCs() {
        this.npcs.push(new NPC(100, 0, 100, 100))
        this.npcs.push(new NPC(200, 0, 100, 100))
        this.npcs.push(new NPC(300, 0, 100, 100))
        this.npcs.push(new NPC(400, 0, 100, 100))
    }
}