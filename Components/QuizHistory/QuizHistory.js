import { Button, Text } from "@rneui/themed";
import React, { useState, useEffect } from 'react';
import { TouchableHighlight, View } from "react-native";
import styles from "../../Globals/Styles";
import { questionsSunflowers, givenAnswersSunflowers } from "../Quiz/QuestionsAndAnswers";

const QuizHistory = ({ navigation }) => {
    const [historyPage, setHistoryPage] = useState("Home");
    const [historyNum, setHistoryNum] = useState(1);
    const [historyId, setHistoryId] = useState(0);

    switch (historyPage) {
        case "Home":
            return <>
                <View style={{ ...styles.secondHeader }}>
                    <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => navigation.navigate('Home')}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
                    </TouchableHighlight>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
                        Quiz history
                    </Text>
                </View>

                {givenAnswersSunflowers.length == 0 ?
                    <Text style={{ color: 'black', marginTop: 300, alignSelf: 'center', fontSize: 25 }}>
                        You have not completed any quiz yet.
                    </Text> :
                    <CompletedQuizList navigation={navigation} givenAnswers={givenAnswersSunflowers}
                        setHistoryId={setHistoryId}
                        setHistoryPage={setHistoryPage} setHistoryNum={setHistoryNum} historyNum={historyNum} />}
            </>
            break;
        case "Info":
            return <QuizHistoryCorrectOrWrong navigation={navigation} setHistoryPage={setHistoryPage}
                answers={givenAnswersSunflowers[historyId].answers}
                historyNum={historyNum} setHistoryNum={setHistoryNum}
                questionAndAnswers={questionsSunflowers[historyNum - 1]} />
            break;
        default:
            return "Should not happen"
    }
}

const CompletedQuizList = (props) => {
    let list = [];
    for (let i = 0; i < props.givenAnswers.length; ++i) {
        list.push(<TouchableHighlight key={i} style={{ ...styles.button, marginTop: i == 0 ? 60 : 0, width: "95%", alignSelf: 'center' }}
            onPress={() => {
                props.setHistoryPage("Info");
                props.setHistoryNum(1);
                props.setHistoryId(i);
            }
            }>
            <>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
                    Sunflowers
                </Text>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>
                    Date: {props.givenAnswers[i].date}
                </Text>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>
                    Score: {props.givenAnswers[i].score}/3
                </Text>
            </>
        </TouchableHighlight>
        );
    }
    return list
}

const QuizHistoryCorrectOrWrong = (props) => {
    let correct;
    if (props.answers[props.historyNum - 1] == props.questionAndAnswers.solution) {
        correct = true;
    } else {
        correct = false;
    }
    return <>
        <View style={{ ...styles.secondHeader }}>
            <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
            </TouchableHighlight>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
                Quiz - Sunflowers
            </Text>
        </View>


        <Text style={{ color: 'black', marginTop: 50, alignSelf: 'center', fontSize: 40 }}>
            {correct ? "Correct!" : "Wrong!"}
        </Text>

        {correct ?
            <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
                Your answer: {props.questionAndAnswers.options[props.answers[props.historyNum - 1]]}
            </Text>
            :
            <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
                Your answer: {props.questionAndAnswers.options[props.answers[props.historyNum - 1]]}
                {"\n"}
                Correct answer: {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
            </Text>}

        <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
            {props.questionAndAnswers.question}
        </Text>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 25 }}>
            {props.questionAndAnswers.explanation}
        </Text>

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
    </>
}

export default QuizHistory;