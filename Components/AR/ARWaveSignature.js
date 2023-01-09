import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARWaveSignature = (props) => {
    const curScene = props.curScene;
    const setNextScene = props.setNextScene;
    const nextScene = props.nextScene;
    const overlayActive = props.overlayActive;
    const [color, setColor] = useState("white");
    const [color2, setColor2] = useState("white");
    const [color3, setColor3] = useState("white");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [pauseUpdates, setPauseUpdates] = useState(false);
    return <ViroARScene>
      <ViroARImageMarker 
        target={"logo2"}
        pauseUpdates={pauseUpdates}>
        <ViroBox position={[0, 0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .05]}
          materials={["signature_full"]}
          />



      {/*------------------- DESCRIPTION 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Nicknames"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.01,  0.005, -0.018]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.026, 0.005, -0.0195]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["description_icon"]}
        visible={visible2}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.01, 0.01, -0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene6", inner:"description1"})
            setColor2("blue");
            setVisible2(true);         
            setPauseUpdates(true);     
          }
          else{
            if(nextScene.main == "scene6" && curScene.inner != "description1")
            setNextScene({main:"scene6", inner:""})
            setColor2("white");
            setVisible2(false);
            setPauseUpdates(false);
          }
        }}/>

      {/*------------------- DESCRIPTION 2 - ICON -------------------*/}
      {/*<ViroText
        pointerEvents='box-none'
        text={"The Repetitions"}
        scale={[0.005, 0.005, 0.005]}
        position={[0.03,  0.005, -0.018]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[0.01, 0.005, -0.0195]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["description_icon"]}
        visible={visible}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[0.03, 0.02, -0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene6", inner:"description2"})
            setColor("blue");
            setVisible(true);              
          }
          else{
            if(nextScene.main == "scene6" && curScene.inner != "description2")
            setNextScene({main:"scene6", inner:""})
            setColor("white");
            setVisible(false);
          }
        }}/>*/}



      {/*------------------- COMPARISON - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Other signatures"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.025,  0.005, 0.00]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible3}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.046, 0.005, -0.002]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["compare_icon"]}
        visible={visible3}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.025, 0.01, 0.004]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color3]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene6", inner:"comparison"})
            setColor3("blue");
            setVisible3(true);    
            setPauseUpdates(true);          
          }
          else{
            if(nextScene.main == "scene6" && curScene.inner != "comparison")
            setNextScene({main:"scene6", inner:""})
            setColor3("white");
            setVisible3(false);
            setPauseUpdates(false);
          }
        }}/>

        
        {/*------------------- COMPARISON - LEFT -------------------*/}
        <ViroBox position={[-0.06, 0.02, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.03, .00, .05]}
          rotation={[0, 0, -30]}
          materials={["signature_compare"]}
          visible={curScene.inner=="comparison"}
          />
        <ViroText
          pointerEvents='box-none'
          text={"\"Hokusai\""}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[-0.06, 0.02, -0.03]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"1797-1819"}
          scale={[0.006, 0.006, 0.006]}
          position={[-0.06, 0.02, 0.03]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        



        {/*------------------- COMPARISON - RIGHT -------------------*/}
        <ViroBox position={[0.06, 0.02, 0]}
          rotation={[0, 0, 30]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.03, .00, .05]}
          materials={["signature_compare2"]}
          visible={curScene.inner=="comparison"}
          />

        <ViroText
          pointerEvents='box-none'
          text={"\"Hokusai Hitsu\""}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[0.06, 0.02, -0.03]}
          rotation={[-90, 0, 30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"1804-1810"}
          scale={[0.006, 0.006, 0.006]}
          position={[0.06, 0.02, 0.03]}
          rotation={[-90, 0, 30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
      </ViroARImageMarker>
    </ViroARScene>

    
}

export default ARWaveSignature;