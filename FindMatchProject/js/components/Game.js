/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet
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

    render() {
        return (
            <View style={styles.containerView}>
                <View style={styles.leftView}>
                    <Text>Game</Text>
                </View>
                <View style={styles.rightView}>
                    <Text>Such a game</Text>
                </View>
                <AnimatedSprite
                    ref="cat"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex(this.state.catAnimationType)}
                    loopAnimation={true}
                    coordinates={{top:200, left: 250}}
                    size={catSprite.size}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: "row"
    },
    leftView: {
        backgroundColor: "#87CEEB",
        flex: 1
    },
    rightView: {
        backgroundColor: "#00008B",
        flex: 1
    }
});

export default Game;
