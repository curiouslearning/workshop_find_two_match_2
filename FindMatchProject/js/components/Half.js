/**
 * Creates the Half component (meaning "half" of a match, a single letter or
 * word or sound)
 */

import React, {Component} from "react";
import {
    View,
    Text,
    PanResponder,
    StyleSheet
} from "react-native";

class Half extends Component {
    componentWillMount() {
        this.originalLeft = this.props.obj.pos[0];
        this.originalTop = this.props.obj.pos[1];
        this.styles = StyleSheet.create({
            container: {
                top: this.props.obj.pos[1],
                left: this.props.obj.pos[0]
            },
            background: {
                position: "absolute",
                top: 10,
                left: -10,
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                opacity: 0.30
            },
            obj: {
                position: "absolute",
                color: "black",
                fontSize: 40
            }
        });
        // TODO make it draggable!!!
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => true,
            onPanResponderMove: () => true,
            onPanResponderRelease: () => true,
            onPanResponderTerminate: () => true
        });
    }

    render() {
        return (
            <View style={this.styles.container}>
                <View style={this.styles.background} />
                <Text style={this.styles.obj}>
                    {this.props.obj.target}
                </Text>
            </View>
        );
    }
}

export default Half;
