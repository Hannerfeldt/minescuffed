import Phaser from "phaser";
import { GameStartScene } from "./GameStartScene";
import { GameSetting } from "./GameSetting";
import { GameScene } from "./GameScene";
import { GameOverScene } from "./GameOverScene";


let config = {
  type: Phaser.Auto,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  },
  scene: [GameStartScene, GameSetting, GameScene]
}

let game = new Phaser.Game(config);

export { game as default }
