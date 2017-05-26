
const catSprite = {
    name: "cat",
    size: {width: 200, height: 200},
    animationTypes: ["NORMAL", "ANGRY"],
    frames: [
        require("./cat.png"),
        require("./cat_angry.png")
    ],
    animationIndex: function getAnimationIndex(animationType) {
        switch (animationType) {
            case "NORMAL":
                return [0];
            case "ANGRY":
                return [1];
        }
    }
};

export default catSprite;
