export class plataformas3 {
    constructor(scene) {
        this.myScene = scene;
    }

    preload() {
        // Carga de imágenes y JSON
        this.myScene.load.image('tiles', '../assets/img/tilesets/world_tileset.png');
        this.myScene.load.image('tiles2', '../assets/img/tilesets/nature-paltformer-tileset-16x16.png');
        this.myScene.load.tilemapTiledJSON('tilemapJSON', '../json/Level3.json');

        // Carga de spritesheets para las monedas Juego
        this.myScene.load.spritesheet('coin', '../assets/img/items/MonedaR.png', { frameWidth: 16, frameHeight: 16 });
        this.myScene.load.spritesheet('coinF', '../assets/img/items/MonedaD.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        // Creación de animaciones para las monedas
        this.myScene.anims.create({
            key: 'spin',
            frames: this.myScene.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.myScene.anims.create({
            key: 'spinF',
            frames: this.myScene.anims.generateFrameNumbers('coinF', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Creación del mapa y las capas
        this.map = this.myScene.make.tilemap({ key: 'tilemapJSON' });
        this.tileset = this.map.addTilesetImage('patron1', 'tiles');
        this.tileset2 = this.map.addTilesetImage('patron2', 'tiles2');

        this.layer1 = this.map.createLayer("Plataformas", this.tileset, 0, 80).setScale(1);
        this.layer2 = this.map.createLayer("Cielo", this.tileset2, 0, -100);

        // Obtenemos los objetos de las capas de monedas
        this.coinsObj = this.map.getObjectLayer("Monedas").objects;
        this.coinFObj = this.map.getObjectLayer("MonedaF").objects;

        // Creamos grupos físicos para las monedas
        this.coins = this.myScene.physics.add.group({ allowGravity: false, immovable: true });
        this.coinsF = this.myScene.physics.add.group({ allowGravity: false, immovable: true });

        // Creamos las monedas normales (MonedaR)
        this.coinsObj.forEach(element => {
            const coin = this.coins.create(element.x, element.y - element.height, 'coin');
            coin.setOrigin(0, 0);
            coin.play('spin');
        });

        // Creamos la moneda especial (MonedaF)
        this.coinFObj.forEach(element => {
            const coinF = this.coinsF.create(element.x, element.y - element.height, 'coinF');
            coinF.setOrigin(0, 0);
            coinF.play('spinF');
        });

        // Establecemos las colisiones en la capa de plataformas
        this.layer1.setCollisionByProperty({ collision: true });
    }
}
