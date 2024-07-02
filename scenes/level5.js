export class level5 extends Phaser.Scene{
    constructor(){
        super({key: 'level5'})
    }

    preload(){
        this.load.image('ITM', 'assets/img/ITM.jpg')
        this.load.image('btnNext', 'assets/img/next.png')
        this.load.image('btnRestart', 'assets/img/reinicia.png'); // Agregamos la imagen para reiniciar
        this.load.image('btnMenu', 'assets/img/regresar.png');
        this.load.image('btnPause', 'assets/img/pausar.png'); // Imagen para el botón de pausar
        this.load.image('btnResume', 'assets/img/renudar.png');
        this.load.image('paused', 'assets/img/paused.png');
    }
    create(){
        const { innerWidth: width, innerHeight: height } = window;
        this.background = this.add.image(width / 2, height / 2, 'ITM').setOrigin(0.5);
        this.background.setDisplaySize(width, height);
        this.boton = this.add.image(200,40, 'btnNext').setInteractive()
        this.boton.on('pointerdown', ()=>{
            this.scene.start('level6')
        })
        this.botonRestart = this.add.image(120, 40, 'btnRestart').setInteractive();
        this.botonRestart.on('pointerdown', () => {
            this.scene.restart();
        });

        let botonMenu = this.add.image(40, 40, 'btnMenu').setInteractive();
        botonMenu.on('pointerdown', () => {
            this.scene.start('niveles');
        });

        this.botonPauseResume = this.add.image(280, 40, 'btnPause').setInteractive();
        this.botonPauseResume.on('pointerdown', () => {
            this.togglePause();
        });

        // Imagen de pausa
        this.pausedImage = this.add.image(width / 2, height / 2, 'paused').setOrigin(0.5);
        this.pausedImage.setVisible(false); // Ocultar inicialmente
    } 
    update(time, delta) {
        if (this.isPaused) {
            return; // Si está pausado, no hacemos nada
        }

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
