import React from 'react'
import Phaser from 'phaser'
import MainScene from '../src/game/MainScene'

type AppProps = {}
type AppState = {}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        const game = new Phaser.Game({
            parent: 'game-root',
            type: Phaser.AUTO,
            width:600,
            height:1000,
            scene: [MainScene],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 200
                    },
                    // debug: true
                }
            }
        })
    }

    render () {
        return (<>
        <div id='game-root'></div>
        This is React
        </>)
    }
}

export default App