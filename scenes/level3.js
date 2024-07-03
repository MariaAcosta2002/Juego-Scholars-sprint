import { Player2 } from "./Player2.js";

export class level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });

        this.player2 = new Player2(this);
    }

    preload() {
        this.load.image('LNI', 'assets/img/LNI.jpg');
        this.load.image('btnNext', 'assets/img/next.png');
        this.load.image('btnRestart', 'assets/img/reinicia.png'); // Imagen para reiniciar
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.image('btnPause', 'assets/img/pausar.png'); // Imagen para el botón de pausar
        this.load.image('btnResume', 'assets/img/renudar.png'); // Imagen para el botón de reanudar
        this.load.image('paused', 'assets/img/paused.png'); // Imagen para indicar que está pausado

        this.player2.preload();
    }

    create() {
        const { innerWidth: width, innerHeight: height } = window;
        this.background = this.add.image(width / 2, height / 2, 'LNI').setOrigin(0.5);
        this.background.setDisplaySize(width, height);

        // Botón de siguiente nivel
        this.boton = this.add.image(200, 40, 'btnNext').setInteractive();
        this.boton.on('pointerdown', () => {
            this.scene.start('level4');
        });

        // Botón de reiniciar
        this.botonRestart = this.add.image(120, 40, 'btnRestart').setInteractive();
        this.botonRestart.on('pointerdown', () => {
            this.scene.restart();
        });

        // Botón de menú
        let botonMenu = this.add.image(40, 40, 'btnMenu').setInteractive();
        botonMenu.on('pointerdown', () => {
            this.scene.start('niveles');
        });

        // Botón de pausar/reanudar
        this.botonPauseResume = this.add.image(280, 40, 'btnPause').setInteractive();
        this.botonPauseResume.on('pointerdown', () => {
            this.togglePause();
        });

        // Imagen de pausa
        this.pausedImage = this.add.image(width / 2, height / 2, 'paused').setOrigin(0.5);
        this.pausedImage.setVisible(false); // Ocultar inicialmente

        this.player2.create();
    }

    update(time, delta) {
        if (this.isPaused) {
            return; // Si está pausado, no hacemos nada
        }

        this.player2.update();

        // Lógica del juego que solo se ejecuta cuando no está pausado
        // Por ejemplo, actualización de sprites, física, etc.
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.botonPauseResume.setTexture('btnResume');
            this.pausedImage.setVisible(true);
        } else {
            this.botonPauseResume.setTexture('btnPause');
            this.pausedImage.setVisible(false);
        }
    }
}
