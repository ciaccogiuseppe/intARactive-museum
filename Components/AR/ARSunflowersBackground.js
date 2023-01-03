import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARSunflowersBackground = (props) => {
    const curScene = props.curScene;
    const setNextScene = props.setNextScene;
    const nextScene = props.nextScene;
    const overlayActive = props.overlayActive;
    const [color, setColor] = useState("white");
    const [color2, setColor2] = useState("white");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    return <ViroARScene>
    <ViroARImageMarker 
      target={"logo"}>
      <ViroBox position={[0, 0, 0]}
        animation={{name: "rotate", run: true, loop: true}}
        scale={[.075, .005, .1]}
        materials={["background_full"]}
        />


      {/*------------------- VIDEO 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"The wooden strip"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.005,  0.005, -0.038]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.027, 0.005, -0.0395]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["video_icon"]}
        visible={visible2}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.005, 0.02, -0.033]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene3", inner:"video"})
            setColor2("blue");
            setVisible2(true);              
          }
          else{
            if(nextScene.main == "scene3" && curScene.inner != "video")
            setNextScene({main:"scene3", inner:""})
            setColor2("white");
            setVisible2(false);
          }
        }}/>



        {/*------------------- DESCRIPTION 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Brush Strokes"}
        scale={[0.005, 0.005, 0.005]}
        position={[0.025,  0.005, -0.018]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[0.005, 0.005, -0.0195]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["description_icon"]}
        visible={visible}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[0.025, 0.02, -0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene3", inner:"description1"})
            setColor("blue");
            setVisible(true);              
          }
          else{
            if(nextScene.main == "scene3" && curScene.inner != "description1")
            setNextScene({main:"scene3", inner:""})
            setColor("white");
            setVisible(false);
          }
        }}/>
    </ViroARImageMarker>
  </ViroARScene>    
}

export default ARSunflowersBackground;