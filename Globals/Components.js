import React from 'react';
import { View } from 'react-native';
import { Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from "./Styles";

/********************** PROPS ********************** 
- titleName: title of the header
- navigation: component for navigation between pages
- onCloseOrHelp: function to call when user clicks on "x" or "?" icon
- isClose: represents the icon on the right.
    - true -> it shows an home icon
    - false -> it shows a "?" icon
    - undefined: no right icons (a hidden one to maintain alignment)
- isHome: represents the icon on the left.
    - true -> it shows an home icon
    - false -> it shows a "<-" icon
    - undefined: no left icons (a hidden one to maintain alignment)
- onHomeOrBack: function to call when click on "home" or "back" icon.
    If undefined, it is (as default) "navigation.navigate('Home')" or "navigation.goBack()"
***************************************************/

function ActivityBar(props) {
    return (
        <View style={{
            flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5, height: 45,
            backgroundColor: "#417D7AAA" /* The last two hex digits are the alpha channel of the color */
        }}>
            {props.isHome === true ? <Icon name='home' size={25} style={{ color: "#FFF", marginLeft: 13 }} onPress={props.onHomeOrBack !== undefined ? props.onHomeOrBack : () => props.navigation.navigate('Home')}></Icon> :
                props.isHome === false ? <IonIcon name='arrow-back' size={25} style={{ color: "#FFF", marginLeft: 13 }} onPress={props.onHomeOrBack !== undefined ? props.onHomeOrBack : () => props.navigation.goBack()}></IonIcon>
                    : <IonIcon name='arrow-back' size={25} style={{ opacity: 0, marginLeft: 13 }}></IonIcon>}
            <Text style={{ alignSelf: 'center', fontSize: 23, color: "#FFF", opacity: 1 }}>{props.titleName}</Text>
            {props.isClose !== undefined && props.onCloseOrHelp !== undefined ?
                <MCIcon name={props.isClose ? 'close-circle' : "question-circle"} size={25} onPress={props.onCloseOrHelp} style={{ color: "#FFF", marginRight: 13 }} alignSelf={"flex-end"}></MCIcon> :
                <Icon name="question-circle" size={25} style={{ opacity: 0, marginRight: 13 }}></Icon>}
        </View>
    );
}

export { ActivityBar }