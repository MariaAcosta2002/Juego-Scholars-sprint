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
        this.Player = this.myScene.physics.add.sprite(50, 50, 'player');
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setCollideWorldBounds(true);

        // Set initial direction and speed
        this.movingRight = true;
        this.speed = 160;

        // Add a timer for jumping
        this.jumpTimer = this.myScene.time.addEvent({
            delay: 2000, // Time in milliseconds between jumps
            callback: this.jump,
            callbackScope: this,
            loop: true
        });

        // Add bombs group
        this.bombs = this.myScene.physics.add.group();

        // Setup bomb collision
        this.myScene.physics.add.collider(this.bombs, this.myScene.physics.world.bounds);
        
        // Add a timer for throwing bombs
        this.throwTimer = this.myScene.time.addEvent({
            delay: 1000, // Time in milliseconds between throws
            callback: this.throwBomb,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // Automatic horizontal movement
        if (this.movingRight) {
            this.Player.setVelocityX(this.speed);
            this.Player.flipX = false;
        } else {
            this.Player.setVelocityX(-this.speed);
            this.Player.flipX = true;
        }

        // Change direction if player reaches screen edge or avoids bomb
        if (this.Player.body.blocked.right) {
            this.movingRight = false;
        } else if (this.Player.body.blocked.left) {
            this.movingRight = true;
        }

        // Avoid bombs
        this.bombs.children.iterate((bomb) => {
            if (Phaser.Math.Distance.Between(this.Player.x, this.Player.y, bomb.x, bomb.y) < 50) {
                if (this.movingRight) {
                    this.Player.setVelocityX(-this.speed);
                    this.movingRight = false;
                } else {
                    this.Player.setVelocityX(this.speed);
                    this.movingRight = true;
                }
            }
        });
    }

    jump() {
        if (this.Player.body.blocked.down) {
            this.Player.setVelocityY(-400);
        }
    }

    throwBomb() {
        const bomb = this.bombs.create(this.Player.x, this.Player.y, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), -200);

        // Destroy bomb after 3 seconds
        this.myScene.time.addEvent({
            delay: 3000,
            callback: () => {
                bomb.destroy();
            },
            callbackScope: this
        });
    }
}