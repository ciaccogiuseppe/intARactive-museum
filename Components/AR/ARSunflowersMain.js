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
    const curScene = props.curScene;
    const setNextScene = props.setNextScene;
    const nextScene = props.nextScene;

    useEffect(() => {
        if(curScene != "scene1"){
          setColor("white");
          setColor2("white");
          setColor3("white");
  
          setVisible(false);
          setVisible2(false);
          setVisible3(false);
        }
  
      }, [curScene])
    return <ViroARScene>
    <ViroARImageMarker 
      target={"logo"}>
      <ViroBox 
        pointerEvents='box-none'
        position={[0, 0, 0]}
        animation={{name: "rotate", run: true, loop: true}}
        scale={[.075, .005, .1]}
        materials={["grid"]}
        />
    
      <ViroText
        pointerEvents='box-none'
        text={"Flower"}
        scale={[0.005, 0.005, 0.005]}
        position={[0, 0.005, -0.005]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.01, 0.005, -0.0065]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["grid3"]}
        visible={visible}
        />


      <ViroText
        pointerEvents='box-none'
        text={"Background"}
        scale={[0.005, 0.005, 0.005]}
        position={[-0.02, 0.005, -0.035]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible2}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.036, 0.005, -0.0365]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["grid3"]}
        visible={visible2}
        />

      <ViroText
        pointerEvents='box-none'
        text={"Pot"}
        scale={[0.005, 0.005, 0.005]}
        position={[0.001,  0.005, 0.019]}
        rotation={[-90, 0, 0]}
        outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
        style={styles.descriptionTextStyle}
        visible={visible3}/>

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.0055, 0.005, 0.0175]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={["grid3"]}
        visible={visible3}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[0, 0.02, 0]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color]}
        opacity={0.7}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene("scene2") 
            setColor("blue");
            setVisible(true);
          }
          else{
            if(nextScene == "scene2")
            setNextScene("scene1")
            setColor("white");
            setVisible(false);
          }
        }}
        />    

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[-0.02, 0.02, -0.03]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color2]}
        opacity={0.7}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene("scene3")
            setColor2("blue");
            setVisible2(true);              
          }
          else{
            if(nextScene == "scene3")
            setNextScene("scene1")
            setColor2("white");
            setVisible2(false);
          }
        }}
        />

      <ViroBox
        pointerEvents='box-none'
        scale={[0.005, 0.000, 0.005]}
        position={[0.001, 0.02, 0.024]}
        animation={{name: "rotate", run: true, loop: true}}
        materials={[color3]}
        opacity={0.7}
        onHover={a => {
          if (a.valueOf() == true){
            setNextScene("scene4")
            setColor3("blue");
            setVisible3(true);              
          }
          else{
            if(nextScene == "scene4")
            setNextScene("scene1")
            setColor3("white");
            setVisible3(false);
          }
        }}/>
    </ViroARImageMarker>
  </ViroARScene>
}

export default ARSunflowersMain;