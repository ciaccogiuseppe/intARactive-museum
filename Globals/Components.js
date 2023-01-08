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
- onClose: function to call when user clicks on "x". if the prop is undefined it shows the "?" icon
- isHome: 
    - true -> it shows an home icon
    - false -> it shows a "<-" icon
    - undefined: no left icons (a hidden one to maintain alignment)
***************************************************/

function ActivityBar(props) {
    return (
        <View style={{
            flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5,
            backgroundColor: "#417D7AAA" /* The last two hex digits are the alpha channel of the color */
        }}>
            {props.isHome === true ? <Icon name='home' size={25} style={{ color: "#FFF", marginLeft: 13 }} onPress={() => props.navigation.navigate('Home')}></Icon> :
                props.isHome === false ? <IonIcon name='arrow-back' size={25} style={{ color: "#FFF", marginLeft: 13 }} onPress={() => props.navigation}></IonIcon>
                    : <IonIcon name='arrow-back' size={25} style={{ opacity: 0, marginLeft: 13 }}></IonIcon>}
            <Text style={{ alignSelf: 'center', fontSize: 23, color: "#FFF", opacity: 1 }}>{props.titleName}</Text>
            {props.onClose !== undefined ? <MCIcon name='close-circle' size={20} onPress={props.onClose} style={{ color: "#FFF" }} alignSelf={"flex-end"}></MCIcon> :
                <Icon name="question-circle" size={25} style={{ color: "#FFF", marginRight: 13 }}></Icon>}
        </View>
    );
}

export { ActivityBar }

