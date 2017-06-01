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
import GameMaker from "../utils/GameMaker";

const RightArrow = "\u27aa";
const FractionOfHeight = 0.6;

class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            animationType: "NORMAL",
            text: "¡Hola, aprendamos español!",
            buttonText: `¡Juguemos! ${RightArrow}`
        };
        this.GameMaker = new GameMaker(FractionOfHeight);
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
        const currentLevel = 1;
        return (
            <View>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                <TouchableOpacity
                    style={styles.gameButton}
                    onPress={() => navigate("Game", {content: this.GameMaker.getLevelContent(currentLevel), fractionOfHeight: FractionOfHeight})}
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
