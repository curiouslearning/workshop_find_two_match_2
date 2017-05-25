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
        var methods = [
            "leftBeingDragged",
            "rightBeingDragged",
            "doneBeingDragged",
            "possibleOverlapOnLeftSide",
            "possibleOverlapOnRightSide"
        ];
        for (method of methods) {
            this[method] = this[method].bind(this);
        }
    }

    // Following methods will be used by the Halfs
    leftBeingDragged(object_id, location) {
        this.setState({
            dragged: {
                left: true,
                id: object_id,
                location: location
            }
        });
    }

    rightBeingDragged(object_id, location) {
        this.setState({
            dragged: {
                right: true,
                id: object_id,
                location: location
            }
        });
    }

    doneBeingDragged() {
        this.setState({
            dragged: undefined
        });
    }

    // These two return the location of the Half being dragged if it is from
    // the opposite side. This is so that a Half can determine if it is being
    // overlapped so that it can highlight.
    possibleOverlapOnLeftSide() {
        let dragged = this.state.dragged;
        if (dragged && dragged.right) {
            return dragged;
        }
    }

    possibleOverlapOnRightSide() {
        let dragged = this.state.dragged;
        if (dragged && dragged.left) {
            return dragged;
        }
    }

    // create the JSX for the Game
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
                {LEFT.map(obj => <Half
                    obj={obj}
                    key={obj.object_id}
                    leftOffset={0}
                    beingDragged={this.leftBeingDragged}
                    doneBeingDragged={this.doneBeingDragged}
                    possibleOverlap={this.possibleOverlapOnLeftSide}
                />)}
                {RIGHT.map(obj => <Half
                    obj={obj}
                    key={obj.object_id}
                    leftOffset={screenSize.width / 2}
                    beingDragged={this.rightBeingDragged}
                    doneBeingDragged={this.doneBeingDragged}
                    possibleOverlap={this.possibleOverlapOnRightSide}
                />)}
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
