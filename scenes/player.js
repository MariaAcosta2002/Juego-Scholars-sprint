export class Player{
    constructor(scene){
        this.myScene = scene
    }
    
    preload(){
        this.myScene.load.image('playerRunF1','../assets/img/Player/Captain/10-Run Sword/Run Sword 01.png')
        this.myScene.load.image('playerRunF2','../assets/img/Player/Captain/10-Run Sword/Run Sword 02.png')
        this.myScene.load.image('playerRunF3','../assets/img/Player/Captain/10-Run Sword/Run Sword 03.png')
        this.myScene.load.image('playerRunF4','../assets/img/Player/Captain/10-Run Sword/Run Sword 04.png')
        this.myScene.load.image('playerRunF5','../assets/img/Player/Captain/10-Run Sword/Run Sword 05.png')
        this.myScene.load.image('playerRunF6','../assets/img/Player/Captain/10-Run Sword/Run Sword 06.png')
    
        this.myScene.load.image('playerIdleF1','../assets/img/Player/Captain/09-Idle Sword/Idle Sword 01.png')
        this.myScene.load.image('playerIdleF2','../assets/img/Player/Captain/09-Idle Sword/Idle Sword 02.png')
        this.myScene.load.image('playerIdleF3','../assets/img/Player/Captain/09-Idle Sword/Idle Sword 03.png')
        this.myScene.load.image('playerIdleF4','../assets/img/Player/Captain/09-Idle Sword/Idle Sword 04.png')
        this.myScene.load.image('playerIdleF5','../assets/img/Player/Captain/09-Idle Sword/Idle Sword 05.png')
        
        this.myScene.load.image('playerJumpF1','../assets/img/Player/Captain/11-Jump Sword/Jump Sword 01.png')
        this.myScene.load.image('playerJumpF2','../assets/img/Player/Captain/11-Jump Sword/Jump Sword 02.png')
        this.myScene.load.image('playerJumpF3','../assets/img/Player/Captain/11-Jump Sword/Jump Sword 03.png')
        
        this.myScene.load.image('playerFallF1','../assets/img/Player/Captain/12-Fall Sword/Fall Sword 01.png')
    
    }

    create(){
        //Player---------------------------------------------------------

        //run
        this.myScene.anims.create({
            key:'Run',
            frames: [
                {key: 'playerRunF1'},
                {key: 'playerRunF2'},
                {key: 'playerRunF3'},
                {key: 'playerRunF4'},
                {key: 'playerRunF5'},
                {key: 'playerRunF6'}
            ],
            frameRate: 10,
            repeat: -1
        })
        //Idle
        this.myScene.anims.create({
            key:'Idle',
            frames: [
                {key: 'playerIdleF1'},
                {key: 'playerIdleF2'},
                {key: 'playerIdleF3'},
                {key: 'playerIdleF4'},
                {key: 'playerIdleF5'}
            ],
            frameRate: 10,
            repeat: -1
        })
        //Jump
        this.myScene.anims.create({
            key:'Jump',
            frames: [
                {key: 'playerJumpF1'},
                {key: 'playerJumpF2'},
                {key: 'playerJumpF3'}
            ],
            frameRate: 10,
            repeat: 1
        })
        //Fall
        this.myScene.anims.create({
            key:'Fall',
            frames: [
                {key: 'playerFallF1'}
            ],
            frameRate: 10,
            repeat: 1
        })

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