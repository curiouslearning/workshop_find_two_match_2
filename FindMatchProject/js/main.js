/**
 * creates FindMatchProject
 */

import {StackNavigator} from "react-navigation";

import Introduction from "./components/Introduction";
import Game from "./components/Game";

const FindMatchProject = StackNavigator({
    Introduction: {screen: Introduction},
    Game: {screen: Game}
}, {
    navigationOptions: {
        header: null
    },
});

export default FindMatchProject;
