import Phaser from 'phaser'

/**
 * @description saucisse
 */

class MainScene extends Phaser.Scene {
    constructor() {
        super ('MainScene')
    }
    ball : Phaser.Physics.Arcade.Sprite;
    paddle : Phaser.Physics.Arcade.Image[];
    cursor : Phaser.Types.Input.Keyboard.CursorKeys;
    
    preload() {
        this.load.image('ball', 'ball.png')
        this.load.image('paddle', 'testPaddle.png')
    }
    create ()
    {
        let {width, height} = this.sys.game.canvas;

        this.ball =  this.physics.add.sprite(width / 2, height / 2, 'ball')
        .setScale(0.5);
        this.paddle = [this.physics.add.staticImage(width / 2, 50, 'paddle'),
        this.physics.add.staticImage(width / 2, height - 50, 'paddle')]

        this.cursor = this.input.keyboard.createCursorKeys();
        // this.sys.scene. 
    }
    update(time: number, delta: number): void {
        let {width, height} = this.sys.game.canvas;

        this.ball.setCollideWorldBounds(true)
        this.ball.setBounce(2)
        this.ball.setMaxVelocity(height, height)
        this.physics.add.collider(this.paddle, this.ball)


    }
}

export default MainScene