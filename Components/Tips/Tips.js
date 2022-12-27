import { Button, Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";

const Tips = ({navigation}) => {
    return <>
    <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:30}}>
        Tips page sample
    </Text>
    <TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => navigation.navigate('Home')}>
        <Text style={{color:'white', alignSelf:'center'}}>Home page</Text>
    </TouchableHighlight>
    </>
}

export default Tips;