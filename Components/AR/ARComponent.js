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
    ScrollView,
    BackHandler
  } from 'react-native';
import BottomDrawer from 'react-native-bottom-drawer-view';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { Divider, Overlay } from 'react-native-elements';
import { Modal } from 'react-native-paper';
import ARSunflowersMain from './ARSunflowersMain';
import ARSunflowersFlowers from './ARSunflowersFlowers';
import ARSunflowersPot from './ARSunflowersPot';
import ARSunflowersBackground from './ARSunflowersBackground';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import { useBackHandler } from '@react-native-community/hooks';
import KeepAwake from '@sayem314/react-native-keep-awake';

const descriptions = {
  "scene2description1": "With striking yellow petals and a large seed head, sunflowers can easily become the focal point of a room. It's no surprise then, that these vivid blooms have captured the attention of artists over the centuries.",
  "scene2description2": "Van Gogh painted the blossoms in several hues of yellow at Arles, “proving that it was feasible to produce a composition with multiple variations of a given color, with no loss of elegance.” Van Gogh made adaptations of these two Sunflower artworks in 1889. These works are known as the Repetitions.",
  "scene3description1": "Van Gogh was known for his thick application of paint on canvas, called impasto. An Italian word for “paste” or “mixture”, impasto is used to describe a painting technique where paint (usually oil) is laid on so thickly that the texture of brush strokes or palette knife are clearly visible.",
  "scene4description1": "Almost in an intentional contrast with the naturalistic appearance of the flowers, the vase and table appear stylised, and are defined by a thick outline.\nSee how the passage from the table to the wall is highlighted by two different shades of yellow, one darker and one lighter, which are symmetrically reversed on the flower vase. The painter's signature can be seen in the middle of the vase, almost like a decoration on the ceramic surface. ",
}
const overlaySubtitle = {
  "scene2description1": "Flowers: Petals",
  "scene2description2": "Flowers: The Repetitions",
  "scene3description1": "Background: Brush Strokes",
  "scene4description1": "Pot: The Vase",
}

const info = {
"scene1": `Just like other painters working at the time, Vincent made flower still lifes. But he did things a little differently.
After practising with different flowers, he chose a specific variety: the sunflower.
His fellow painters thought that sunflowers were perhaps somewhat coarse and unrefined.
But this is exactly what Vincent liked, and he also enjoyed painting flowers that had gone to seed.
He gave sunflowers the lead role in several paintings.\n\n
Vincent knew that his sunflower paintings were special. As did other people. After he died, friends brought sunflowers
with them to his funeral. Sunflowers became synonymous with Vincent, just as he had hoped.`,

"scene2": `For Van Gogh, the sunflower is the product of its time.
The plant represents the different stages of life; although it shines brightly when the sun is at its zenith, it is no less inspiring when it silently disintegrates.

At the time, the Impressionists’ work on light and color had a great influence on the painter. He, too, had the sudden urge to infuse contrasting shades into his oils.
Tone on tone, yellow on blue, green on yellow; Van Gogh experimented with color. The most sovereign of them all? Yellow, of course.

Over time, the painter made the flower look and feel sacred. He made it the symbol of life, the personification of light and of the purity of a simple existence. He could paint it tirelessly, feeding again and again on its power, as if he saw in it a nurturing mother or even a sacred guide.
Van Gogh even said that it symbolized gratitude.`,


"scene3": `Van Gogh painted the initial four versions in just one week.
Van Gogh allowed his impasto technique — thick strokes of paint — to dominate the painting.
Notice how the pale blue background is produced by a clearly visible cross-hatch of vertical and horizontal marks.

Van Gogh used the principle of opposite colors and the balance of colors within the color wheel to arrive at a cohesive and dynamic image, counterintuitively rife with change and consistency, truths and contradictions.
In van Gogh’s painting, yellow has been lightened into a tint with white. Mixing yellow with white causes yellow to move closer to blue in the color space. Van Gogh also mixed yellow with black to produce Yellow Ochre, which is a shade of yellow.

Mixing yellow with black causes yellow to move closer to blue in the color space. Without applying blue directly to yellow, van Gogh pushed the color closer to blue by applying tints and shades of yellow.`,

"scene4": `Examining the highlight on the vase in “Sunflowers” emphasizes van Gogh’s familiarity with color.
The highlight on the vase is shifted towards cyan, which is close to the brightest point of cool colors. Relative to yellow, the cyan is actually closer to blue, since subtracting yellow from cyan equals cyan plus blue.
`


}

const subtitle = {
  "scene1" : `General`,
  "scene2" : `Detail: Flowers`,
  "scene3" : `Detail: Background`,
  "scene4" : `Detail: Pot`
}

const firstscene = (props) => {
    
    const curScene = props.arSceneNavigator.viroAppProps.curScene;
    const nextScene = props.arSceneNavigator.viroAppProps.nextScene;
    const setNextScene = props.arSceneNavigator.viroAppProps.setNextScene;
    const overlayActive = props.arSceneNavigator.viroAppProps.overlayActive;
    
    

    return <>
    
    {curScene.main == "scene1" && <ARSunflowersMain curScene={curScene} setNextScene={setNextScene} nextScene={nextScene} overlayActive={overlayActive}/>}

    {curScene.main == "scene2" && <ARSunflowersFlowers curScene={curScene} setNextScene={setNextScene} nextScene={nextScene} overlayActive={overlayActive}/>}

    {curScene.main == "scene3" && <ARSunflowersBackground curScene={curScene} setNextScene={setNextScene} nextScene={nextScene} overlayActive={overlayActive}/>}

    {curScene.main == "scene4" && <ARSunflowersPot curScene={curScene} setNextScene={setNextScene} nextScene={nextScene} overlayActive={overlayActive}/>}

    </>
  }

const ARComponent = (props) => {

  const [position, setPosition] = useState([0,0,0]);
  const [percentage, setPercentage] = useState(2);
  const [showBar, setShowBar] = useState(false);
  const [nextScene, setNextScene] = useState({main:"scene1", inner:""});
  const [curScene, setCurScene] = useState({main:"scene1", inner:""});
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
  const getBack = () => {
    let outer = "scene1";
    let inner = "";
    if(curScene.inner != ""){
      outer = curScene.main;
    }
    setCurScene({main:outer, inner:inner});
    setNextScene({main:outer, inner:inner});
  }

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
    if(nextScene.main != curScene.main || (nextScene.main == curScene.main && nextScene.inner != curScene.inner)){
      setPercentage(0);
      setShowBar(true);
    }
    else{
      setPercentage(2);
      setShowBar(false);
    }
  }, [nextScene, curScene] );

  useBackHandler(() => {
    if(isPanelActive) closePanel();
    else getBack();
    return true;
  })

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
            setNextScene: setNextScene,
            overlayActive:isPanelActive}
            }
          initialScene={{
            scene: firstscene
          }}
        >
        
        </ViroARSceneNavigator>
        </View>
        {/*<View style={styles.crosshair}/>*/}
        
        

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
        <Text style={{color:"black", alignSelf:"center", fontSize:17}}>Vincent Van Gogh 1889</Text>
        <Divider color="black" inset={true} insetType="middle" style={{margin:3}}/>
        <Text style={{color:"black", alignSelf:"center", fontSize:16, fontWeight:"bold"}}>
          {subtitle[curScene.main]}
        </Text>
        <Text style={{color:"black", alignSelf:"center", fontSize:15, padding:10, textAlign:"justify"}}>
          {info[curScene.main]}
        </Text>
        </SwipeablePanel>



        
        
        <Overlay onBackdropPress={() => getBack()} isVisible={curScene.inner == "description1" || curScene.inner == "description2"} overlayStyle={{backgroundColor:"#EDE6DB", color:"#EDE6DB"}}>
        <Text style={{color:"black", alignSelf:"center", fontSize:25, fontWeight:"bold"}}>Sunflowers</Text>
        <Text style={{color:"black", alignSelf:"center", fontSize:17}}>Vincent Van Gogh 1889</Text>
        
        <Divider color="black" inset={true} insetType="middle" style={{margin:3}}/>
        <Text style={{color:"black", alignSelf:"center", fontSize:16, fontWeight:"bold"}}>
          {overlaySubtitle[curScene.main+curScene.inner]}
        </Text>
          <Text style={{color:"black", alignSelf:"center", fontSize:15, padding:10}}>{descriptions[curScene.main+curScene.inner]}</Text>
        </Overlay>

        {curScene.inner=="video" &&
        <>
        <View style={{position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)'}} />
        <VideoPlayer
            video={require('../../res/sunflowersvid.mp4')}
            videoWidth={1920}
            videoHeight={1080}
            thumbnail={require('../../res/thumbnail.jpg')}
            autoplay={true}
            resizeMode='cover'
            loop={true}
            disableSeek={true}
            customStyles={{
              seekBarBackground:{flexGrow:0},
              seekBarProgress:{flexGrow:0},
              wrapper:{
                aspectRatio: 1,
                width: "100%",
                position: 'absolute',
                top: '33%'}
              }}
        /></>}
        <View pointerEvents='box-none' style={styles.secondHeader}>
            {curScene.main !== 'scene1' && 
            <TouchableOpacity onPress={() => {getBack();}}>
              <Icon2  style={{margin:4}} name="arrow-back" type="Ionicons" color="white" size={30} />
            </TouchableOpacity>}
            <Text style={{color:"white", margin:4, fontSize: 16, alignSelf:'center', position:'absolute'}}>Van Gogh - Sunflowers</Text>
            <TouchableOpacity onPress={() => {}} style={{marginLeft: 'auto', margin: 6}}>
              <Icon  name="circle-with-cross" type="Entypo" color="white" size={30} />
            </TouchableOpacity>
        </View>
        <KeepAwake/>
        </>)
    
}

ViroMaterials.createMaterials({
    blue_sphere: {
      diffuseTexture: require('../../res/blue.png'),
    },
    white_sphere: {
      diffuseTexture: require('../../res/white.png'),
    },
    sunflowers_full: {
      diffuseTexture: require('../../res/default.jpg'),
    },
    flower_full: {
      diffuseTexture: require('../../res/flower.jpg'),
    },
    pot_full: {
      diffuseTexture: require('../../res/pot.jpg'),
    },
    background_full: {
      diffuseTexture: require('../../res/background.jpg'),
    },
    flower_compare: {
      diffuseTexture: require('../../res/flower_compare.jpg'),
    },
    flower_compare2: {
      diffuseTexture: require('../../res/flower_compare2.jpg'),
    },
    vase_compare: {
      diffuseTexture: require('../../res/vase_compare.jpg'),
    },
    vase_compare2: {
      diffuseTexture: require('../../res/vase_compare2.jpg'),
    },
    mglass_icon: {
      diffuseTexture: require('../../res/magglass.png'),
    },
    compare_icon: {
      diffuseTexture: require('../../res/compare.png'),
    },
    video_icon: {
      diffuseTexture: require('../../res/video.png'),
    },
    description_icon: {
      diffuseTexture: require('../../res/description.png'),
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