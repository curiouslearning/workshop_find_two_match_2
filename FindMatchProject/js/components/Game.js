/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    View,
    Text
} from "react-native";

class Game extends Component {
    constructor() {
        super();
    }

    static navigationOptions = {
        title: "Game" // TODO en español
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text>Game</Text>
            </View>
        );
    }
}

export default Game;
