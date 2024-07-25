export class Player2 {
    constructor(scene) {
        this.myScene = scene;
    }

    preload() {
        this.myScene.load.image('player', 'assets/img/Malo/Malo3.png');
        this.myScene.load.image('bomb', 'assets/img/bomb.png');
    }

    create() {
        // Player physics
        this.Player = this.myScene.physics.add.sprite(100, 100, 'player'); // Ajusta la posición inicial
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setCollideWorldBounds(true);

        // Set initial direction and speed
        this.speed = 160;
        this.bombThrowDelay = 2000; // Delay for throwing bombs
        this.lastBombTime = 0;

        // Add bombs group
        this.bombs = this.myScene.physics.add.group();
        
        // Ensure Player2 collides with platforms
        this.myScene.physics.add.collider(this.Player, this.myScene.plataformas.layer1);

        // Set up collision between bombs and Player1
        this.myScene.physics.add.collider(this.bombs, this.myScene.player.Player, this.hitPlayer1, null, this);
    }

    update(time) {
        const player1 = this.myScene.player.Player;
        const distanceToPlayer1 = Phaser.Math.Distance.Between(this.Player.x, this.Player.y, player1.x, player1.y);

        // Move towards Player1
        if (distanceToPlayer1 > 50) { // Adjust distance threshold as needed
            if (this.Player.x < player1.x) {
                this.Player.setVelocityX(this.speed);
                this.Player.flipX = false;
            } else {
                this.Player.setVelocityX(-this.speed);
                this.Player.flipX = true;
            }
        } else {
            this.Player.setVelocityX(0);
        }

        // Check if Player2 is stuck and jump if necessary
        if (this.Player.body.blocked.down && !this.Player.body.touching.down) {
            this.Player.setVelocityY(-300); // Adjust jump force as needed
        }

        // Throw bombs at Player1
        if (time - this.lastBombTime > this.bombThrowDelay) {
            this.throwBomb();
            this.lastBombTime = time;
        }
    }

    throwBomb() {
        const player1 = this.myScene.player.Player;
        const bomb = this.bombs.create(this.Player.x, this.Player.y, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        
        // Calculate velocity towards Player1
        const angle = Phaser.Math.Angle.Between(this.Player.x, this.Player.y, player1.x, player1.y);
        const speed = 200; // Adjust bomb speed as needed
        bomb.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
        
        // Destroy bomb after 3 seconds
        this.myScene.time.addEvent({
            delay: 3000,
            callback: () => {
                bomb.destroy();
            },
            callbackScope: this
        });
    }

    hitPlayer1(player1, bomb) {
        bomb.destroy(); // Destroy the bomb on impact
        // Handle the player1 losing logic
        this.myScene.scene.start('gameover'); // Change to your game over scene
    }
}
