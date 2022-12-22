/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Viro3DObject, ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroBox, ViroLightingEnvironment, ViroMaterials, ViroNode, ViroQuad, ViroSphere, ViroSpotLight, ViroText } from '@viro-community/react-viro';
import React, { useState } from 'react';
import {Node} from 'react';
import { Image, Platform, TouchableHighlight } from 'react-native';
import { Button, PermissionsAndroid} from "react-native";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    
    <View style={styles.sectionContainer}>
      <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestCameraPermission} />
      
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
/*https://drive.google.com/uc?export=download&id=15dD5osi5nqez01JWih9nwrx6_5y0ypqY*/
/*https://drive.google.com/uc?export=download&id=1d2DSnsyvHBbHmRUFKbA770S5QqR_JNuJ*/

const firstscene = () => {
  return <ViroARScene style={styles.arView}>

  <ViroText text={"Hello world"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
  <ViroSpotLight
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
            shadowOpacity={.7} />
  <ViroBox position={[0, -.5, -1]}
    animation={{name: "rotate", run: true, loop: true}}
    scale={[.3, .5, .01]} materials={["grid"]} />
  <ViroARImageMarker >
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
  </ViroARImageMarker>
  </ViroARScene>
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [place, setPlace] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    <View style={styles.container}>
       <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestCameraPermission} />
        
      <ViroARSceneNavigator
        initialScene={{
          scene: firstscene
        }}
      >
      
      </ViroARSceneNavigator>
      
      <View style={styles.footer}>
        <TouchableHighlight style={styles.button}>
          <Text>Take Snapshot</Text>
        </TouchableHighlight>
        <Button title="aaa"  style={styles.button} onPress={() => {
          setPlace(false);
          console.log("HERE")
        }}/>
        <TouchableHighlight  style={styles.button}>
          <Text>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight  style={styles.button}>
          <Text>Rotate</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
ViroMaterials.createMaterials({
  blue_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(19,42,143)",
  },
  grid: {
    diffuseTexture: require('./res/default.jpg'),
  },
});
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arView: {
    flex: 5,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;
