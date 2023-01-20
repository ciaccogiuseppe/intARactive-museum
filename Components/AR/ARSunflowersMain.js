import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARSunflowersMain = (props) => {
    const [color, setColor] = useState("white");
    const [color2, setColor2] = useState("white");
    const [color3, setColor3] = useState("white");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [pauseUpdates, setPauseUpdates] = useState(false);
    const curArtifact = props.curArtifact;
    const setCurArtifact = props.setCurArtifact;
    const setGlobArtifact = props.setGlobArtifact;
    const curScene = props.curScene;
    const setNextScene = props.setNextScene;
    const nextScene = props.nextScene;
    const overlayActive = props.overlayActive;

    useEffect(() => {
        if(curScene.main != "scene1"){
          setColor("white");
          setColor2("white");
          setColor3("white");
  
          setVisible(false);
          setVisible2(false);
          setVisible3(false);
        }
  
      }, [curScene])
    return <ViroARScene>
      {(curArtifact == 0 || curArtifact == 1) &&
      <ViroARImageMarker 
      target={"logo"}
      onAnchorFound={() => {setCurArtifact(1); setGlobArtifact("Sunflowers")}}
      pauseUpdates={pauseUpdates}>
      
      {curArtifact == 1 && <>
        <ViroBox 
        pointerEvents='box-none'
        position={[0, 0, 0]}
        animation={{name: "rotate", run: true, loop: true}}
        scale={[.075, .005, .1]}
        materials={["sunflowers_full"]}
        />
    
      <ViroText
        pointerEvents='box-none'
        text={"Flower"}
        scale={[0.01, 0.01, 0.001]}
        position={[0, 0.005, -0.01]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.01, 0.000, 0.01]}
        position={[-0.02, 0.005, -0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible}
        />


      <ViroText
        pointerEvents='box-none'
        text={"Background"}
        scale={[0.01, 0.01, 0.001]}
        position={[-0.02, 0.005, -0.0395]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.01, 0.000, 0.01]}
        position={[-0.052, 0.005, -0.042]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible2}
        />

      <ViroText
        pointerEvents='box-none'
        text={"Pot"}
        scale={[0.01, 0.01, 0.001]}
        position={[0.001,  0.005, 0.019]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible3}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.01, 0.000, 0.01]}
        position={[-0.012, 0.005, 0.0165]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible3}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.014, 0.000, 0.014]}
        position={[0, 0.02, 0.001]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene2", inner:""}) 
            setColor("blue");
            setVisible(true);
            setPauseUpdates(true);
          }
          else{
            if(nextScene.main == "scene2")
            setNextScene({main:"scene1", inner:""})
            setColor("white");
            setVisible(false);
            setPauseUpdates(false);
          }
        }}
        />    

      <ViroBox
        pointerEvents='box-none'
        scale={[0.014, 0.000, 0.014]}
        position={[-0.02, 0.02, -0.03]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene3", inner:""})
            setColor2("blue");
            setVisible2(true);    
            setPauseUpdates(true);          
          }
          else{
            if(nextScene.main == "scene3")
            setNextScene({main:"scene1", inner:""})
            setColor2("white");
            setVisible2(false);
            setPauseUpdates(false);
          }
        }}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.014, 0.000, 0.014]}
        position={[0.001, 0.02, 0.026]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color3]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene4", inner:""})
            setColor3("blue");
            setVisible3(true);  
            setPauseUpdates(true);            
          }
          else{
            if(nextScene.main == "scene4")
            setNextScene({main:"scene1", inner:""})
            setColor3("white");
            setVisible3(false);
            setPauseUpdates(false);
          }
        }}/>
      </>}
      
    </ViroARImageMarker>}
    {(curArtifact == 0 || curArtifact == 2) && <ViroARImageMarker 
      target={"logo2"}
      onAnchorFound={() => {setCurArtifact(2); setGlobArtifact("The Great Wave")}}
      pauseUpdates={pauseUpdates}>
        {curArtifact == 2 && <>
          <ViroBox 
        pointerEvents='box-none'
        position={[0, 0, 0]}
        animation={{name: "rotate", run: true, loop: true}}
        scale={[.075, .005, .05]}
        materials={["wave_full"]}
        />
    
      {/*------------------- DETAIL 1 - BOAT -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Boats"}
        scale={[0.005, 0.005, 0.005]}
        position={[0, 0.005, 0.005]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.009, 0.005, 0.0035]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[0, 0.02, 0.01]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene5", inner:""}) 
            setColor("blue");
            setVisible(true);
            setPauseUpdates(true);
          }
          else{
            if(nextScene.main == "scene5")
            setNextScene({main:"scene1", inner:""})
            setColor("white");
            setVisible(false);
            setPauseUpdates(false);
          }
        }}
        />    

      {/*------------------- DETAIL 2 - SIGNATURE -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Signature"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.03, 0.005, -0.02]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.044, 0.005, -0.0215]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible2}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.03, 0.02, -0.015]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene6", inner:""})
            setColor2("blue");
            setVisible2(true);   
            setPauseUpdates(true);           
          }
          else{
            if(nextScene.main == "scene6")
            setNextScene({main:"scene1", inner:""})
            setColor2("white");
            setVisible2(false);
            setPauseUpdates(false);
          }
        }}
        />

      {/*------------------- DETAIL 3 - WAVE -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Wave"}
        scale={[0.005, 0.005, 0.005]}
        position={[0.001,  0.005, -0.016]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible3}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.0075, 0.005, -0.0175]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["mglass_icon"]}
        visible={visible3}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[0.001, 0.02, -0.012]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color3]}
        opacity={0.7}
        visible={!overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene7", inner:""})
            setColor3("blue");
            setVisible3(true);  
            setPauseUpdates(true);            
          }
          else{
            if(nextScene.main == "scene7")
            setNextScene({main:"scene1", inner:""})
            setColor3("white");
            setVisible3(false);
            setPauseUpdates(false);
          }
        }}/>
        
        </>}
      
    </ViroARImageMarker>}
    
  </ViroARScene>
}

export default ARSunflowersMain;