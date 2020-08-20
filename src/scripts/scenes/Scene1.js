import Scene from './Scene';

export default class Scene1 extends Scene {
    constructor() {
        super({ key: 'playGame' });

        this.nbBombs = Math.ceil(this.canvas.width * this.canvas.height / 300000);
        this.bombsVelocity = Math.ceil(this.canvas.width * this.canvas.height / 15000);
    }

    boxSides = {
        left: this.canvas.width / 2 - this.boxHalfSize,
        right: this.canvas.width / 2 + this.boxHalfSize,
        top: this.canvas.height / 2 - this.boxHalfSize,
        bottom: this.canvas.height / 2 + this.boxHalfSize,
    };
    // init() {
    // }

    // preload() {

    // }

    create() {
        super.create();

        this.addBackground();

        this.addBombs(this.nbBombs, this.bombsVelocity);

    }

    update() {
        super.update();

        if (this.bombs.getLength() <= 0) {
            this.nbBombs = Math.ceil(this.nbBombs * 1.5);
            this.bombsVelocity = Math.ceil(this.bombsVelocity * 1.5);
            this.centerObject(this.player);
            this.addBombs(this.nbBombs, this.bombsVelocity);
        }


        // this.input.on('gameobjectdown', this.explode, this);
        // this.input.on('pointerdown',  (pointer) => {
        //     console.log(pointer.x, pointer.y);
        // }, this);
    }

    addBackground = () => {
        this.background = this.add.image(0, 0, 'bg');
        this.background.displayHeight = this.canvas.height;
        const scaleX = this.canvas.width / this.background.width;
        this.background.setScale(scaleX, 1).setScrollFactor(0);
        this.background.depth = -1;
        this.background.setOrigin(0, 0);

        // this.background = this.add.tileSprite(0, 0, this.canvas.width, this.canvas.height, 'bg');
        // this.background.setOrigin(0, 0);
        // this.background.setScrollFactor(0);
        // this.background.depth = -1;
    }

    addBombs = (nbBombs, velocity) => {

        for (let i = 0; i < nbBombs; i++) {
            const bomb = this.physics.add.sprite(16, 16, "bomb");
            this.bombs.add(bomb);
            bomb.setRandomPosition(0, 0, this.canvas.width - 3, this.canvas.height - 3);

            const isPile = Math.random() > 0.5;
            const isInBox = bomb.x > this.boxSides.left && bomb.x < this.boxSides.right && bomb.y > this.boxSides.top && bomb.y < this.boxSides.bottom;

            if (isInBox && isPile)
                bomb.setRandomPosition(0, 0, this.boxSides.left - 3, this.canvas.height - 3);
            else if (isInBox && !isPile)
                bomb.setRandomPosition(this.boxSides.right + 3, 0, this.canvas.width - 3, this.canvas.height - 3);

            // set random animation
            if (isPile) {
                bomb.play("red");
            } else {
                bomb.play("gray");
            }

            bomb.setCollideWorldBounds(true);
            bomb.setBounce(1);
        }

        this.bombs.children.entries.map(entry => {
            entry.setVelocity(Math.random() * velocity - velocity / 2, Math.random() * velocity - velocity / 2);
        });
    }
}
