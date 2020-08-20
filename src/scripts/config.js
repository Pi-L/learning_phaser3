import { AUTO, Scale } from "phaser";

const pilConfig = {
    type: AUTO,
    scale: {
        mode: Scale.RESIZE,
        parent: 'gameContainer',
        autoCenter: Scale.CENTER_BOTH,
        width: 500,
        height: 500
    },
    backgroundColor: 0xf2f2f2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

const gameSettings = {
    player: {
        speedX: 100,
        speedY: 70,
    },
    score: {
        bombValue: {
            default: 20,
            red: 30,
            grey: 20,
        },
        board: {
            height: 50,
            color: 0x121212,
        },
        text: {
            x: 10,
            y: 10,
            fontSize: 40,
        }

    }
};

const getSizes = () => {
    return {
        width: document.querySelector("#gameContainer > canvas")?.width,
        height: document.querySelector("#gameContainer > canvas")?.height,
    };
}

export { pilConfig, gameSettings, getSizes };
