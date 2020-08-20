import { Scene as ScenePhaser, Input } from 'phaser';
import { getSizes, gameSettings } from '../config';
import FireBall from '../effects/fireball';

export default class Scene extends ScenePhaser {
    constructor({ key }) {
        super({ key });

        this.canvas = {
            width: getSizes().width,
            height: getSizes().height,
        }
    }

    playerState = {
        isRunning: false,
        isJumping: false,
        isCrouching: false,
        isDead: false,
        isAttacking: false,
        isIdle: true,
    };

    sceneState = {
        isCreated: false,
    }

    score = 0;

    //

    init() {
        this.physics.world.setBoundsCollision();
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    }

    preload() {
    }

    create() {
        this.createScore();

        this.player = this.physics.add.sprite(this.canvas.width / 2, this.canvas.height / 2, 'player_idle');
        this.player.setInteractive();
        this.physics.world.setBounds(0, gameSettings.score.board.height, this.canvas.width, this.canvas.height - gameSettings.score.board.height);
        this.player.setCollideWorldBounds(true);

        this.bombs = this.physics.add.group();
        this.projectiles = this.physics.add.group();


        this.physics.add.collider(this.projectiles, this.bombs, this.explosion);
        // this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.dying, null, this);

        this.sceneState.isCreated = true;
    }

    update() {
        this.playerController();

        this.projectiles?.getChildren().map(projectile => projectile.update());
    }

    bombExplode(bomb, scale = 2) {
        this.bombs.remove(bomb);
        bomb.setTexture('explode');
        bomb.setScale(scale);
        bomb.setVelocity(0, 0);
        bomb.play('explodeAnim', true).on('animationcomplete',
            () => bomb.destroy());
    }

    shootFireball() {
        const fireball = new FireBall(this);
        // this.physics.add.sprite(player.x, player.y, 'fireball');
    }

    // pickPowerUp(player, powerUp) {
    //   powerUp.disableBody(true, true);
    // }

    explosion = (projectile, bomb) => {
        projectile.destroy();
        this.bombExplode(bomb);
        this.score += gameSettings.score.bombValue.default;
        this.scoreLabel.text = `Score ${this.score}`;
    }

    dying(player, bomb) {
        if (this.playerState.isDead) return;

        this.playerState.isDead = true;
        // console.log('bomb', bomb);
        // bomb?.setTexture('explode');
        // bomb?.play('explodeAnim');

        this.bombExplode(bomb, 4);

        this.player.setVelocity(0, 0);
        this.player?.play('player_die', true)?.on('animationcomplete',
            () => {

                this.player?.setTexture('explode');
                this.player?.play('explodeAnim', true)?.on('animationcomplete',
                    () => {
                        this.player?.destroy();
                        this.scene.start("gameOver");
                    }, this);
            }, this);
    }

    playerController = () => {

        if (!this.sceneState.isCreated)
            return;

        this.playerState.isRunning = false;

        if (this.playerState.isDead)
            return;

        if (this.cursorKeys.left.isDown) {
            this.playerState.isRunning = true;
            this.player.flipX = true;
            this.player.play('player_run', true);
            this.player.setVelocityX(-gameSettings.player.speedX);

        }

        if (this.cursorKeys.right.isDown) {
            this.playerState.isRunning = true;
            this.player.flipX = false;
            this.player.play('player_run', true);
            this.player.setVelocityX(gameSettings.player.speedX);
        }

        if (this.cursorKeys.down.isDown) {
            this.playerState.isRunning = true;
            this.player.play('player_run', true);
            this.player.setVelocityY(gameSettings.player.speedY);
        }


        if (this.cursorKeys.up.isDown) {
            this.playerState.isRunning = true;
            this.player.play('player_run', true);
            this.player.setVelocityY(-gameSettings.player.speedY);
        }

        if (this.playerState.isRunning)
            this.playerState.isAttacking = false;

        if (Input.Keyboard.JustDown(this.spacebar)) {
            this.shootFireball();
            this.playerState.isAttacking = true;
            this.player.play('player_attack');
            this.player.setVelocity(0, 0);
        }

        this.playerState.isIdle = !this.playerState.isRunning && !this.playerState.isJumping && !this.playerState.isCrouching &&
            !this.playerState.isDead && !this.playerState.isAttacking;

        if (this.playerState.isIdle) {
            this.player.setVelocity(0, 0);
            this.player.play('player_idle', true);
        }
    }

    gameOver = () => {

    }

    createScore = () => {
        const graphics = this.add.graphics();
        graphics.fillStyle(gameSettings.score.board.color, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(this.canvas.width, 0);
        graphics.lineTo(this.canvas.width, gameSettings.score.board.height);
        graphics.lineTo(0, gameSettings.score.board.height);
        graphics.lineTo(0, 0);
        //
        graphics.closePath();
        graphics.fillPath();

        this.scoreLabel = this.add.bitmapText(gameSettings.score.text.x, gameSettings.score.text.y, 'pixelFont', `Score ${this.score}`, gameSettings.score.text.fontSize);

    }

}
