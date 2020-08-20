import { GameObjects } from 'phaser';
import { getSizes } from '../config';

export default class Explosion extends GameObjects.Sprite {
    constructor(scene, x, y, scale = 2) {
        super(scene, x, y, 'explosion');

        this.setScale(scale);
        scene.add.existing(this);
        this.play('explodeAnim');
    }

    update() {
        // if (this.x < 0 || this.x > getSizes().width)
        //     this.destroy();
    }

}
