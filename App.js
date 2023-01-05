/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Node } from 'react';
import { Image, Platform, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, PermissionsAndroid } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import SwitchSelector from 'react-native-switch-selector';
import { givenAnswersSunflowers } from "./Components/Quiz/QuestionsAndAnswers";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch
} from 'react-native';
import styles from './Globals/Styles'

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Header as HeaderRNE, HeaderProps } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ARComponent from './Components/AR/ARComponent';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './Components/HomePage/HomePage';
import Tips from './Components/Tips/Tips';
import Quiz from './Components/Quiz/Quiz';
import QuizHistory from './Components/QuizHistory/QuizHistory';
import Achievements from './Components/Achievements/Achievements';
import { node } from 'prop-types';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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

/*************************************
********** DRAWER NAVIGATOR **********
**************************************/

const IconComponent = (name, useMCIcons) => {
  return ({ color, size }) => useMCIcons ?
    <View style={{ width: 30, height: 25, marginRight: -10 }}><MCIcon color="#417D7A" size={size} name={name} style={{ marginLeft: 1, alignSelf: 'center' }}></MCIcon></View> :
    <View style={{ width: 30, height: 25, marginRight: -10 }}><Icon color="#417D7A" size={size} name={name} style={{ marginLeft: 1, alignSelf: 'center' }} /></View>;
};

const CustomSwitchSelector = (props) => {
  return (<SwitchSelector
    hasPadding={true}
    height={20}
    initial={0}
    fontSize={8}
    textColor={"#417D7A"}
    selectedColor={"#fff"}
    buttonColor={"#417D7A"}
    borderColor={"#417D7A"}
    //disabled
    style={{ width: 75, marginLeft: 10 }}
    options={props.opts}
  />);
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: "row", alignItems: "center", alignItems: "center" }}>
        <DrawerItem label="Language" style={{ flex: 4, marginLeft: 0 }} labelStyle={{ color: "#417D7A" }} icon={IconComponent('globe', 0) /* also "language" icon */} />
        <View style={{ flex: 2 }}><CustomSwitchSelector opts={[
          { label: "ENG", value: 0, },
          { label: "ITA", value: 1 }
        ]} /></View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
        <DrawerItem label="Audio description" style={{ flex: 5, marginLeft: 0 }} labelStyle={{ color: "#417D7A" }} icon={IconComponent('volume-up', 0) /* also "audio-description" icon */} />
        <Switch value='false' style={{ flex: 1 }}></Switch>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
        <DrawerItem label="Text size" style={{ flex: 4, marginLeft: 0 }} labelStyle={{ color: "#417D7A" }} icon={IconComponent('text-height', 0)} />
        <View style={{ flex: 2 }}><CustomSwitchSelector opts={[
          { label: "SMALL", value: 0, },
          { label: "BIG", value: 1 }
        ]} /></View>
      </View>
      <DrawerItemList {...props} activeBackgroundColor="#417D7A" />
    </DrawerContentScrollView >
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
      drawerPosition: 'left',
      headerStyle: { backgroundColor: "#417D7A" }, headerTintColor: '#fff', headerTitleAlign: "center",
      drawerInactiveTintColor: "#417D7A", drawerInactiveBackgroundColor: "#fff",
      drawerActiveTintColor: "#417D7A", drawerActiveBackgroundColor: "FFF",
      drawerItemStyle: { marginLeft: 0 }
    }}>
      <Drawer.Screen name="Home" component={HomePage} options={{ drawerItemStyle: { display: "none" }, title: "IntARactive Museum" }} />
      <Drawer.Screen name="Achievements" component={Achievements} options={{ drawerIcon: IconComponent('trophy', 0), drawerLabel: "Achievements", title: "IntARactive Museum" }} />
      <Drawer.Screen name="Tips" component={Tips} options={{ drawerIcon: IconComponent('lightbulb-on-outline', 1), drawerLabel: "Tips", title: "IntARactive Museum" }} />
    </Drawer.Navigator>)
};

/*************************************
**************************************/

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [place, setPlace] = useState(true);
  const [numTakenQuiz, setNumTakenQuiz] = useState(0);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <View style={styles.container}>
      {/*<Button title="request permissions" onPress={requestCameraPermission} />*/}
      {/*<ARComponent/>*/}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="Tips" component={Tips} options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="Quiz" options={{ headerShown: false, animation: 'fade' }}>
            {(props) => <Quiz {...props} numTakenQuiz={numTakenQuiz} setNumTakenQuiz={setNumTakenQuiz} />}
          </Stack.Screen>
          <Stack.Screen name="QuizHistory" options={{ headerShown: false, animation: 'fade' }}>
            {(props) => <QuizHistory {...props} numTakenQuiz={numTakenQuiz} setNumTakenQuiz={setNumTakenQuiz} />}
          </Stack.Screen>
          <Stack.Screen name="Achievements" component={Achievements} options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="ARObject" component={ARComponent} options={{ headerShown: false, animation: 'fade' }} />
        </Stack.Navigator>
      </NavigationContainer>

    </View >
  );
};

export default App;
