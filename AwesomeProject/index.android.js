/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from "react-native";

import AnimatedSprite from "react-native-animated-sprite";
import catSprite from "./sprites/cat/catSprite";

export default class AwesomeProject extends Component {
    constructor() {
        super();
        this.state = {
            animationType: "NORMAL"
        };
    }

    // toggles whether the cat is angry
    onPress () {
        this.setState({ animationType: (this.state.animationType == "NORMAL" ? "ANGRY" : "NORMAL")});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to the Awesome Cat App!!!
                </Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  }
});

AppRegistry.registerComponent("AwesomeProject", () => AwesomeProject);
