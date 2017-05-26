/**
 * creates Introduction page
 */

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";

import AnimatedSprite from "react-native-animated-sprite";
import catSprite from "../sprites/cat/catSprite";

const RightArrow = "\u27aa";
const CONTENT = {
    trial_num: 0,
    left: [
        {
            object_id: 1,
            target: "a",
            pos: [20, 100],
            pair_id: [4]
        },
        {
            object_id: 2,
            target: "e",
            pos: [80, 200],
            pair_id: [5]
        },
        {
            object_id: 3,
            target: "u",
            pos: [170, 50],
            pair_id: [6]
        }
    ],
    right: [
        {
            object_id: 4,
            target: "a",
            pos: [250, 200],
            pair_id: [1]
        },
        {
            object_id: 5,
            target: "e",
            pos: [100, 100],
            pair_id: [2]
        },
        {
            object_id: 6,
            target: "u",
            pos: [50, 50],
            pair_id: [3]
        }
    ]
}

class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            animationType: "NORMAL",
            text: "¡Hola, aprendamos español!",
            buttonText: `¡Juguemos! ${RightArrow}`
        };
    }

    // toggles whether the cat is angry
    onPress () {
        this.refs.catRef.startTween();
    }

    render() {
        const {navigate} = this.props.navigation;
        const screenSize = Dimensions.get("window");
        const catY = screenSize.height - catSprite.size.height;
        const catXMin = 50;
        const catXMax = screenSize.width - catSprite.size.width - 50;
        return (
            <View>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                <TouchableOpacity
                    style={styles.gameButton}
                    onPress={() => navigate("Game", {content: CONTENT})}
                >
                    <Text style={styles.gameButtonText}>{this.state.buttonText}</Text>
                </TouchableOpacity>
                <AnimatedSprite
                    ref="catRef"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex(this.state.animationType)}
                    loopAnimation={true}
                    coordinates={{top:catY, left: catXMin}}
                    size={catSprite.size}
                    onPress={() => {this.onPress();}}
                    tweenOptions ={{
                        tweenType: "sine-wave",
                        startXY: [catXMin, catY],
                        xTo: [catXMin, catXMax, catXMin],
                        yTo: [catY],
                        duration: 1500,
                        loop: false
                    }}
                    tweenStart="fromMount"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 30,
        textAlign: "left",
        margin: 10,
    },
    gameButton: {
        height: Dimensions.get("window").height - catSprite.size.height - 50,
        backgroundColor: "#e67e35",
        justifyContent: "center"
    },
    gameButtonText: {
        color: "#FFF",
        fontSize: 50,
        textAlign: "center",
        fontWeight: "bold",
    }
});

export default Introduction;
