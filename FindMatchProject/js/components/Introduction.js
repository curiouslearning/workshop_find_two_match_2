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
import Game from "./Game"

const RightArrow = "\u27aa";
const FractionOfHeight = 0.6;
const TrainerHeightFraction = 0.5;

class Introduction extends Component {
    constructor() {
        super();
        let screenSize = Dimensions.get("window");
        let top = screenSize.height / 8;
        let left = screenSize.width / 8;
        let leftHalf = {
            "object_id": "e_left",
            "pos": [left, top],
            "target": "e",
            "pair_id": ["e_right"]
        };
        let rightHalf = {
            "object_id": "e_right",
            "pos": [left + screenSize.width / 2, top],
            "target": "e",
            "pair_id": ["e_left"]
        };
        this.trainerContent = {
            trial_num: "000",
            left: [leftHalf],
            right: [rightHalf]
        }
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
            <View style={styles.container}>
                <Game content={this.trainerContent} fractionOfHeight={TrainerHeightFraction} />
                <TouchableOpacity
                    style={styles.gameButton}
                    onPress={() => navigate("Game", {content: this.GameMaker.getLevelContent(currentLevel), fractionOfHeight: FractionOfHeight})}
                >
                    <Text style={styles.gameButtonText}>{this.state.buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gameButton: {
        flex: 1 - TrainerHeightFraction,
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
