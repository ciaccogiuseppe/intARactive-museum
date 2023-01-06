import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "./Styles";

/*
Props:
- titleName: title of the header
- navigation: component for navigation between pages
- onClose: function to call when user clicks on "x"
*/
function ActivityBar(props) {
    return <View style={{ ...styles.secondHeader }}>
        <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
        </TouchableHighlight>
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
            {props.titleName}
        </Text>
        {props.onClose != undefined ? <Icon name='close' type='material' onPress={props.onClose} color={'white'} alignSelf={"flex-end"}></Icon> : <></>}
    </View>
}

export { ActivityBar }

