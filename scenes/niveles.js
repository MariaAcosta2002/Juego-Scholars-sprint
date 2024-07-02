export class niveles extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles' });
    }

    preload() {
        this.load.image('niveles', 'assets/img/print.jpg');
        this.load.image('btnNivel1', 'assets/img/nivel1.png');
        this.load.image('btnNivel2', 'assets/img/nivel2.png');
        this.load.image('btnNivel3', 'assets/img/nivel3.png');
        this.load.image('btnNivel4', 'assets/img/nivel4.png');
        this.load.image('btnNivel5', 'assets/img/nivel5.png');
        this.load.image('btnNivel6', 'assets/img/nivel6.png');
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.audio('backgroundMusic', 'assets/audio/menu.mp3')
    }

    create() {
        const { innerWidth: width, innerHeight: height } = window;

        this.background = this.add.image(width / 2, height / 2, 'niveles').setOrigin(0.5);
        this.background.setDisplaySize(width, height);

        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.play();
        this.backgroundMusic.on('complete', () => {
            this.backgroundMusic.play();
        });

        // Detener el sonido al salir de la escena
        this.events.on('shutdown', () => {
            if (this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }
        });



        const niveles = [
            { key: 'btnNivel1', scene: 'level1' },
            { key: 'btnNivel2', scene: 'level2' },
            { key: 'btnNivel3', scene: 'level3' },
            { key: 'btnNivel4', scene: 'level4' },
            { key: 'btnNivel5', scene: 'level5' },
            { key: 'btnNivel6', scene: 'level6' }
        ];

        const buttonWidth = 100;  // Assuming the button width is 100 pixels
        const buttonHeight = 100; // Assuming the button height is 100 pixels
        const padding = 50;       // Padding between buttons

        // Calculate the start position to center the grid
        const startX = this.cameras.main.width / 2 - (buttonWidth + padding) * (3 / 2 - 0.5);
        const startY = this.cameras.main.height / 2 - (buttonHeight + padding) * (2 / 2 - 0.5);

        // Position the buttons in a grid
        for (let i = 0; i < niveles.length; i++) {
            let x = startX + (i % 3) * (buttonWidth + padding);
            let y = startY + Math.floor(i / 3) * (buttonHeight + padding);

            let boton = this.add.image(x, y, niveles[i].key).setInteractive();
            boton.on('pointerdown', () => {
                this.scene.start(niveles[i].scene);
            });
        }

        // Add the main menu button
        let botonMenu = this.add.image(40, 40, 'btnMenu').setInteractive();
        botonMenu.on('pointerdown', () => {
            this.scene.start('start');
        });
    }
}
