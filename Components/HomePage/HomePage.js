import { Button, Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";

const HomePage = (props) => {
    const { navigation } = props;
    return <>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 30 }}> Home page sample </Text>
        <TouchableHighlight style={{ ...styles.button, width: "40%", alignSelf: 'center' }} onPress={() => navigation.navigate('Tips')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Tips</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.button, width: "40%", alignSelf: 'center' }} onPress={() => navigation.navigate('ARObject')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>AR scene</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
            props.setIsQuizOpen(true);
            navigation.navigate('Quiz');
        }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Quiz</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.button, width: "40%", alignSelf: 'center' }} onPress={() => navigation.navigate('QuizHistory')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Quiz History</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.button, width: "40%", alignSelf: 'center' }} onPress={() => navigation.navigate('Achievements')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Achievements</Text>
        </TouchableHighlight>
    </>
}

export default HomePage;