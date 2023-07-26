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
        this.ball.setMaxVelocity(height, height)
        this.ball.setBounce(2)
        this.ball.setVelocityY(-300)

        this.paddle = [this.physics.add.image(width / 2, 50, 'paddle'),
        this.physics.add.image(width / 2, height - 50, 'paddle')]

        this.cursor = this.input.keyboard.createCursorKeys();
        // this.sys.scene. 
    }
    update(time: number, delta: number): void {
        let {width, height} = this.sys.game.canvas;

        this.ball.setCollideWorldBounds(true)
        this.paddle[0].setCollideWorldBounds(true)
        this.paddle[1].setCollideWorldBounds(true)
        this.physics.add.collider(this.paddle, this.ball)

        // this.paddle[0].setVelocity(0)
        // this.paddle[1].setVelocity(0)

        if (this.paddle[0].getBottomCenter().y >= height / 2)
            this.paddle[0].setVelocityY(0)
        else if (this.cursor.down.isDown)
                this.paddle[0].setVelocityY(200)
        else if (this.cursor.up.isDown)
            this.paddle[0].setVelocityY(-200)
        else if (this.cursor.up.isUp && this.cursor.down.isUp)
            this.paddle[0].setVelocityY(0)
        // else if (this.cursor.up.isUp)
        //     this.paddle[0].setVelocityY(0)

        if (this.cursor.left.isDown)
            this.paddle[0].setVelocityX(-200)
        else if (this.cursor.right.isDown)
            this.paddle[0].setVelocityX(200)
    }
}

export default MainScene