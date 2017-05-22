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
    constructor(props) {
        super(props);
        this.state = {
            top: props.obj.pos[1],
            left: props.obj.pos[0],
            isBeingDragged: false
        };
        this.originalLeft = this.props.obj.pos[0];
        this.originalTop = this.props.obj.pos[1];
        let onPanResponderEnd = () => {
            this.setState({isBeingDragged: false});
            console.log("ended");
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.setState({isBeingDragged: true});
                console.log("granted");
            },
            onPanResponderMove: (evt, gestureState) => {
                let {dx, dy} = gestureState;
                this.setState({
                    top: this.originalTop + dy,
                    left: this.originalLeft + dx,
                });
            },
            onPanResponderRelease: onPanResponderEnd,
            onPanResponderTerminate: onPanResponderEnd
        });
    }

    makeStyles() {
        return StyleSheet.create({
            container: {
                top: this.state.top,
                left: this.state.left
            },
            background: {
                position: "absolute",
                top: 10,
                left: -10,
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                opacity: (this.state.isBeingDragged ? 0.70 : 0.30)
            },
            obj: {
                position: "absolute",
                color: "black",
                fontSize: 40
            }
        });
    }

    render() {
        let styles = this.makeStyles();
        return (
            <View style={styles.container} {...this.panResponder.panHandlers}>
                <View style={styles.background} />
                <Text style={styles.obj}>
                    {this.props.obj.target}
                </Text>
            </View>
        );
    }
}

export default Half;
