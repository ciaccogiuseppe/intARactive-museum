/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

<<<<<<< HEAD

const App = () => {
=======
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


const App = (): Node => {
>>>>>>> 1c0410e65ffc99d8dc8c071f7f6fda32a934d67e
  const isDarkMode = useColorScheme() === 'dark';
  const [place, setPlace] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    
    <View style={styles.container}>
<<<<<<< HEAD
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
      
=======
       <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestCameraPermission} />
        
      
      
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
>>>>>>> 1c0410e65ffc99d8dc8c071f7f6fda32a934d67e
    </View>
  );
};

<<<<<<< HEAD
=======
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
>>>>>>> 1c0410e65ffc99d8dc8c071f7f6fda32a934d67e

export default App;
