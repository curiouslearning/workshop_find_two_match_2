/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    Dimensions,
    View,
    Text,
    StyleSheet
} from "react-native";
import ReactMixin from "react-mixin";
import ReactTimerMixin from "react-timer-mixin";

import AnimatedSprite from "react-native-animated-sprite";
import catSprite from "../sprites/cat/catSprite";
import Half from "./Half";

const OneSecond = 1000;
const CLOUD = "\u2601";
const STAR = "\u2605";
const WinText = "¡Tú ganas!";

class Game extends Component {
    constructor() {
        super();
        this.state = {
            catAnimationType: "NORMAL",
            currentOpacities: {}
        };
        this.isSolved = {};
        this.clouds = [];
        this.stars = [];
        var methods = [
            "leftBeingDragged",
            "rightBeingDragged",
            "doneBeingDragged",
            "possibleOverlapOnLeftSide",
            "possibleOverlapOnRightSide",
            "getOverlappingID",
            "right",
            "wrong",
            "currentOpacity"
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
        this.overlappingID = undefined;
        this.setState({
            dragged: undefined
        });
    }

    /**
     * These two are used to determine if the Half currently being dragged
     * overlaps with any Halfs on the opposite side. This is used to highlight
     * the Half being overlapped and to store the overlapped id so that if the
     * dragged Half is released, it can check if there is a match or not.
     *
     * Usage in a Half:
     * 1. create the generator's iterator
     *   this.possibleOverlap = this.props.possibleOverlap();
     * 2. Start the iterator, which returns an object representing the Half
     * currently being dragged (if it is from the other side)
     *   let otherHalf = this.possibleOverlap.next().value;
     * 3. If otherHalf exists, give the generator an object telling it this
     * Half's ID and if there was an overlap.
     *   if (otherHalf) {
     *       (logic to find isOverlap)
     *       this.possibleOverlap.next({
     *           isOverlap: isOverlap,
     *           object_id: this.props.obj.object_id
     *       });
     *   }
     */
    *possibleOverlapOnLeftSide() {
        let dragged = this.state.dragged;
        if (dragged && dragged.right) {
            let result = yield dragged;
            if (result.isOverlap) {
                this.overlappingID = result.object_id;
            } else if (result.object_id == this.overlappingID) {
                // no longer overlapping
                this.overlappingID = undefined;
            }
        }
    }

    *possibleOverlapOnRightSide() {
        let dragged = this.state.dragged;
        if (dragged && dragged.left) {
            let result = yield dragged;
            if (result.isOverlap) {
                this.overlappingID = result.object_id;
            } else if (result.object_id == this.overlappingID) {
                // no longer overlapping
                this.overlappingID = undefined;
            }
        }
    }

    // this method is called when a Half is done being dragged. This returns the
    // object_id of the Half that this Half has been dragged over, if one exists.
    getOverlappingID() {
        return this.overlappingID;
    }

    // Following two methods are used when a Half has been released to indicate
    // for the user whether their answer was right or wrong
    right(position) {
        console.log("right!");
        var draggedHalf = this.state.dragged.id;
        var overlappedHalf = this.overlappingID;
        let frames = 20;
        let time = (OneSecond / 3) / frames;
        let change = 1 / frames;
        let isLeft = (position.left < Dimensions.get("window").width / 2);
        let reward = {...position, opacity: 0};
        if (isLeft) {
            this.clouds.push(reward);
        } else {
            this.stars.push(reward);
        }
        for (let i = 0; i < frames; i++) {
            this.setTimeout(() => {
                if (i == frames - 1) {
                    // last frame, they are fully faded, mark them as solved
                    this.isSolved[draggedHalf] = true;
                    this.isSolved[overlappedHalf] = true;
                    // check if the user has won
                    let numPairs = this.props.navigation.state.params.content.left.length;
                    let matchedPairs = this.clouds.length + this.stars.length;
                    if (numPairs == matchedPairs) {
                        this.setState({won: true});
                    }
                }
                if (isLeft) {
                    this.clouds[this.clouds.length - 1].opacity = change * i;
                } else {
                    this.stars[this.stars.length - 1].opacity = change * i;
                }
                this.setState({
                    currentOpacities: {
                        [draggedHalf]: 1 - change * i,
                        [overlappedHalf]: 1 - change * i
                    }
                });
            }, time * i);
        }
    }

    wrong() {
        console.log("wrong!");
        this.setState({
            catAnimationType: "ANGRY"
        });
        this.setTimeout(() => {
            this.setState({
                catAnimationType: "NORMAL"
            });
        }, OneSecond);
    }

    currentOpacity(object_id) {
        if (this.isSolved[object_id]) {
            return 0;
        }
        let opacity = this.state.currentOpacities[object_id];
        return (opacity ? opacity : 1);
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
                    getOverlappingID={this.getOverlappingID}
                    right={this.right}
                    wrong={this.wrong}
                    currentOpacity={this.currentOpacity(obj.object_id)}
                />)}
                {this.clouds.map((cloud, i) => <Text key={i} style={[styles.reward, {...cloud}]}>
                    {CLOUD}
                </Text>)}
                {RIGHT.map(obj => <Half
                    obj={obj}
                    key={obj.object_id}
                    leftOffset={screenSize.width / 2}
                    beingDragged={this.rightBeingDragged}
                    doneBeingDragged={this.doneBeingDragged}
                    possibleOverlap={this.possibleOverlapOnRightSide}
                    getOverlappingID={this.getOverlappingID}
                    right={this.right}
                    wrong={this.wrong}
                    currentOpacity={this.currentOpacity(obj.object_id)}
                />)}
                {this.stars.map((star, i) => <Text key={i} style={[styles.reward, {...star}]}>
                    {STAR}
                </Text>)}
                {(this.state.won ? <Text style={styles.winText}>{WinText}</Text> : null)}
            </View>
        );
    }
}

ReactMixin(Game.prototype, ReactTimerMixin);

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
    },
    reward: {
        fontSize: 50,
        color: "white",
        position: "absolute"
    },
    winText: {
        position: "absolute",
        backgroundColor: "#e67e35",
        height: 200,
        width: "100%",
        color: "#FFF",
        fontSize: 50,
        textAlign: "center",
        fontWeight: "bold",
        textAlignVertical: "center",
        marginTop: 20
    }
});

export default Game;
