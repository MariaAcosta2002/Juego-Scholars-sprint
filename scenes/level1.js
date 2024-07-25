import { Player } from "./player.js";
import { plataformas } from "./plataformas.js";
import { Items } from "./items.js";
import { Player2 } from "./Player2.js";

export class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
        this.isPaused = false;
        this.plataformas = new plataformas(this);
        this.items = new Items(this);
        this.player = new Player(this);
        this.Player2 = new Player2(this);
    }

    preload() {
        this.load.image('Computo', 'assets/img/Laboratoriocomputo.jpg');
        this.load.image('btnNext', 'assets/img/next.png');
        this.load.image('btnRestart', 'assets/img/reinicia.png');
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.image('btnPause', 'assets/img/pausar.png');
        this.load.image('btnResume', 'assets/img/renudar.png');
        this.load.image('paused', 'assets/img/paused.png');
        this.plataformas.preload();
        this.player.preload();
        this.Player2.preload();
    }

    create() {
        this.score = 0; // Reiniciar el puntaje al iniciar la escena

        const { width, height } = this.sys.game.config;

        this.background = this.add.image(width / 2, height / 2, 'Computo').setOrigin(0.5);
        this.background.displayWidth = width;
        this.background.displayHeight = height;

        this.botonNext = this.add.image(200, 40, 'btnNext').setInteractive();
        this.botonNext.on('pointerdown', () => {
            this.scene.start('level2');
        });

        this.botonRestart = this.add.image(120, 40, 'btnRestart').setInteractive();
        this.botonRestart.on('pointerdown', () => {
            this.scene.restart();
        });

        this.botonMenu = this.add.image(40, 40, 'btnMenu').setInteractive();
        this.botonMenu.on('pointerdown', () => {
            this.scene.start('niveles');
        });

        this.botonPauseResume = this.add.image(280, 40, 'btnPause').setInteractive();
        this.botonPauseResume.on('pointerdown', () => {
            this.togglePause();
        });

        this.pausedImage = this.add.image(width / 2, height / 2, 'paused').setOrigin(0.5);
        this.pausedImage.setVisible(false);

        // Ajustar posición del texto del puntaje
        this.scoreText = this.add.text(width - 120, 16, `Puntaje: ${this.score}`, { fontSize: '32px', fill: '#000000' }).setOrigin(1, 0);

        this.plataformas.create();
        this.player.create();
        this.Player2.create();

        // Colisiones y overlaps
        this.physics.add.collider(this.player.Player, this.plataformas.layer1);
        this.physics.add.collider(this.Player2.Player, this.plataformas.layer1); // Agregar colisión para Player2 con las plataformas
        this.physics.add.overlap(this.player.Player, this.plataformas.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player.Player, this.plataformas.coinsF, this.collectSpecialCoin, null, this);
        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;

        this.background.displayWidth = width;
        this.background.displayHeight = height;
        this.background.setPosition(width / 2, height / 2);

        // Ajustar posiciones de los botones
        this.botonNext.setPosition(200, 40);
        this.botonRestart.setPosition(120, 40);
        this.botonMenu.setPosition(40, 40);
        this.botonPauseResume.setPosition(280, 40);

        // Ajustar posición del texto del puntaje
        this.scoreText.setPosition(width - 120, 16);

        // Ajustar posición de la imagen de pausa
        this.pausedImage.setPosition(width / 2, height / 2);
    }

    update(time, delta) {
        if (this.isPaused) {
            return;
        }

        this.player.update();
        this.Player2.update();
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.botonPauseResume.setTexture('btnResume');
            this.pausedImage.setVisible(true);
            // Congelar al jugador
            this.player.Player.body.velocity.x = 0;
            this.player.Player.body.velocity.y = 0;
            this.player.Player.setAcceleration(0);
            this.player.Player.setVelocity(0);

            // Congelar al Player2
            this.Player2.Player.body.velocity.x = 0;
            this.Player2.Player.body.velocity.y = 0;
            this.Player2.Player.setAcceleration(0);
            this.Player2.Player.setVelocity(0);
        } else {
            this.botonPauseResume.setTexture('btnPause');
            this.pausedImage.setVisible(false);
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.items.recolectaMonedas(coin); // Llama a la función en Items para aumentar el puntaje
        this.updateScore(250); // Sumar 250 al puntaje por cada moneda recolectada
    }

    collectSpecialCoin(player, coinF) {
        coinF.disableBody(true, true);
        this.items.recolectaMonedaF(coinF); // Llama a la función en Items para manejar la moneda especial
        // No es necesario sumar al puntaje aquí porque es una moneda especial

        // Lógica para cambiar a la siguiente escena si se cumplen ciertas condiciones
        if (this.items.checkSpecialCoinsCollected()) {
            // Si se han recolectado todas las monedas especiales necesarias
            this.scene.start('level2'); // Cambiar 'siguienteNivel' por el nombre de tu escena siguiente
        }
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Puntaje: ${this.score}`);
    }
}
