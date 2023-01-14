import { Button, Text } from "@rneui/themed";
import { TouchableHighlight, View } from "react-native";
import Animated from "react-native-reanimated";
import styles from "../../Globals/Styles";

const HomePage = (props) => {
    const { navigation } = props;
    return <>
    <View style={{height:"100%", backgroundColor:styles.palette._5}}>
    <Animated.Image source={require('./../../res/logo.png')} style={{alignSelf:'center', height: 120, width: 350, margin: 20, marginBottom:0 }} />
    <Animated.Image source={require('./../../res/logo2.png')} style={{alignSelf:'center', height: 30, width: 250, margin: 2 }} />

    <Animated.Image source={require('./../../res/mainpage.png')} style={{alignSelf:'center', height: 330, width: 240, margin: 2 }} />

    {/*<TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => navigation.navigate('Tips')}>
        <Text style={{color:'white', alignSelf:'center'}}>Tips</Text>
    </TouchableHighlight>
    <TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => navigation.navigate('ARObject')}>
        <Text style={{color:'white', alignSelf:'center'}}>AR scene</Text>
    </TouchableHighlight>
    <TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => {
            props.setIsQuizOpen(true);
            navigation.navigate('Quiz');
        }}>
        <Text style={{color:'white', alignSelf:'center'}}>Quiz</Text>
    </TouchableHighlight>
    <TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => navigation.navigate('QuizHistory')}>
            <Text style={{color:'white', alignSelf:'center'}}>Quiz History</Text>
    </TouchableHighlight>
    <TouchableHighlight style={{...styles.button, width:"40%", alignSelf:'center'}} onPress={() => navigation.navigate('Achievements')}>
            <Text style={{color:'white', alignSelf:'center'}}>Achievements</Text>
    </TouchableHighlight>*/}

    <View style={styles.bottom}>
    <TouchableHighlight underlayColor={styles.palette._3} style={{ ...styles.buttonConfirm, width: "75%", alignSelf: 'center', marginBottom:0 }} onPress={() => navigation.navigate('ARObject')}>
            <Text style={styles.textButtonConfirm}>START NOW</Text>
    </TouchableHighlight>
    <TouchableHighlight underlayColor={styles.palette._4} style={{ ...styles.buttonConfirm, width: "35%", padding:8, alignSelf: 'center', marginTop:14, backgroundColor: styles.palette._0, borderColor:styles.palette._2, borderWidth: 3}} onPress={() => navigation.navigate('TipsFirst')}>
            <Text style={{...styles.textButtonConfirm, color:styles.palette._2, fontSize: 15, fontWeight: "700", letterSpacing: 1.5 }}>TIPS</Text>
    </TouchableHighlight>
    </View>
    </View>
    </>
}

export default HomePage;