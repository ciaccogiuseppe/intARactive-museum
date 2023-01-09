import { Text } from "@rneui/themed";
import React, { useState } from 'react';
import { TouchableHighlight, View, ScrollView } from "react-native";
import styles from "../../Globals/Styles";
import { QuizCorrectOrWrongBody } from "../Quiz/Quiz";
import { questionsSunflowers, questionsGreatWave, givenAnswersArtifact } from "../Quiz/QuestionsAndAnswers";
import { ActivityBar } from "../../Globals/Components";

const QuizHistory = (props) => {
    const { navigation } = props;

    const [historyPage, setHistoryPage] = useState("Home");
    const [historyNum, setHistoryNum] = useState(1);
    const [historyId, setHistoryId] = useState(0);

    switch (historyPage) {
        case "Home":
            return <>
                <ActivityBar titleName={'Quiz history'} navigation={props.navigation} isHome={true} onHomeOrBack={() => navigation.navigate('Home')} />

                {props.numTakenQuiz == 0 ?
                    <Text style={{ color: 'black', marginTop: 250, alignSelf: 'center', fontSize: 20 }}>
                        You have not completed any quiz yet.
                    </Text> :
                    <View style={{ flex: 2 }}>
                        <CompletedQuizList navigation={navigation} givenAnswers={givenAnswersArtifact}
                            setHistoryId={setHistoryId} numTakenQuiz={props.numTakenQuiz}
                            setHistoryPage={setHistoryPage} setHistoryNum={setHistoryNum} historyNum={historyNum} />
                    </View>}
            </>
            break;
        case "Info":
            return <QuizHistoryCorrectOrWrong navigation={navigation} setHistoryPage={setHistoryPage}
                answers={givenAnswersArtifact[historyId].answers}
                artifact={givenAnswersArtifact[historyId].artifact}
                historyNum={historyNum} setHistoryNum={setHistoryNum}
                questionAndAnswers={givenAnswersArtifact[historyId].artifact == "Sunflowers" ?
                    questionsSunflowers[historyNum - 1] :
                    questionsGreatWave[historyNum - 1]
                } />
            break;
        default:
            return "Should not happen"
    }
}

const CompletedQuizList = (props) => {

    let list = [];
    for (let i = 0; i < props.numTakenQuiz; ++i) {
        list.push(<TouchableHighlight key={i} style={{ ...styles.button, marginTop: i == 0 ? 60 : 0, width: "95%", alignSelf: 'center' }}
            onPress={() => {
                props.setHistoryPage("Info");
                props.setHistoryNum(1);
                props.setHistoryId(i);
            }
            }>
            <>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30, fontWeight: "bold" }}>
                    {props.givenAnswers[i].artifact}
                </Text>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: "bold" }}>Date: </Text>{props.givenAnswers[i].date}
                </Text>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: "bold" }}>Score: </Text> {props.givenAnswers[i].score}/3
                </Text>
            </>
        </TouchableHighlight>
        );
    }
    return <ScrollView>
        <View>
            {list}
        </View>
    </ScrollView>
}

const QuizHistoryCorrectOrWrong = (props) => {
    let correct;
    if (props.answers[props.historyNum - 1] == props.questionAndAnswers.solution) {
        correct = true;
    } else {
        correct = false;
    }
    return <>
        <ActivityBar titleName={'Quiz - ' + props.artifact} isClose={true} onCloseOrHelp={() => {
            props.setHistoryNum(1);
            props.setHistoryPage("Home");
        }} isHome={true} onHomeOrBack={() => {
            props.navigation.navigate('Home');
            props.setHistoryNum(1);
            props.setHistoryPage("Home");
        }} />

        <View style={{ ...styles.breadcrumb }}>
            <Text style={{ color: props.historyNum == 1 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}
                onPress={() => props.setHistoryNum(1)}>
                Question 1
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.historyNum == 2 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}
                onPress={() => props.setHistoryNum(2)}>
                Question 2
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.historyNum == 3 ? 'black' : 'gray', fontSize: 15 }}
                onPress={() => props.setHistoryNum(3)}>
                Question 3
            </Text>
        </View>

        <QuizCorrectOrWrongBody answers={props.answers} quizNum={props.historyNum}
            questionAndAnswers={props.questionAndAnswers} />

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight style={{ ...styles.button, width: "90%", alignSelf: 'center' }} onPress={() => {
                if (props.historyNum < 3) {
                    props.setHistoryNum(x => x + 1);
                } else {
                    props.setHistoryNum(1);
                    props.setHistoryPage("Home");
                }
            }}>

                <Text style={{ color: 'white', alignSelf: 'center' }}>{props.historyNum == 3 ?
                    "Back to quiz history" :
                    "Next"
                }</Text>
            </TouchableHighlight>
        </View>
    </>
}

export default QuizHistory;