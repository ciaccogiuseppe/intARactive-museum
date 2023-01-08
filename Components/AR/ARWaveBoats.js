import { ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@viro-community/react-viro";
import React, { useEffect, useState } from 'react';
import styles from "../../Globals/Styles";

const ARWaveBoats = (props) => {
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
    return <ViroARScene>
      <ViroARImageMarker 
        target={"logo2"}>
        <ViroBox position={[0, 0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .05]}
          materials={["boats_full"]}
          />



      {/*------------------- DESCRIPTION 1 - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Oshiokuribune"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.005,  0.005, 0.008]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.025, 0.005, 0.0065]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["description_icon"]}
        visible={visible2}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[-0.005, 0.02, 0.013]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene5", inner:"description1"})
            setColor2("blue");
            setVisible2(true);              
          }
          else{
            if(nextScene.main == "scene5" && curScene.inner != "description1")
            setNextScene({main:"scene5", inner:""})
            setColor2("white");
            setVisible2(false);
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
            setNextScene({main:"scene5", inner:"description2"})
            setColor("blue");
            setVisible(true);              
          }
          else{
            if(nextScene.main == "scene5" && curScene.inner != "description2")
            setNextScene({main:"scene5", inner:""})
            setColor("white");
            setVisible(false);
          }
        }}/>*/}



      {/*------------------- COMPARISON - ICON -------------------*/}
      <ViroText
        pointerEvents='box-none'
        text={"Other boats"}
        scale={[0.005, 0.005, 0.005]}
        position={[0.011,  0.005, -0.009]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible3}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.005, 0.005, -0.0105]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["compare_icon"]}
        visible={visible3}
        />
      <ViroBox
        pointerEvents='box-none'
        scale={[0.007, 0.000, 0.007]}
        position={[0.011, 0.02, -0.004]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color3]}
        opacity={0.7}
        visible={curScene.inner=="" && !overlayActive}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene({main:"scene5", inner:"comparison"})
            setColor3("blue");
            setVisible3(true);              
          }
          else{
            if(nextScene.main == "scene5" && curScene.inner != "comparison")
            setNextScene({main:"scene5", inner:""})
            setColor3("white");
            setVisible3(false);
          }
        }}/>

        
        {/*------------------- COMPARISON - LEFT -------------------*/}
        {/*<ViroBox position={[-0.08, 0.0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.075, .005, .05]}
          rotation={[0, 0, -30]}
          materials={["boats_compare"]}
          visible={curScene.inner=="comparison"}
          />
        <ViroText
          pointerEvents='box-none'
          text={"Fast Cargo Boat Battling The Waves (1805)"}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[-0.08, 0.03, -0.055]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"MFA (Boston)"}
          scale={[0.006, 0.006, 0.006]}
          position={[-0.08, 0.03, 0.06]}
          rotation={[-90, 0, -30]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>*/}
        



        {/*------------------- COMPARISON - RIGHT -------------------*/}
        <ViroBox position={[0, 0.0, -0.07]}
          rotation={[0, 0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.07, .005, .045]}
          materials={["boats_compare2"]}
          visible={curScene.inner=="comparison"}
          />

        <ViroText
          pointerEvents='box-none'
          text={"View of Honmoku off Kanagawa (1903)"}
          textClipMode="none"
          scale={[0.007, 0.007, 0.007]}
          position={[0.00, 0.01, -0.1]}
          rotation={[-45, 0, 0]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={styles.descriptionTextStyle}
          visible={curScene.inner=="comparison"}/>
        <ViroText
          pointerEvents='box-none'
          text={"Sumida Hokusai Museum (Tokyo)"}
          scale={[0.006, 0.006, 0.006]}
          position={[0.00, 0.01, -0.041]}
          rotation={[-90, 0, 0]}
          outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
          style={{...styles.descriptionTextStyle, fontSize:70}}
          visible={curScene.inner=="comparison"}/>
      </ViroARImageMarker>
    </ViroARScene>

    
}

export default ARWaveBoats;