/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    Dimensions,
    View,
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
        var screenSize = Dimensions.get("window");
        var catSize = catSprite.size;
        return (
            <View style={styles.containerView}>
                <View style={styles.leftView} />
                <View style={styles.rightView} />
                <AnimatedSprite
                    ref="cat"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex(this.state.catAnimationType)}
                    loopAnimation={true}
                    coordinates={{
                        top: screenSize.height - catSize.height,
                        left: (screenSize.width) / 2 - (catSize.width / 2)
                    }}
                    size={catSize}
                />
                {LEFT.map(obj => <Half obj={obj} key={obj.object_id} leftOffset={0} />)}
                {RIGHT.map(obj => <Half obj={obj} key={obj.object_id} leftOffset={screenSize.width / 2} />)}
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
