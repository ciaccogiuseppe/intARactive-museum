import React, { useEffect, useState } from 'react';
import { ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroARTrackingTargets, ViroBox, ViroCamera, ViroImage, ViroMaterials, ViroOmniLight, ViroSphere, ViroSpotLight, ViroText } from "@viro-community/react-viro"
import styles from "../../Globals/Styles"
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar'
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    ScrollView
  } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Divider, Overlay } from 'react-native-elements';
import { Modal } from 'react-native-paper';
import ARSunflowersMain from './ARSunflowersMain';
import ARSunflowersFlowers from './ARSunflowersFlowers';
import ARSunflowersPot from './ARSunflowersPot';
import ARSunflowersBackground from './ARSunflowersBackground';



const firstscene = (props) => {
    
    const curScene = props.arSceneNavigator.viroAppProps.curScene;

    
    

    return <>
  
    {/*<ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
    
    {curScene == "scene1" && 
      <ARSunflowersMain 
        curScene={curScene}
        setNextScene={props.arSceneNavigator.viroAppProps.setNextScene}
        nextScene={props.arSceneNavigator.viroAppProps.nextScene}/>
    }

    {curScene == "scene2" && <ARSunflowersFlowers curScene={curScene}/>}

    {curScene == "scene3" && <ARSunflowersBackground curScene={curScene}/>}

    {curScene == "scene4" && <ARSunflowersPot curScene={curScene}/>}

    </>
  }

const ARComponent = (props) => {

  const [position, setPosition] = useState([0,0,0]);
  const [percentage, setPercentage] = useState(2);
  const [showBar, setShowBar] = useState(false);
  const [nextScene, setNextScene] = useState("scene1");
  const [curScene, setCurScene] = useState("scene1");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    style: {
      backgroundColor:"#EDE6DB"
    },
    barStyle:{
      backgroundColor:"#000000",
      color:"#000000"
    },
    closeIconStyle:{
      backgroundColor:"#FFFFFF",
      color:"#FFFFFF"
    },
    closeRootStyle:{
      backgroundColor:"#000000",
      color:"#000000"
    },
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  useEffect(() => {
    if(percentage >= 1){
      setCurScene(nextScene);
      setShowBar(false);
    }
    else {
        const intervalID = setInterval( () =>
          setPercentage(percentage+0.05), 70)
      return () => clearInterval(intervalID);
    }    
  }, [percentage])

  useEffect(() => {
    if(nextScene != curScene){
      setPercentage(0);
      setShowBar(true);
    }
    else{
      setPercentage(2);
      setShowBar(false);
    }
  }, [nextScene, curScene] );

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
            setPercentage: setPercentage,
            curScene: curScene,
            nextScene: nextScene,
            setNextScene: setNextScene}}
          initialScene={{
            scene: firstscene
          }}
        >
        
        </ViroARSceneNavigator>
        </View>
        {/*<View style={styles.crosshair}/>*/}
        <View pointerEvents='box-none' style={styles.secondHeader}>
            {curScene !== 'scene1' && 
            <TouchableOpacity onPress={() => {setCurScene("scene1"); setNextScene("scene1")}}>
              <Icon2  style={{margin:4}} name="arrow-back" type="Ionicons" color="white" size={30} />
            </TouchableOpacity>}
            <Text style={{color:"white", margin:4, fontSize: 16, alignSelf:'center', position:'absolute'}}>Van Gogh - Sunflowers</Text>
            <TouchableOpacity onPress={() => {}} style={{marginLeft: 'auto', margin: 6}}>
              <Icon  name="circle-with-cross" type="Entypo" color="white" size={30} />
            </TouchableOpacity>
        </View>

        <View pointerEvents='box-none' style={styles.viewFinder}>
            <Image source={require('../../res/viewfinder.png')} style={{width: 50,   height: 50}}/>
        </View>

        {showBar && <View pointerEvents='box-none' style={{...styles.viewFinder, height:750}}>
          <ProgressBar
            visible={showBar}
            style={{alignSelf:'center', backgroundColor: 'white'}}
            color={styles.header.backgroundColor}
            progress={percentage}
            width={100}/>
        </View>}
        
        <View style={styles.footer}>

            <TouchableHighlight style={styles.button}>
            <Text style={{alignSelf:"center"}} >Quiz</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => openPanel()}>
            <Text style={{alignSelf:"center"}}> Description</Text>
            </TouchableHighlight>
        </View>
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <Text style={{color:"black", alignSelf:"center", fontSize:25, fontWeight:"bold"}}>Sunflowers</Text>
        <Text style={{color:"black", alignSelf:"center", fontSize:17}}>Vincent Van Gogh 1888</Text>
        <Divider color="black" inset={true} insetType="middle" style={{margin:3}}/>
          <Text style={{color:"black", alignSelf:"center", fontSize:15, padding:10}}>
            Just like other painters working at the time, Vincent made flower
            still lifes. But he did things a little differently. After practising
            with different flowers, he chose a specific variety: the sunflower. His
            fellow painters thought that sunflowers were perhaps somewhat coarse and unrefined.
            But this is exactly what Vincent liked, and he also enjoyed painting flowers that had gone to seed.
            He gave sunflowers the lead role in several paintings.
          </Text>
          <Text style={{color:"black", alignSelf:"center", fontSize:15, padding:10}}>
          Vincent knew that his sunflower paintings were special. As did other people. After he died, friends brought sunflowers
          with them to his funeral. Sunflowers became synonymous with Vincent, just as he had hoped.

          </Text>
        </SwipeablePanel>

        <Overlay onBackdropPress={() => setOverlayVisible(false)} isVisible={overlayVisible} overlayStyle={{backgroundColor:"#EDE6DB", color:"#EDE6DB"}}>
        <Text style={{color:"black", alignSelf:"center", fontSize:25, fontWeight:"bold"}}>Sunflowers</Text>
        <Text style={{color:"black", alignSelf:"center", fontSize:17}}>Vincent Van Gogh 1888</Text>
        <Divider color="black" inset={true} insetType="middle" style={{margin:3}}/>
          <Text style={{color:"black", alignSelf:"center", fontSize:15, padding:10}}>Test</Text>
        </Overlay>
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
    grid3: {
      diffuseTexture: require('../../res/magglass.png'),
    },
    grid4: {
      diffuseTexture: require('../../res/pot.jpg'),
    },
    grid5: {
      diffuseTexture: require('../../res/background.jpg'),
    },
    blue: {
      diffuseTexture: require('../../res/blues.png'),
    },
    white: {
      diffuseTexture: require('../../res/whites.png'),
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