export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('gameOver', 'assets/img/gameover.png');
        this.load.image('btnRestart', 'assets/img/reinicia.png');
        this.load.image('btnMenu', 'assets/img/regresar.png');
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.add.image(width / 2, height / 2, 'gameOver').setOrigin(0.5);

        this.botonRestart = this.add.image(width / 2, height / 2 + 100, 'btnRestart').setInteractive();
        this.botonRestart.on('pointerdown', () => {
            this.scene.start('level1');
        });

        this.botonMenu = this.add.image(width / 2, height / 2 + 180, 'btnMenu').setInteractive();
        this.botonMenu.on('pointerdown', () => {
            this.scene.start('niveles');
        });

        this.add.text(width / 2, height / 2 - 200, 'Game Over', { fontSize: '64px', fill: '#FFF' }).setOrigin(0.5);
    }
}
