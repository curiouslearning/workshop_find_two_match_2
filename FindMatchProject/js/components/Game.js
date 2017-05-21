/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    View,
    Text
} from "react-native";

import AnimatedSprite from "react-native-animated-sprite";
import catSprite from "../sprites/cat/catSprite";

class Game extends Component {
    constructor() {
        super();
        this.state = {
            catAnimationType: "NORMAL"
        };
    }

    static navigationOptions = {
        title: "Game" // TODO en español
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text>Game</Text>
                <AnimatedSprite
                    ref="cat"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex(this.state.catAnimationType)}
                    loopAnimation={true}
                    coordinates={{top:200, left: 10}}
                    size={catSprite.size}
                />
            </View>
        );
    }
}

export default Game;
