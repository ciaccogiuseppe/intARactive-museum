import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";
import moment from 'moment';
import { Overlay } from 'react-native-elements';
import { questionsSunflowers, questionsGreatWave, givenAnswersArtifact, quizAnswered } from "./QuestionsAndAnswers";
import { updateDone } from '../Achievements/AchievementLists';
import { ActivityBar } from '../../Globals/Components';

const Quiz = (props) => {
    const { navigation } = props;

    const [quizPage, setQuizPage] = useState("Home");
    const [quizNum, setQuizNum] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [overlay, setOverlay] = useState(0); //0 no overlay, 1 overlay home, 2 overlay X button

    const updateBest = () => {
        let correctLocalAnswer = [];
        let questionSolutions = props.artifact === "Sunflowers" ? questionsSunflowers : questionsGreatWave;
        let index = props.artifact === "Sunflowers" ? 0 : 1;
        for (let i = 0; i < 3; i++) {
            correctLocalAnswer[i] = (answers[i] === questionSolutions[i].solution ? 1 : 0);
        }
        if (quizAnswered[index] == null) {
            quizAnswered[index] = {
                quizID: index + 1,
                correctAnswers: correctLocalAnswer,
                bestScore: score.valueOf(),
            };
            updateDone(quizAnswered[index], 0);
        } else {
            let count = 0;
            let oldScore = quizAnswered[index].bestScore;
            for (let i = 0; i < 3; i++) {
                quizAnswered[index].correctAnswers[i] |= correctLocalAnswer[i];
                count += quizAnswered[index].correctAnswers[i];
            }
            if (count > quizAnswered[index].bestScore) {
                quizAnswered[index].bestScore = count;
                updateDone(quizAnswered[index], oldScore);
            }
        }
    };

    switch (quizPage) {
        case "Home":
            return <QuizHomePage setQuizNum={setQuizNum} navigation={navigation}
                setQuizPage={setQuizPage} setScore={setScore} setAnswers={setAnswers}
                setOverlay={setOverlay} artifact={props.artifact} />
        case "Question":
            return <QuizQuestion navigation={navigation} setQuizPage={setQuizPage}
                quizNum={quizNum} setScore={setScore} answers={answers} score={score}
                setAnswers={setAnswers} setQuizNum={setQuizNum} artifact={props.artifact}
                questionAndAnswers={props.artifact == "Sunflowers" ?
                    questionsSunflowers[quizNum - 1] :
                    questionsGreatWave[quizNum - 1]}
                setOverlay={setOverlay} overlay={overlay} />
        case "CorrectOrWrong":
            return <QuizCorrectOrWrong navigation={navigation} setQuizPage={setQuizPage}
                answers={answers} setScore={setScore} setAnswers={setAnswers} artifact={props.artifact}
                quizNum={quizNum} setQuizNum={setQuizNum} setNumTakenQuiz={props.setNumTakenQuiz}
                questionAndAnswers={props.artifact == "Sunflowers" ?
                    questionsSunflowers[quizNum - 1] :
                    questionsGreatWave[quizNum - 1]}
                setOverlay={setOverlay} overlay={overlay} />
        case "Results":
            return <QuizResults navigation={navigation} setQuizPage={setQuizPage}
                setAnswers={setAnswers} answers={answers}
                givenAnswers={givenAnswersArtifact}
                setQuizNum={setQuizNum}
                score={score} setScore={setScore} updateBest={updateBest}
                setOverlay={setOverlay} artifact={props.artifact} />
        default:
            return "Should not happen"
    }
}

const QuizHomePage = (props) => {
    return <>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={false}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <Image source={props.artifact == "Sunflowers" ?
            require('./../../res/default.jpg') :
            require('./../../res/default2.jpg')
        }
            style={{ height: 240, width: 180, alignSelf: "center", marginTop: 10 }} />

        <Text style={{ color: 'black', marginTop: 10, alignSelf: 'center', fontSize: 40, fontWeight: "bold" }}>
            Quiz
        </Text>
        <Text style={{ color: 'black', marginTop: 5, alignSelf: 'center', fontSize: 27, textAlign: "center" }}>
            Test your knowledge{"\n"}about "{props.artifact}"
        </Text>
        <Text style={{ fontStyle: 'italic', color: 'black', marginTop: 5, marginHorizontal: 10, alignSelf: 'center', fontSize: 20 }}>
            There will be 3 questions in this quiz.{"\n"}
            Only one answer for each question is correct.
        </Text>

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => props.setQuizPage("Question")}>
                <Text style={styles.textButtonConfirm}>START NOW</Text>
            </TouchableHighlight>
        </View>
    </>
}

const QuizQuestion = (props) => {
    let [answerSelected, setAnswerSelected] = useState(-1); // -1 means no answer selected yet
    let options = [];
    let disabled = answerSelected === -1;
    for (let i = 0; i <= 3; ++i) {
        options.push(
            <TouchableHighlight key={i} style={answerSelected === i ?
                { ...styles.quizSelected, width: "90%", alignSelf: 'center', borderWidth: 2 } :
                { ...styles.button, width: "90%", alignSelf: 'center', backgroundColor: "white", borderWidth: 2 }}
                onPress={() => setAnswerSelected(i)}>
                <Text style={{ color: answerSelected === i ? "white" : "#1D5C63", alignSelf: 'center', fontSize: 16, fontWeight: "600" }}>{props.questionAndAnswers.options[i]}</Text>
            </TouchableHighlight>
        )
    }

    <hr />

    return <View style={{ flex: 1 }}>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={true}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={props.quizNum} />

        <ConfirmExitOverlay setOverlay={props.setOverlay} setQuizNum={props.setQuizNum}
            setScore={props.setScore} setAnswers={props.setAnswers} navigation={props.navigation}
            setQuizPage={props.setQuizPage} overlay={props.overlay} />

        <Text style={{ color: 'black', paddingHorizontal: 20, marginTop: 90, marginBottom: 30, alignSelf: 'center', fontSize: 28, textAlign: "center" }}>
            {props.questionAndAnswers.question}
        </Text>

        {options}

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight disabled={disabled} style={disabled ?
                { ...styles.buttonDisabled, width: "90%", alignSelf: 'center' } :
                { ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => {
                    if (answerSelected == props.questionAndAnswers.solution) {
                        props.setScore(x => x + 1);
                    }
                    props.setAnswers(answers => [...answers, answerSelected]);
                    setAnswerSelected(-1);
                    props.setQuizPage("CorrectOrWrong")
                }}>
                <Text style={styles.textButtonConfirm}>CONFIRM</Text>
            </TouchableHighlight>
        </View>
    </View >
}


const QuizCorrectOrWrong = (props) => {
    return <>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={true}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={props.quizNum} />

        <ConfirmExitOverlay setOverlay={props.setOverlay} setQuizNum={props.setQuizNum}
            setScore={props.setScore} setAnswers={props.setAnswers} navigation={props.navigation}
            setQuizPage={props.setQuizPage} overlay={props.overlay} />

        <QuizCorrectOrWrongBody answers={props.answers} quizNum={props.quizNum}
            questionAndAnswers={props.artifact == "Sunflowers" ?
                questionsSunflowers[props.quizNum - 1] :
                questionsGreatWave[props.quizNum - 1]} />

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => {
                if (props.quizNum < 3) {
                    props.setQuizNum(x => x + 1);
                    props.setQuizPage("Question");
                } else {
                    props.setNumTakenQuiz(x => x + 1);
                    props.setQuizNum(1);
                    props.setQuizPage("Results");
                }
            }}>
                <Text style={styles.textButtonConfirm}>{props.quizNum == 3 ?
                    "SUBMIT AND SEE RESULTS" :
                    "NEXT"
                }</Text>
            </TouchableHighlight>
        </View>
    </>
}


const QuizResults = (props) => {
    props.givenAnswers.push(
        {
            artifact: props.artifact,
            answers: props.answers,
            date: moment().calendar(),
            score: props.score
        }
    );

    props.updateBest();
    let resultCommentMessage = "";

    switch (props.score) {
        case 0:
            resultCommentMessage = "You can definitely do better...\n"
            break;
        case 1:
            resultCommentMessage = "There is room for improvement, but one point is always better than none!\n"
            break;
        case 2:
            resultCommentMessage = "This is a good result, but you can always challenge yourself to obtain an even higher score by attempting again this quiz!\n"
            break;
        case 3:
            resultCommentMessage = "Congratulations! You get them all!\n"
            break;
        default:
            resultCommentMessage = "This should not happen"
            break;
    }
    return <>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={false}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={-1} />

        <View style={{ ...styles.quizCards, marginTop: 55 }}>
            <Text style={{ color: 'black', alignSelf: 'center', fontSize: 40, fontWeight: "bold" }}>
                Quiz result
            </Text>
            <Text style={{ color: 'black', marginTop: 10, alignSelf: 'center', fontSize: 25 }}>
                You answered correctly at
            </Text>
            <Text style={{ color: 'black', alignSelf: 'center', fontSize: 35, fontWeight: "bold" }}>
                {props.score}/3
            </Text>
            <Text style={{ color: 'black', alignSelf: 'center', fontSize: 25 }}>
                proposed questions
            </Text>
        </View>

        <View style={{ ...styles.quizCards, marginTop: 10 }}>
            <Text style={{ color: 'black', marginHorizontal: 10, alignSelf: 'flex-start', fontSize: 20, textAlign: "justify" }}>
                {resultCommentMessage}
            </Text>
            <Text style={{ color: 'black', marginHorizontal: 10, alignSelf: 'flex-start', fontSize: 20, textAlign: "justify" }}>
                This quiz attempt has been saved into <Text style={{ fontWeight: "bold" }}>Quiz History</Text>.
            </Text>
        </View>

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => {
                props.setQuizPage("Home");
                props.setScore(0);
                props.setAnswers([]);
            }}>
                <Text style={styles.textButtonConfirm}> BACK TO QUIZ HOMEPAGE </Text>
            </TouchableHighlight>
        </View>
    </>
}

const QuizSecondHeader = (props) => {
    return <>
        <ActivityBar
            titleName={"Quiz - " + props.artifact}
            navigation={props.navigation}
            isHome={true}
            isClose={props.xIcon ? true : undefined}
            onCloseOrHelp={() => { props.setOverlay(2); }}    // Overlay "X" button
            onHomeOrBack={() => {
                if (props.xIcon) { //quizQuestion or quizCorrectOrWrong page
                    props.setOverlay(1);
                } else { //quizHome or quizResult page
                    props.setQuizNum(1);
                    props.setScore(0);
                    props.setAnswers([]);
                    props.navigation.navigate('Home');
                    props.setQuizPage("Home");
                }
            }}
        />
        {/*
        <View style={{ ...styles.secondHeader }}>

            <TouchableHighlight style={{ ...styles.button, width: "20%", alignSelf: 'center' }} onPress={() => {
                if (props.xIcon) { //quizQuestion or quizCorrectOrWrong page
                    props.setOverlay(1);
                } else { //quizHome or quizResult page
                    props.setQuizNum(1);
                    props.setScore(0);
                    props.setAnswers([]);
                    props.navigation.navigate('Home');
                    props.setQuizPage("Home");
                }
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Home</Text>
            </TouchableHighlight>
            <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25 }}>
                Quiz - {props.artifact}
            </Text>
            {props.xIcon ?
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20, padding: 10 }}
                    onPress={() => {
                        props.setOverlay(2);
                    }}>
                    x
                </Text> : <Text></Text>}
        </View>
    */}
    </>
}

const QuizBreadcrumb = (props) => {
    return <>
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
            <Text style={{ color: props.quizNum == -1 ? 'black' : 'gray', fontSize: 15 }}>
                Results
            </Text>
        </View>
    </>
}

export const QuizCorrectOrWrongBody = (props) => {
    let correct;
    if (props.answers[props.quizNum - 1] == props.questionAndAnswers.solution) {
        correct = true;
    } else {
        correct = false;
    }

    return <>
        <View style={{ ...styles.quizCards, marginTop: 55 }}>
            <Text style={{ color: correct ? 'green' : 'red', alignSelf: 'center', fontSize: 40, fontWeight: "800" }}>
                {correct ? "Correct!" : "Wrong!"}
            </Text>

            {correct ?
                <>
                    <Text style={{ color: 'black', marginLeft: 10, marginRight: 10, alignSelf: 'flex-start', fontSize: 25 }}>
                        Your answer:
                    </Text>
                    <Text style={{ color: 'green', fontStyle: 'italic', marginLeft: 50, marginRight: 10, alignSelf: 'flex-start', fontSize: 20 }}>
                        {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
                    </Text>
                </>
                :
                <>
                    <Text style={{ color: 'black', marginLeft: 10, marginRight: 10, alignSelf: 'flex-start', fontSize: 23 }}>
                        Your answer:
                    </Text>
                    <Text style={{ color: 'red', fontStyle: 'italic', marginLeft: 50, marginRight: 10, alignSelf: 'flex-start', fontSize: 20 }}>
                        {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
                    </Text>
                    <Text style={{ color: 'black', marginLeft: 10, marginRight: 10, alignSelf: 'flex-start', fontSize: 23 }}>
                        Correct answer:
                    </Text>
                    <Text style={{ color: 'green', fontStyle: 'italic', marginLeft: 50, marginRight: 10, alignSelf: 'flex-start', fontSize: 20 }}>
                        {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
                    </Text>
                </>
            }
        </View>

        <View style={{ ...styles.quizCards, marginTop: 10 }}>
            <Text style={{ color: 'black', marginRight: 10, marginLeft: 10, alignSelf: 'flex-start', fontSize: 23 }}>
                {props.questionAndAnswers.question}
            </Text>
            <Text style={{ color: 'black', fontStyle: 'italic', marginRight: 10, marginLeft: 50, marginVertical: 10, alignSelf: 'flex-start', fontSize: 18, textAlign: "justify" }}>
                {props.questionAndAnswers.explanation}
            </Text>
        </View>
    </>
}

const ConfirmExitOverlay = (props) => {
    return <Overlay onBackdropPress={() => props.setOverlay(0)} isVisible={props.overlay != 0} overlayStyle={{ backgroundColor: "#EDE6DB", color: "#EDE6DB", borderRadius: 10, padding: 20 }}>
        <Text style={{ color: "black", alignSelf: "center", fontSize: 22, fontWeight: "700" }}>
            Your progress will be lost
        </Text>
        <Text style={{ color: "black", alignSelf: "center", fontSize: 17, marginTop: 3, marginBottom: 15 }}>
            Are you sure you want to quit?
        </Text>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableHighlight style={{ ...styles.button, backgroundColor: "#ec4646", width: "35%" }}
                onPress={() => {
                    props.setQuizNum(1);
                    props.setScore(0);
                    props.setAnswers([]);
                    if (props.overlay == 1) {
                        props.navigation.navigate('Home');
                    }
                    props.setQuizPage("Home");
                    props.setOverlay(0);
                }}>
                <Text style={{ color: "#EDE6DB", alignSelf: 'center', fontSize: 18, fontWeight: "900" }}>YES</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{ ...styles.button, backgroundColor: "#EDE6DB", borderWidth: 2, width: "35%" }}
                onPress={() => props.setOverlay(0)}>
                <Text style={{ color: "#1D5C63", alignSelf: 'center', fontSize: 18, fontWeight: "900" }}>NO</Text>
            </TouchableHighlight>
        </View>
    </Overlay>
}

export default Quiz;