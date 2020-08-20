import Scene from './Scene';

export default class SceneOver extends Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    init(data) {
        this.score = data.score;
    }

    create() {

        this.addBackground();

        const gameOverMessage = this.add.text(this.canvas.width / 2, this.canvas.height / 2 - 100, "GAME OVER", { color: '#ff2222', align: 'center', fontFamily: 'Pangolin, cursive', fontSize: 70 });
        gameOverMessage.setPadding(40, 30);
        gameOverMessage.set
        gameOverMessage.x = this.canvas.width / 2 - gameOverMessage.width / 2;
        gameOverMessage.setBackgroundColor('#2e2e2e99')

        const scoreMessage = this.add.bitmapText(this.canvas.width / 2, this.canvas.height / 2 + 100, 'pixelFont', `SCORE : ${this.score}`, 60);
        scoreMessage.x = this.canvas.width / 2 - scoreMessage.width / 2;
    }

    update() {

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
