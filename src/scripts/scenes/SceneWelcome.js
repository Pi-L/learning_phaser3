import Scene from './Scene';
import { pilConfig } from '../config';

export default class SceneWelcome extends Scene {
    constructor() {
        super({ key: 'bootGame' });
    }

    // init() {
    // }

    preload() {
        this.load.image('bg', 'assets/images/space.jpeg');

        this.load.spritesheet('explode', 'assets/spritesheets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("bomb", "assets/spritesheets/bomb.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.atlas('player_idle', 'assets/spritesheets/player/player_idle.png', 'assets/spritesheets/player/player_idle_atlas.json');
        this.load.atlas('player_run', 'assets/spritesheets/player/player_run.png', 'assets/spritesheets/player/player_run_atlas.json');
        this.load.atlas('player_attack', 'assets/spritesheets/player/player_attack.png', 'assets/spritesheets/player/player_attack_atlas.json');
        this.load.atlas('player_die', 'assets/spritesheets/player/player_die.png', 'assets/spritesheets/player/player_die_atlas.json');

        this.load.atlas('fireball', 'assets/spritesheets/fireball.png', 'assets/spritesheets/fireball_atlas.json');
        this.load.animation('fireball', 'assets/spritesheets/fireball_anim.json');
        this.load.animation('player_idle', 'assets/spritesheets/player/player_idle_anim.json');
        this.load.animation('player_run', 'assets/spritesheets/player/player_run_anim.json');
        this.load.animation('player_attack', 'assets/spritesheets/player/player_attack_anim.json');
        this.load.animation('player_die', 'assets/spritesheets/player/player_die_anim.json');

        this.load.bitmapFont('pixelFont', 'assets/fonts/font.png', 'assets/fonts/font.xml');

    }

    create() {
        this.createAnims();

        const WelcomeMessage = this.add.text(this.canvas.width / 2, this.canvas.height / 6, " Welcome ! ", { color: '#2f2f2f', align: 'center', fontFamily: 'Pangolin, cursive', fontSize: 50 });
        const willStartMessage = this.add.text(this.canvas.width / 2, this.canvas.height / 3, " The Game Will Start in ", { color: '#aa0000', align: 'center', fontFamily: 'Pangolin, cursive', fontSize: 35 });
        const countDownMessage = this.add.text(this.canvas.width / 2, this.canvas.height / 2, "  ", { color: '#aa0000', align: 'center', fontFamily: 'Pangolin, cursive', fontSize: 41 });

        WelcomeMessage.x = this.canvas.width / 2 - WelcomeMessage.width / 2;
        willStartMessage.x = this.canvas.width / 2 - willStartMessage.width / 2;
        countDownMessage.x = this.canvas.width / 2 - countDownMessage.width / 2;

        for (let i = 3; i >= 1; i--) {
            setTimeout(() => { countDownMessage.text = ` ${i} ` }, (4 - i) * 1000);
        }
        setTimeout(() => {
            countDownMessage.text = ' START! ';
            countDownMessage.x = this.canvas.width / 2 - countDownMessage.width / 2;
        }, 3600);

        setTimeout(() => { this.scene.start("playGame") }, 4000);
    }

    // update() {
    // }

    createAnims = () => {
        this.anims.create({
            key: 'explodeAnim',
            frames: this.anims.generateFrameNumbers('explode'),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true,
        });

        // POWER UPS
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("bomb", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("bomb", {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });

    }

}
