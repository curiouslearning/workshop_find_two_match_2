/**
 * creates Introduction page
 */

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    Button,
    View
} from "react-native";

import AnimatedSprite from "react-native-animated-sprite";
import catSprite from "../sprites/cat/catSprite";

class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            animationType: "NORMAL",
            text: "¡Hola, aprendamos español!"
        };
    }

    // toggles whether the cat is angry
    onPress () {
        this.setState({ animationType: (this.state.animationType == "NORMAL" ? "ANGRY" : "NORMAL")});
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={this.props.style}>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                <Button title="Game!" onPress={() => navigate("Game")} />
                <AnimatedSprite
                    ref="catRef"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex(this.state.animationType)}
                    loopAnimation={true}
                    coordinates={{top:100, left: 50}}
                    size={catSprite.size}
                    onPress={() => {this.onPress();}}
                    tweenOptions ={{
                        tweenType: "sine-wave",
                        startXY: [50, 100],
                        xTo: [100, 150, 100, 50],
                        yTo: [100, 100, 100, 100],
                        duration: 1000,
                        loop: true
                    }}
                    tweenStart="fromMount"
                />
                <AnimatedSprite
                    ref="catRef2"
                    sprite={catSprite}
                    animationFrameIndex={catSprite.animationIndex("ANGRY")}
                    loopAnimation={true}
                    coordinates={{top:300, left: 50}}
                    size={catSprite.size}
                    draggable={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    }
});

export default Introduction;
