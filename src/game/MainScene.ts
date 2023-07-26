import Phaser from 'phaser'

/**
 * @description saucisse
 */
class Player {
    paddle  : Phaser.Physics.Arcade.Image
    paddlePos : {x: number, y:number}
    PowerUp : [{
        name    : string,
        id      : number
    }]
    score   : number[]

    constructor() {
    }
}

class Ball extends Phaser.Scene {
    obj: Phaser.Physics.Arcade.Sprite
    pos: {x: number, y: number}
    type: string

    constructor(ballSprite : Phaser.Physics.Arcade.Sprite, bounce : number) {
        super();
        this.type = 'vanilla'
        this.obj = ballSprite;
        
        let {width, height} = this.sys.game.canvas;

        this.obj.setMaxVelocity(width, height)
        this.obj.setBounce(bounce)
        this.obj.setVelocity(Math.random() * width / 1.5, Math.random() * height / 1.5)
    }
}

class MainScene extends Phaser.Scene {
    constructor() {
        super ('MainScene')
    }

    ball :  Ball;
    paddle : Phaser.Physics.Arcade.Image[];
    cursor : Phaser.Types.Input.Keyboard.CursorKeys;
    firstHalfReached : boolean;
    player: [{
        paddle: Phaser.Physics.Arcade.Image,

    }]

    preload() {
        this.load.image('ball', 'ball.png')
        this.load.image('paddle', 'testPaddle.png')
    }
    create ()
    {
        let {width, height} = this.sys.game.canvas;
        this.ball = new Ball(this.physics.add.sprite(width / 2, height / 2, 'ball').setScale(0.5), 2)

        this.paddle = [this.physics.add.image(width / 2, 50, 'paddle'),
        this.physics.add.image(width / 2, height - 50, 'paddle')]

        this.cursor = this.input.keyboard.createCursorKeys();
        // this.sys.scene. 
    }
    update(time: number, delta: number): void {
        let {width, height} = this.sys.game.canvas;

        this.ball.obj.setCollideWorldBounds(true)
        this.paddle[0].setCollideWorldBounds(true)
        this.paddle[1].setCollideWorldBounds(true)
        this.physics.add.collider(this.paddle, this.ball.obj)

        // this.paddle[0].setVelocity(0)
        // this.paddle[1].setVelocity(0)

        if (this.paddle[0].getBottomCenter().y >= height / 2)
            this.firstHalfReached = true;
        else
            this.firstHalfReached = false;
        if (this.cursor.down.isDown && !this.firstHalfReached)
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