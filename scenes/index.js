import { Start } from "./start.js";
import { niveles } from "./niveles.js";
import { Level1 } from "./level1.js";
import { level2 } from "./level2.js";
import { Level3 } from "./level3.js";
import { level4 } from "./level4.js";
import { level5 } from "./level5.js";
import { level6 } from "./level6.js";
import { GameOverScene } from "./gameoverscene.js";

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Start, niveles, Level1, level2, Level3, level4, level5, level6, GameOverScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
};

let game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});
