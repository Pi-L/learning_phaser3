import { Scene as ScenePhaser, Input } from 'phaser';
import { getSizes, gameSettings } from '../config';
import FireBall from '../effects/Fireball';
import Explosion from '../effects/Explosion';

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-world/
export default class Scene extends ScenePhaser {
    constructor({ key }) {
        super({ key });

        this.canvas = {
            width: getSizes().width,
            height: getSizes().height,
        }

        this.score = 0;
    }

    playerState = {
        isRunning: false,
        isJumping: false,
        isCrouching: false,
        isDead: false,
        isAttacking: false,
        isIdle: true,
        lives: 3,
    };

    sceneState = {
        isCreated: false,
    }

    getScoreText() {
        return `Score ${this.score.toString().padStart(6, '0')}`;
    }

    init() {
        this.physics.world.setBoundsCollision();
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        this.createScoreBoard();

        this.player = this.physics.add.sprite(this.canvas.width / 2, this.canvas.height / 2, 'player_idle');
        this.player.setInteractive();
        this.player.setScale(1.5);

        // this.cameras.main.startFollow(this.player);

        this.physics.world.setBounds(0, gameSettings.score.board.height, this.canvas.width, this.canvas.height - gameSettings.score.board.height);
        this.player.setCollideWorldBounds(true);

        this.bombs = this.physics.add.group();
        this.projectiles = this.physics.add.group();


        this.physics.add.collider(this.projectiles, this.bombs, this.hitTarget);
        // this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.playerHit, null, this);

        this.sceneState.isCreated = true;
    }

    update() {
        this.playerController();

        this.projectiles?.getChildren().map(projectile => projectile.update());
    }

    objectExplode(object, scale = 2) {
        const explosion = new Explosion(this, object.x, object.y, scale);
        object.destroy();
    }

    shootFireball() {
        let fireball;
        if (this.player?.body?.checkCollision?.none === false)
            fireball = new FireBall(this);
    }

    // pickPowerUp(player, powerUp) {
    //   powerUp.disableBody(true, true);
    // }

    hitTarget = (projectile, bomb) => {
        projectile.destroy();
        this.objectExplode(bomb);
        this.score += gameSettings.score.bombValue.default;
        this.scoreLabel.text = this.getScoreText();
    }

    playerHit = (player, bomb) => {
        if (this.player.body.checkCollision.none)
            return;

        this.playerState.lives--;
        this.livesLabel.text = `Lives ${this.playerState.lives}`;

        if (this.playerState.lives <= 0 && !this.playerState.isDead)
            this.dying(bomb);
        else if (this.playerState.lives > 0) {
            this.objectExplode(bomb);
            this.player.body.checkCollision.none = true;

            const tween = this.tweens.add({
                targets: this.player,
                alpha: { from: 0.3, to: .9 },
                ease: 'Linear',
                duration: 1500,
                yoyo: true,
                repeat: 0,
                onComplete: () => {
                    this.player.alpha = 1;
                    this.player.body.checkCollision.none = false;
                },
                callbackScope: this,
            });
        }
    }

    dying(bomb) {
        if (this.playerState.isDead) return;

        this.playerState.isDead = true;
        this.objectExplode(bomb, 4);

        this.player.setVelocity(0, 0);

        this.player?.play('player_die', true)?.on('animationcomplete',
            () => {
                this.objectExplode(this.player, 5);
                setTimeout(() => this.scene.start("gameOver", { score: this.score }), 2000);
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

    createScoreBoard = () => {
        const graphics = this.add.graphics();

        graphics.fillStyle(gameSettings.score.board.color, .9);
        graphics.fillRect(0, 0, this.canvas.width, gameSettings.score.board.height);

        this.scoreLabel = this.add.bitmapText(gameSettings.score.text.x, gameSettings.score.text.y, 'pixelFont', this.getScoreText(), gameSettings.score.text.fontSize);

        this.livesLabel = this.add.bitmapText(getSizes().width - 120,
            gameSettings.score.text.y, 'pixelFont', `Lives ${this.playerState.lives}`, gameSettings.score.text.fontSize);
    }

    centerObject = (object) => {
        object.x = this.canvas.width / 2;
        object.y = this.canvas.height / 2;
    }
}
