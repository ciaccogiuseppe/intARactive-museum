/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Viro3DObject, ViroARImageMarker, ViroARScene, ViroARSceneNavigator, ViroARTrackingTargets, ViroBox, ViroLightingEnvironment, ViroMaterials, ViroNode, ViroQuad, ViroSphere, ViroSpotLight, ViroText } from '@viro-community/react-viro';
import React, { useState } from 'react';
import {Node} from 'react';
import { Image, Platform, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, PermissionsAndroid} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import styles from './Globals/Styles'

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Header as HeaderRNE, HeaderProps} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Entypo';
import ARComponent from './Components/AR/ARComponent';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './Components/HomePage/HomePage';
import Tips from './Components/Tips/Tips';
import Quiz from './Components/Quiz/Quiz';
import Achievements from './Components/Achievements/Achievements';

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


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [place, setPlace] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    
    <View style={styles.container}>
      <HeaderRNE containerStyle={styles.header}
        statusBarProps={{backgroundColor:'#1D5C63'}}
        leftComponent={<TouchableOpacity onPress={() => {/*MENU CODE HEDRE*/}}>
        <Icon name="menu" color="white" size={28} />
      </TouchableOpacity>}
        centerComponent={{ text: 'intARactive museum', style: { color: 'white',
        fontSize: 22,
        fontWeight: 'bold'} }}
      />

      {/*<Button title="request permissions" onPress={requestCameraPermission} />*/}
      {/*<ARComponent/>*/}
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="Tips" component={Tips} options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="Achievements" component={Achievements} options={{headerShown: false, animation:'fade'}} />
        <Stack.Screen name="ARObject" component={ARComponent} options={{headerShown: false, animation:'fade'}} />
      </Stack.Navigator>
    </NavigationContainer>
      
    </View>
  );
};


export default App;
