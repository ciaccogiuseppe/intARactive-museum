import React from 'react';
import { View } from 'react-native';
import { Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "./Styles";

function ActivityBar(props) {
    return <View style={{ ...styles.secondHeader }}>
        <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
        </TouchableHighlight>
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
            {props.titleName}
        </Text>
    </View>
}

export { ActivityBar }

