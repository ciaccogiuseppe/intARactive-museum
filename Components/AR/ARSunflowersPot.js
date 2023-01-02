import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARSunflowersPot = (props) => {
    const curScene = props.curScene;
    return <ViroARScene>
        <ViroARImageMarker 
        target={"logo"}>
        <ViroBox position={[0, 0, 0]}
            animation={{name: "rotate", run: true, loop: true}}
            scale={[.075, .005, .1]}
            materials={["grid4"]}
            />
        </ViroARImageMarker>
    </ViroARScene>    
}

export default ARSunflowersPot;