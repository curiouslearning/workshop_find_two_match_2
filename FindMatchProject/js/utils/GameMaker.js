/**
 * This file is responsible for reading in the JSON game data and processing
 * it into a form the Game component will understand.
 */
import React from "react";
import {Dimensions} from "react-native";

import rawData from "../../json/find_two_match";

class GameMaker {
    /**
     * fractionOfHeight represents the fraction of the total height that the
     * entire game space will take up.
     */
    constructor(fractionOfHeight) {
        this.fractionOfHeight = fractionOfHeight;
        this.screenSize = Dimensions.get("window");
        this.content = [];
        this.processRawLevel = this.processRawLevel.bind(this);
        rawData.forEach(this.processRawLevel);
    }

    processRawLevel(rawLevel) {
        let level = {left: [], right: []};
        rawLevel.left.forEach((rawObj) => {
            let obj = this.processRawObj(rawObj);
            level.left.push(obj);
        });
        rawLevel.right.forEach((rawObj) => {
            let obj = this.processRawObj(rawObj, true);
            level.right.push(obj);
        });
        this.content.push(level);
    }

    processRawObj(rawObj, rightSide=false) {
        let obj = {...rawObj};
        let left = obj.pos[0];
        let top = obj.pos[1];
        // left and top are expected to be 0 or 1. Obj will take up half of
        // vertical space and quarter of horizontal space.
        left = left * (this.screenSize.width / 4);
        // if on the right side, offset left by half the width
        if (rightSide) left += this.screenSize.width / 2;
        top = top * (this.screenSize.height * this.fractionOfHeight / 2)
        obj.pos = [left, top];
        return obj;
    }

    getLevelContent(levelNumber) {
        const level = this.content[levelNumber - 1]; // we assume they're in order?
        return level;
    }
}

export default GameMaker;
