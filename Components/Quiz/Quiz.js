import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";
import moment from 'moment';
import { questionsSunflowers, givenAnswersSunflowers } from "./QuestionsAndAnswers";


const Quiz = ({ navigation }) => {
    const [quizPage, setQuizPage] = useState("Home");
    const [quizNum, setQuizNum] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);

    switch (quizPage) {
        case "Home":
            return <QuizHomePage navigation={navigation} setQuizPage={setQuizPage} />
        case "Question":
            return <QuizQuestion navigation={navigation} setQuizPage={setQuizPage}
                quizNum={quizNum} setScore={setScore} answers={answers} score={score}
                setAnswers={setAnswers} setQuizNum={setQuizNum}
                questionAndAnswers={questionsSunflowers[quizNum - 1]} />
        case "CorrectOrWrong":
            return <QuizCorrectOrWrong navigation={navigation} setQuizPage={setQuizPage}
                answers={answers} setScore={setScore}
                quizNum={quizNum} setQuizNum={setQuizNum}
                questionAndAnswers={questionsSunflowers[quizNum - 1]} />
        case "Results":
            return <QuizResults navigation={navigation} setQuizPage={setQuizPage}
                setAnswers={setAnswers} answers={answers}
                givenAnswers={givenAnswersSunflowers} score={score} setScore={setScore} />
        default:
            return "Should not happen"
    }
}

const QuizHomePage = (props) => {
    return <>
        <View style={{ ...styles.secondHeader }}>
            <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
            </TouchableHighlight>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
                Quiz - Sunflowers
            </Text>
        </View>


        <Text style={{ color: 'black', marginTop: 250, alignSelf: 'center', fontSize: 40 }}>
            Quiz
        </Text>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 30 }}>
            Test your knowledge{"\n"} about "Sunflowers"
        </Text>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 20 }}>
            There will be 3 questions in this quiz {"\n"}
            Only one answer is correct
        </Text>

        <TouchableHighlight style={{ ...styles.button, width: "90%", alignSelf: 'center' }} onPress={() => props.setQuizPage("Question")}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Start</Text>
        </TouchableHighlight>
    </>
}

const QuizQuestion = (props) => {
    let [answerSelected, setAnswerSelected] = useState(-1); // -1 means no answer selected yet
    let options = [];
    let disabled = answerSelected === -1;
    for (let i = 0; i <= 3; ++i) {
        options.push(
            <TouchableHighlight key={i} style={answerSelected === i ?
                { ...styles.quizSelected, width: "90%", alignSelf: 'center' } :
                { ...styles.button, width: "90%", alignSelf: 'center' }}
                onPress={() => setAnswerSelected(i)}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>{props.questionAndAnswers.options[i]}</Text>
            </TouchableHighlight>
        )
    }

    <hr />

    return <>
        <View style={{ ...styles.secondHeader }}>
            <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => props.navigation.navigate('Home')}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
            </TouchableHighlight>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30 }}>
                Quiz - Sunflowers
            </Text>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, padding: 10 }}
                onPress={() => {
                    props.setQuizNum(1);
                    props.setQuizPage("Home");
                }}>
                x
            </Text>
        </View>

        <View style={{ ...styles.breadcrumb }}>
            <Text style={{ color: props.quizNum == 1 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 1
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.quizNum == 2 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 2
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.quizNum == 3 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 3
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: 'gray', fontSize: 15 }}>
                Results
            </Text>
        </View>

        <Text style={{ color: 'black', marginTop: 100, marginBottom: 30, alignSelf: 'center', fontSize: 30 }}>
            {props.questionAndAnswers.question}
        </Text>

        {options}


        <TouchableHighlight disabled={disabled} style={disabled ?
            { ...styles.buttonDisabled, width: "90%", alignSelf: 'center', marginTop: 50 } :
            { ...styles.button, width: "90%", alignSelf: 'center', marginTop: 50 }} onPress={() => {
                if (answerSelected == props.questionAndAnswers.solution) {
                    props.setScore(x => x + 1);
                }
                props.setAnswers(answers => [...answers, answerSelected]);
                setAnswerSelected(-1);
                props.setQuizPage("CorrectOrWrong")
            }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
        </TouchableHighlight>
    </>
}


const QuizCorrectOrWrong = (props) => {
    let correct;
    if (props.answers[props.quizNum - 1] == props.questionAndAnswers.solution) {
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
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, padding: 10 }}
                onPress={() => {
                    props.setQuizNum(1);
                    props.setQuizPage("Home");
                }}>
                x
            </Text>
        </View>

        <View style={{ ...styles.breadcrumb }}>
            <Text style={{ color: props.quizNum == 1 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 1
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.quizNum == 2 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 2
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: props.quizNum == 3 ? 'black' : 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 3
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: 'gray', fontSize: 15 }}>
                Results
            </Text>
        </View>

        <Text style={{ color: 'black', marginTop: 80, alignSelf: 'center', fontSize: 40 }}>
            {correct ? "Correct!" : "Wrong!"}
        </Text>

        {correct ?
            <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
                Your answer: {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
            </Text>
            :
            <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
                Your answer: {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
                {"\n"}
                Correct answer: {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
            </Text>}

        <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
            {props.questionAndAnswers.question}
        </Text>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 20 }}>
            {props.questionAndAnswers.explanation}
        </Text>

        <TouchableHighlight style={{ ...styles.button, width: "90%", alignSelf: 'center' }} onPress={() => {
            if (props.quizNum < 3) {
                props.setQuizNum(x => x + 1);
                props.setQuizPage("Question");
            } else {
                props.setQuizNum(1);
                props.setQuizPage("Results");
            }
        }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>{props.quizNum == 3 ?
                "See results" :
                "Next question"
            }</Text>
        </TouchableHighlight>
    </>
}


const QuizResults = (props) => {
    props.givenAnswers.push(
        {
            answers: props.answers,
            date: moment().calendar(), 
            score: props.score
        } 
    );
    let resultCommentMessage = "";
    switch (props.score) {
        case 0:
            resultCommentMessage = "You can definitely do better..."
            break;
        case 1:
            resultCommentMessage = "There is room for improvement, but one point is always better than none!"
            break;
        case 2:
            resultCommentMessage = "This is a good result, but you can always challenge yourself to obtain an even higher score by attempting again this quiz!"
            break;
        case 3:
            resultCommentMessage = "Congratulations! You get them all!"
            break;
        default:
            resultCommentMessage = "This should not happen"
            break;
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

        <View style={{ ...styles.breadcrumb }}>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 1
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 2
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                Question 3
            </Text>
            <Text style={{ color: 'gray', fontSize: 15, paddingRight: 15 }}>
                &gt;
            </Text>
            <Text style={{ color: 'black', fontSize: 15 }}>
                Results
            </Text>
        </View>

        <Text style={{ color: 'black', marginTop: 80, alignSelf: 'center', fontSize: 40 }}>
            Quiz result
        </Text>
        <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center', fontSize: 25 }}>
            You answered correctly at
        </Text>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 35 }}>
            {props.score}/3
        </Text>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 25 }}>
            proposed questions
        </Text>
        <Text style={{ color: 'black', margin: 20, alignSelf: 'center', fontSize: 20 }}>
            {resultCommentMessage}
        </Text>

        <TouchableHighlight style={{ ...styles.button, width: "90%", alignSelf: 'center' }} onPress={() => {
            props.setQuizPage("Home");
            props.setScore(0);
            props.setAnswers([]);
        }}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Back to quiz home page</Text>
        </TouchableHighlight>
    </>
}

export default Quiz;