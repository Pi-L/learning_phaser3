import { GameObjects } from 'phaser';
import { getSizes } from '../config';

export default class FireBall extends GameObjects.Sprite {
    constructor(scene) {

        const { x, y, flipX } = scene.player;

        super(scene, x, y, 'fireball');

        this.setScale(.3);
        this.flipX = flipX;

        scene.add.existing(this);
        this.play('fireball');
        scene.physics.world.enableBody(this);

        if (Object.prototype.hasOwnProperty.call(scene, 'projectiles'))
            scene.projectiles.add(this);

        this.body.velocity.x = flipX ? -200 : 200;
    }

    update() {
        if (this.x < 0 || this.x > getSizes().width)
            this.destroy();
    }

}
