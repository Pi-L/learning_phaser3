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

        this.background = this.add.image(0, 0, 'bg');
        this.background.displayHeight = this.canvas.height;
        const scaleX = this.canvas.width / this.background.width;
        this.background.setScale(scaleX, 1).setScrollFactor(0);
        this.background.depth = -1;
        this.background.setOrigin(0, 0);

        // Add multiple bombs
        const maxObjects = 50;
        for (let i = 0; i < maxObjects; i++) {
            const bomb = this.physics.add.sprite(16, 16, "bomb");
            this.bombs.add(bomb);
            bomb.setRandomPosition(0, 0, this.canvas.width - 3, this.canvas.height - 3);

            // set random animation
            if (Math.random() > 0.5) {
                bomb.play("red");
            } else {
                bomb.play("gray");
            }

            bomb.setVelocity(100, 100);
            bomb.setCollideWorldBounds(true);
            bomb.setBounce(1);
        }

        // this.input.on('gameobjectdown', this.explode, this);


    }

    update() {
        super.update();
        // console.log('this.cursorKeys', this.cursorKeys.space.isDown);
        // this.bombs.active = false;

        // this.input.on('gameobjectdown', this.explode, this);
        this.bombs.children.entries.map(entry => {
            entry.setVelocity(Math.random() * 200 - 100, Math.random() * 200 - 100);
        });
    }


}
