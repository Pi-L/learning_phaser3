import Scene from './Scene';

export default class SceneOver extends Scene {
    constructor() {
        super({ key: 'gameOver' });

    }

    create() {

        const gameOverMessage = this.add.text(this.canvas.width / 2, this.canvas.height / 2, " GAME OVER ! ", { color: '#ff2222', align: 'center' });
        gameOverMessage.setFontSize(50);
        gameOverMessage.setFontFamily("Pangolin, cursive");
        gameOverMessage.setBackgroundColor('#2e2e2e')
        gameOverMessage.x = this.canvas.width / 2 - gameOverMessage.width / 2;
    }

    update() {

    }
}
