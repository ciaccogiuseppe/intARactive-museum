import React from 'react';
import { ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroARTrackingTargets, ViroBox, ViroMaterials } from "@viro-community/react-viro"
import styles from "../../Globals/Styles"
import Icon from 'react-native-vector-icons/Entypo';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
  } from 'react-native';
const firstscene = () => {
    return <ViroARScene>
  
    {/*<ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
    {/*<ViroSpotLight
              innerAngle={5}
              outerAngle={45}
              direction={[0,-1,-.2]}
              position={[0, 3, 0]}
              color="#ffffff"
              castsShadow={true}
              influenceBitMask={2}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
  shadowOpacity={.7} />*/}
    <ViroARImageMarker target={"logo"}>
    <ViroBox position={[0, 0, 0]}
      animation={{name: "rotate", run: true, loop: true}}
      scale={[.075, .005, .1]}
      materials={["grid"]} />
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
    return(
        <>
        <View style={styles.arView}>
        <ViroARSceneNavigator
          autofocus={true}
          style={styles.arView}
          initialScene={{
            scene: firstscene
          }}
        >
        
        </ViroARSceneNavigator>
        </View>
        <View style={styles.secondHeader}>
            <Text style={{color:"white", margin:4, fontSize: 16, alignSelf:'center', position:'absolute'}}>Van Gogh - Sunflowers</Text>
            <TouchableOpacity onPress={() => {/*MENU CODE HEDRE*/}} style={{marginLeft: 'auto', margin: 6}}>
            <Icon  name="circle-with-cross" type="Entypo" color="white" size={30} />
            </TouchableOpacity>
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
        </View>
        </>)
    
}

ViroMaterials.createMaterials({
    blue_sphere: {
      lightingModel: "PBR",
      diffuseColor: "rgb(19,42,143)",
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