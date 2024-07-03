export class Player{
    constructor(scene){
        this.myScene = scene
    }
    
    preload(){
        this.myScene.load.image('playerRunF1','../assets/img/Malo1/Malvado1.png')
        this.myScene.load.image('playerRunF2','../assets/img/Malo1/Malvado3.png')
        this.myScene.load.image('playerRunF3','../assets/img/Malo1/Malvado6.png')
    
        this.myScene.load.image('playerIdleF1','../assets/img/MalO1/Malvado2.png')
        
        this.myScene.load.image('playerJumpF1','../assets/img/Malo1/Malvado5.png')
        this.myScene.load.image('playerJumpF2','../assets/img/Malo1/Malvado7.png')

    
    }

    create(){
        //Player-------------------------------------------------------------

        //run
        this.myScene.anims.create({
            key:'Run',
            frames: [
                {key: 'playerRunF1'},
                {key: 'playerRunF2'},
                {key: 'playerRunF3'}
            ],
            frameRate: 10,
            repeat: -1
        })
        //Idle
        this.myScene.anims.create({
            key:'Idle',
            frames: [
                {key: 'playerIdleF1'}
            ],
            frameRate: 10,
            repeat: -1
        })
        //Jump
        this.myScene.anims.create({
            key:'Jump',
            frames: [
                {key: 'playerJumpF1'},
                {key: 'playerJumpF2'}
            ],
            frameRate: 10,
            repeat: 1
        })
        //Fall

        //Physics-------------------------------------------------
        this.Player = this.myScene.physics.add.sprite(50,50, 'playerRunF1')
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setCollideWorldBounds(true);
        //Controles-----------------------------------------------
        
        this.keyD = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyA = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyW = this.myScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    }
    
    
    update(){
        
        if(this.keyD.isDown){
            this.Player.play('Run', true)
            this.Player.setVelocityX(160)
            this.Player.flipX = false
        }else if(this.keyA.isDown){
            this.Player.play('Run', true)
            this.Player.setVelocityX(-160)
            this.Player.flipX = true;
        }else{
            this.Player.setVelocityX(0)
            this.Player.play('Idle', true)
            this.Player.flipX = false
        }

        if(this.keyW.isDown && this.Player.body.blocked.down ){//cambiamos touching por blocked
            this.Player.setVelocityY(-400);
            this.Player.play('Jump', true)
        }
        
    }
}