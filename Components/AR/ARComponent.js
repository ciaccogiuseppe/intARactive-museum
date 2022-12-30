import React, { useEffect, useState } from 'react';
import { ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroARTrackingTargets, ViroBox, ViroCamera, ViroMaterials, ViroOmniLight, ViroSphere, ViroSpotLight, ViroText } from "@viro-community/react-viro"
import styles from "../../Globals/Styles"
import Icon from 'react-native-vector-icons/Entypo';
import ProgressBar from 'react-native-progress/Bar'
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';

const secondScene = (props) => {
  return <ViroARScene>
  
    {/*<ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
    

    <ViroARImageMarker 
      target={"logo"}>
    <ViroBox position={[0, 0, 0]}
      animation={{name: "rotate", run: true, loop: true}}
      scale={[.075, .005, .1]}
      materials={["grid"]}
      />
    </ViroARImageMarker> 
    </ViroARScene>
} 


const firstscene = (props) => {
    const [color, setColor] = useState("white_sphere");
    const [color2, setColor2] = useState("white_sphere");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);


    const [scene1, setScene1] = useState(true);
    const [scene2, setScene2] = useState(false);

    const handleClick = () => {
      setScene1(false);
      setScene2(true);
    }
    return <ViroARScene>
  
    {/*<ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
    

    {scene2 && <ViroARImageMarker 
      target={"logo"}>
    <ViroBox position={[0, 0, 0]}
      animation={{name: "rotate", run: true, loop: true}}
      scale={[.075, .005, .1]}
      materials={["grid2"]}
      />
    </ViroARImageMarker> }

    {scene1 && <ViroARImageMarker 
      target={"logo"}>
    <ViroBox position={[0, 0, 0]}
      onClick={handleClick}
      animation={{name: "rotate", run: true, loop: true}}
      scale={[.075, .005, .1]}
      materials={["grid"]}
      />
  
    <ViroText
      text={"Flower"}
      scale={[0.005, 0.005, 0.005]}
      position={[0, 0.0065, -0.005]}
      rotation={[-90, 0, 0]}
      outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
      style={styles.descriptionTextStyle}
      visible={visible}/>

    <ViroText
      text={"Background"}
      scale={[0.005, 0.005, 0.005]}
      position={[-0.02, 0.0065, -0.035]}
      rotation={[-90, 0, 0]}
      outerStroke={{type:"Outline", width:4, color:'rgba(0,0,0, 0.5)'}}   
      style={styles.descriptionTextStyle}
      visible={visible2}/>

    <ViroSphere
      scale={[0.003, 0.003, 0.003]}
      position={[0, 0.02, 0]}
      opacity={0.2}
      materials={[color]}
      shadowCastingBitMask={0}
      
      onHover={a => {
        if (a.valueOf() == true){
          setColor("blue_sphere");
          setVisible(true);
          props.arSceneNavigator.viroAppProps.setShowBar(true);
          props.arSceneNavigator.viroAppProps.setPercentage(0);
          setTimeout(() => {
            setScene1(false);
            setScene2(true);
          }, 1550)
        }
        else{
          setColor("white_sphere");
          setVisible(false);
          props.arSceneNavigator.viroAppProps.setShowBar(false);
          props.arSceneNavigator.viroAppProps.setPercentage(1);
        }
      }}/>

    <ViroSphere
      scale={[0.003, 0.003, 0.003]}
      position={[-0.02, 0.02, -0.03]}
      opacity={0.2}
      materials={[color2]}
      shadowCastingBitMask={0}
      onHover={a => {
        if (a.valueOf() == true){
          setColor2("blue_sphere");
          setVisible2(true);
          props.arSceneNavigator.viroAppProps.setShowBar(true);
          props.arSceneNavigator.viroAppProps.setPercentage(0);
        }
        else{
          setColor2("white_sphere");
          setVisible2(false);
          props.arSceneNavigator.viroAppProps.setShowBar(false);
          props.arSceneNavigator.viroAppProps.setPercentage(1);
        }
      }}/>
    </ViroARImageMarker>}
    </ViroARScene>
  }

const ARComponent = (props) => {

  const [position, setPosition] = useState([0,0,0]);
  const [percentage, setPercentage] = useState(2);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    if(percentage > 1){
      setShowBar(false);
    }
    else {
        const intervalID = setInterval( () =>
          setPercentage(percentage+0.08), 100)
      return () => clearInterval(intervalID);
    }    
  }, [percentage])
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
            ref: ref,
            setShowBar: setShowBar,
            setPercentage: setPercentage}}
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

        <View pointerEvents='box-none' style={styles.viewFinder}>
            <Image source={require('../../res/viewfinder.png')} style={{width: 60,   height: 60}}/>
        </View>

        {showBar && <View pointerEvents='box-none' style={{...styles.viewFinder, height:750}}>
          <ProgressBar
            visible={showBar}
            style={{alignSelf:'center', backgroundColor: 'white'}}
            color={styles.header.backgroundColor}
            progress={percentage}
            width={200}/>
        </View>}
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
    grid2: {
      diffuseTexture: require('../../res/flower.jpg'),
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