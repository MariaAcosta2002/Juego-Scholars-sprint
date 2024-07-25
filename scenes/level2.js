import { Player } from "./player.js";
import { plataformas2 } from "./plataforma2.js";
import { Items } from "./items.js";
import { Player2 } from "./Player2.js";

export class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' }); 
        this.isPaused = false;
        this.plataformas2 = new plataformas2(this); // Cambio de nombre a minúscula para seguir convención
        this.items = new Items(this);
        this.player = new Player(this);
        this.Player2 = new Player2(this);
    }

    preload() {
        this.load.image('IBIO', 'assets/img/Laboratorioquimica.jpg');
        this.load.image('btnNext', 'assets/img/next.png');
        this.load.image('btnRestart', 'assets/img/reinicia.png');
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.image('btnPause', 'assets/img/pausar.png');
        this.load.image('btnResume', 'assets/img/renudar.png');
        this.load.image('paused', 'assets/img/paused.png');
        this.plataformas2.preload();
        this.player.preload();
        this.Player2.preload();
    }

    create() {
        this.score = 0; // Reiniciar el puntaje al iniciar la escena

        const { width, height } = this.sys.game.config;

        this.background = this.add.image(width / 2, height / 2, 'IBIO').setOrigin(0.5);
        this.background.displayWidth = width;
        this.background.displayHeight = height;

        this.botonNext = this.add.image(200, 40, 'btnNext').setInteractive();
        this.botonNext.on('pointerdown', () => {
            this.scene.start('level3');
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

        this.plataformas2.create();
        this.player.create();
        this.Player2.create();
        
        // Colisiones y overlaps
        this.physics.add.collider(this.player.Player, this.plataformas2.layer1);
        this.physics.add.overlap(this.player.Player, this.plataformas2.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player.Player, this.plataformas2.coinsF, this.collectSpecialCoin, null, this);
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
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Puntaje: ${this.score}`);
    }
}
