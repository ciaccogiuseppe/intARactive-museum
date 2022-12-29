import React, { useState } from 'react';
import { ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroARTrackingTargets, ViroBox, ViroCamera, ViroMaterials, ViroOmniLight, ViroSphere, ViroSpotLight, ViroText } from "@viro-community/react-viro"
import styles from "../../Globals/Styles"
import Icon from 'react-native-vector-icons/Entypo';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';

  
const firstscene = (props) => {
    const [color, setColor] = useState("white_sphere");
    const [color2, setColor2] = useState("white_sphere");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    return <ViroARScene ref={props.arSceneNavigator.viroAppProps.ref}>
  
    {/*<ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
    

    <ViroARImageMarker 
      target={"logo"}>
    <ViroBox position={[0, 0, 0]}
      animation={{name: "rotate", run: true, loop: true}}
      scale={[.075, .005, .1]}
      materials={["grid"]}
      />
  
    <ViroText
      text={"Flower"}
      scale={[0.005, 0.005, 0.005]}
      position={[0, 0.0065, -0.005]}
      rotation={[-90, 0, 0]}
      outerStroke={{type:"Outline", width:8, color:'rgba(0,0,0, 0.5)'}}   
      style={styles.descriptionTextStyle}
      visible={visible}/>

    <ViroText
      text={"Background"}
      scale={[0.005, 0.005, 0.005]}
      position={[-0.02, 0.0065, -0.035]}
      rotation={[-90, 0, 0]}
      outerStroke={{type:"Outline", width:8, color:'rgba(0,0,0, 0.5)'}}   
      style={styles.descriptionTextStyle}
      visible={visible2}/>

    <ViroSphere
      scale={[0.003, 0.003, 0.003]}
      position={[0, 0.02, 0]}
      opacity={0.2}
      materials={[color]}
      shadowCastingBitMask={0}
      onHover={a => {
        console.log(a.valueOf());
        if (a.valueOf() == true){
          setColor("blue_sphere");
          setVisible(true);
        }
        else{
          setColor("white_sphere");
          setVisible(false);
        }
      }}/>

    <ViroSphere
      scale={[0.003, 0.003, 0.003]}
      position={[-0.02, 0.02, -0.03]}
      opacity={0.2}
      materials={[color2]}
      shadowCastingBitMask={0}
      onHover={a => {
        console.log(a.valueOf());
        if (a.valueOf() == true){
          setColor2("blue_sphere");
          setVisible2(true);
        }
        else{
          setColor2("white_sphere");
          setVisible2(false);
        }
      }}/>
    </ViroARImageMarker>
    
    {/*<ViroARImageMarker target={"logo"}>
      <ViroNode scale={[1, 1, 1]} transformBehaviors={["billboardY"]}>
        <ViroSphere  materials={["blue_sphere"]}
          heightSegmentCount={20} widthSegmentCount={20} radius={.03}
          position={[-.2, .25, 0]}
          shadowCastingBitMask={0} />
  
        <ViroSphere materials={["blue_sphere"]}
          heightSegmentCount={20} widthSegmentCount={20} radius={.03}
          position={[-.1, .25, 0]}
          shadowCastingBitMask={0} />
  
        <ViroSphere  materials={["blue_sphere"]}
          heightSegmentCount={20} widthSegmentCount={20} radius={.03}
          position={[0, .25, 0]}
          shadowCastingBitMask={0} />
  
        <ViroSphere  materials={["blue_sphere"]}
          heightSegmentCount={20} widthSegmentCount={20} radius={.03}
          position={[.1, .25, 0]}
          shadowCastingBitMask={0} />
  
        <ViroSphere  materials={["blue_sphere"]}
          heightSegmentCount={20} widthSegmentCount={20} radius={.03}
          position={[.2, .25, 0]}
          shadowCastingBitMask={0}/>
      </ViroNode>
  </ViroARImageMarker>*/}
    </ViroARScene>
  }

const ARComponent = (props) => {
  const [position, setPosition] = useState([0,0,0]);
  const ref = React.createRef();
    return(
        <>
        <View style={styles.arView}>
        <ViroARSceneNavigator
          on
          ref={ref}
          autofocus={true}
          style={styles.arView}
          viroAppProps={{
            position: position,
            setPosition: setPosition,
            ref: ref}}
          initialScene={{
            scene: firstscene
          }}
        >
        
        </ViroARSceneNavigator>
        </View>
        {/*<View style={styles.crosshair}/>*/}
        <View pointerEvents='box-none' style={styles.secondHeader}>
            <Text style={{color:"white", margin:4, fontSize: 16, alignSelf:'center', position:'absolute'}}>Van Gogh - Sunflowers</Text>
            <TouchableOpacity onPress={() => {}} style={{marginLeft: 'auto', margin: 6}}>
            <Icon  name="circle-with-cross" type="Entypo" color="white" size={30} />
            </TouchableOpacity>
        </View>

        <View style={styles.viewFinder}>
            <Image source={require('../../res/viewfinder.png')} style={{width: 60,   height: 60}}/>
        </View>

        <View style={styles.footer}>
            <TouchableHighlight style={styles.button}>
            <Text>Quiz</Text>
            </TouchableHighlight>
            <TouchableHighlight  style={styles.button}>
            <Text>Description</Text>
            </TouchableHighlight>
            <TouchableHighlight  style={styles.button}>
            <Text>Rotate</Text>
            </TouchableHighlight>
            <Text>{position[0].toFixed(2)} </Text>
            <Text>{position[1].toFixed(2)} </Text>
            <Text>{position[2].toFixed(2)} </Text>
        </View>
        </>)
    
}

ViroMaterials.createMaterials({
    blue_sphere: {
      diffuseTexture: require('../../res/blue.png'),
    },
    white_sphere: {
      diffuseTexture: require('../../res/white.png'),
    },
    grid: {
      diffuseTexture: require('../../res/default.jpg'),
    },
  });
  
  
  
  ViroARTrackingTargets.createTargets({
    logo : {
      source : require('../../res/default.jpg'),
      orientation : "Up",
      physicalWidth : 0.08, // real world width in meters
      type: 'Image'
    }
  });


export default ARComponent;