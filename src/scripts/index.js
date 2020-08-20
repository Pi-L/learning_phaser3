import { Game } from "phaser";
import { pilConfig } from './config';
import SceneWelcome from './scenes/SceneWelcome';
import Scene1 from './scenes/Scene1';
import SceneOver from './scenes/SceneOver';


const config = {
    ...pilConfig,
    scene: [SceneWelcome, Scene1, SceneOver],
};

const game = new Game(config);

