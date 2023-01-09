import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARWaveWave = (props) => {
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
        target={"logo2"}>
        <ViroBox position={[0, 0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .05]}
          materials={["wavedet_full"]}
          />



      {/*------------------- DESCRIPTION 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Height"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.005,  0.005, -0.018]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.015, 0.005, -0.0195]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["description_icon"]}
        visible={visible2}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.005, 0.02, -0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene7", inner:"description1"})
            setColor2("blue");
            setVisible2(true);       
            setPauseUpdates(true);       
          }
          else{
            if(nextScene.main == "scene7" && curScene.inner != "description1")
            setNextScene({main:"scene7", inner:""})
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
            setNextScene({main:"scene7", inner:"description2"})
            setColor("blue");
            setVisible(true);              
          }
          else{
            if(nextScene.main == "scene7" && curScene.inner != "description2")
            setNextScene({main:"scene7", inner:""})
            setColor("white");
            setVisible(false);
          }
        }}/>*/}



      {/*------------------- COMPARISON - ICON -------------------*/}
      {/*------------------- VIDEO 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"The making of"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.005,  0.005, 0.009]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.024, 0.005, 0.0072]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["video_icon"]}
        visible={visible}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.005, 0.02, 0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene7", inner:"video"})
            setColor("blue");
            setVisible(true);    
            setPauseUpdates(true);          
          }
          else{
            if(nextScene.main == "scene7" && curScene.inner != "video")
            setNextScene({main:"scene7", inner:""})
            setColor("white");
            setVisible(false);
            setPauseUpdates(false);
          }
        }}/>


        
        {/*------------------- COMPARISON - LEFT -------------------*/}
        {/*<ViroBox position={[-0.08, 0.03, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .1]}
          rotation={[0, 0, -30]}
          materials={["flower_compare"]}
          visible={curScene.inner=="comparison"}
          />
        <ViroText
          pointerEvents='box-none'
          text={"Sunflowers (1888)"}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[-0.08, 0.03, -0.055]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"Neue Pinakothek (Munich)"}
          scale={[0.006, 0.006, 0.006]}
          position={[-0.08, 0.03, 0.06]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>*/}
        



        {/*------------------- COMPARISON - RIGHT -------------------*/}
        {/*<ViroBox position={[0.08, 0.03, 0]}
          rotation={[0, 0, 30]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .1]}
          materials={["flower_compare2"]}
          visible={curScene.inner=="comparison"}
          />

        <ViroText
          pointerEvents='box-none'
          text={"Sunflowers (1888)"}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[0.08, 0.03, -0.055]}
          rotation={[-90, 0, 30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"Private collection"}
          scale={[0.006, 0.006, 0.006]}
          position={[0.08, 0.03, 0.06]}
          rotation={[-90, 0, 30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>*/}
      </ViroARImageMarker>
    </ViroARScene>

    
}

export default ARWaveWave;