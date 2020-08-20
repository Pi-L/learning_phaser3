import Scene from './Scene';

export default class Scene1 extends Scene {
    constructor() {
        super({ key: 'playGame' });

    }

    // init() {
    // }

    // preload() {

    // }

    create() {
        super.create();

        this.addBackground();

        // Add multiple bombs
        const maxObjects = 20;
        const boxHalfSize = 50;
        const startBoxL = this.canvas.width / 2 - boxHalfSize;
        const startBoxR = this.canvas.width / 2 + boxHalfSize;
        const startBoxT = this.canvas.height / 2 - boxHalfSize;
        const startBoxB = this.canvas.height / 2 + boxHalfSize;

        for (let i = 0; i < maxObjects; i++) {
            const bomb = this.physics.add.sprite(16, 16, "bomb");
            this.bombs.add(bomb);
            bomb.setRandomPosition(0, 0, this.canvas.width - 3, this.canvas.height - 3);

            const isPile = Math.random() > 0.5;
            const isInBox = bomb.x > startBoxL && bomb.x < startBoxR && bomb.y > startBoxT && bomb.y < startBoxB;

            if (isInBox && isPile)
                bomb.setRandomPosition(0, 0, startBoxL - 3, this.canvas.height - 3);
            else if (isInBox && !isPile)
                bomb.setRandomPosition(startBoxR + 3, 0, this.canvas.width - 3, this.canvas.height - 3);
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
            entry.setVelocity(Math.random() * 300 - 100, Math.random() * 300 - 100);
        });

    }

    update() {
        super.update();

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
}
