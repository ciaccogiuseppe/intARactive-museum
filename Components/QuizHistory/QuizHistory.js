import { Button, Text } from "@rneui/themed";
import { TouchableHighlight, View } from "react-native";
import styles from "../../Globals/Styles";
import { questionsSunflowers, givenAnswersSunflowers } from "../Quiz/QuestionsAndAnswers";

const QuizHistory = ({navigation}) => {

    return <>
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz history
                           </Text>
                       </View>

                       {givenAnswersSunflowers.length == 0 ?
                       <Text style={{color:'black', marginTop:300, alignSelf:'center', fontSize:25}}>
                               You have not completed any quiz yet.
                       </Text> :
                       <CompletedQuizList givenAnswers={givenAnswersSunflowers} />}
    </>
}

const CompletedQuizList = (props) => {
let list = [];
for(let i=0; i<props.givenAnswers.length;++i) {
list.push(<View key={i}>
                           <Text style={{color:'black', marginTop: i==0 ? 60 : 0, alignSelf:'center', fontSize:30}}>
                               Sunflowers
                           </Text>
                           <Text style={{color:'black', alignSelf:'center', fontSize:20}}>
                               Date: {props.givenAnswers[i].date}
                           </Text>
                           <Text style={{color:'black', alignSelf:'center', fontSize:20}}>
                               Score: {props.givenAnswers[i].score}/3
                           </Text>
             </View>
);
}

    return list
}

export default QuizHistory;