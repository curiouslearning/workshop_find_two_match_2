/**
 * Creates the Game page
 */

import React, {Component} from "react";
import {
    Dimensions,
    View,
    StyleSheet
} from "react-native";
import ReactMixin from "react-mixin";
import ReactTimerMixin from "react-timer-mixin";

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
            "possibleOverlapOnRightSide",
            "getOverlappingID",
            "right",
            "wrong"
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
    right() {
        console.log("right!");
    }

    wrong() {
        console.log("wrong!");
        this.setState({
            catAnimationType: "ANGRY"
        });
        let oneSecond = 1000;
        this.setTimeout(() => {
            this.setState({
                catAnimationType: "NORMAL"
            });
        }, oneSecond);
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
                />)}
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
                />)}
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
    }
});

export default Game;
