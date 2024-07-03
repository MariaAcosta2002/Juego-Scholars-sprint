export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('gameOver', 'assets/img/gameover.jpg');
        this.load.image('btnRestart', 'assets/img/reinicia.png');
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.image('btnInicio', 'assets/img/equis.png');
    }

    create() {
        const { width, height } = this.sys.game.config;

        const gameOverImage = this.add.image(width / 2, height / 2, 'gameOver').setOrigin(0.5);
        gameOverImage.displayWidth = width;
        gameOverImage.displayHeight = height;

        const buttonY = height / 2 + 200;
        const buttonSpacing = 150;
        const buttonStartX = width / 2 - buttonSpacing;

        let botonRestart = this.add.image(buttonStartX, buttonY, 'btnRestart').setInteractive();
        botonRestart.on('pointerdown', () => {
            this.scene.start('level2');
        });

        let botonMenu = this.add.image(width / 2, buttonY, 'btnMenu').setInteractive();
        botonMenu.on('pointerdown', () => {
            this.scene.start('niveles');
        });

        let botonInicio = this.add.image(width / 2 + buttonSpacing, buttonY, 'btnInicio').setInteractive();
        botonInicio.on('pointerdown', () => {
            this.scene.start('start');
        });
    }
}
