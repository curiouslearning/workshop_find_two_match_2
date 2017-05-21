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
import Half from "./Half";

class Game extends Component {
    constructor() {
        super();
        this.state = {
            catAnimationType: "NORMAL"
        };
    }

    render() {
        const CONTENT = this.props.navigation.state.params.content;
        const LEFT = CONTENT.left;
        const RIGHT = CONTENT.right;
        return (
            <View style={styles.containerView}>
                <View style={styles.leftView}>
                    {LEFT.map(obj => <Half obj={obj} key={obj.object_id} />)}
                </View>
                <View style={styles.rightView}>
                    {RIGHT.map(obj => <Half obj={obj} key={obj.object_id} />)}
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
