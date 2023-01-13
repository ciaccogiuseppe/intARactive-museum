import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";
import moment from 'moment';
import { Divider, Overlay } from 'react-native-elements';
import { questionsSunflowers, questionsGreatWave, givenAnswersArtifact, quizAnswered } from "./QuestionsAndAnswers";
import { updateDone } from '../Achievements/AchievementLists';
import { ActivityBar } from '../../Globals/Components';
import { pathStrings, writeToFile } from '../../Globals/storageFunctions';

const Quiz = (props) => {
    const { navigation } = props;

    const [quizPage, setQuizPage] = useState("Home");
    const [quizNum, setQuizNum] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [overlay, setOverlay] = useState(0); //0 no overlay, 1 overlay home, 2 overlay X button
    const [newAchieved, setNewAchieved] = useState([]);
    const [overlayAchieved, setOverlayAchieved] = useState(false);

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
            let res = updateDone(quizAnswered[index], 0);
            if (res.length !== 0) {
                setNewAchieved(res);
                setOverlayAchieved(true);
            }
        } else {
            let count = 0;
            let oldScore = quizAnswered[index].bestScore;
            for (let i = 0; i < 3; i++) {
                quizAnswered[index].correctAnswers[i] |= correctLocalAnswer[i];
                count += quizAnswered[index].correctAnswers[i];
            }
            if (count > quizAnswered[index].bestScore) {
                quizAnswered[index].bestScore = count;
                let res = updateDone(quizAnswered[index], 0);
                if (res.length !== 0) {
                    setNewAchieved(res);
                    setOverlayAchieved(true);
                }
            }
        }
    };

    useEffect(() => {
        if (props.newAchieved.length !== 0) {
            setOverlayAchieved(true);
        }
    }, [props.newAchieved.length]);

    const addAnswers = () => {
        let newObj = {
            artifact: props.artifact,
            answers: answers,
            date: moment().calendar(),
            score: score
        };
        props.setTakenQuiz((oldList) =>
            oldList.concat(newObj)
        );
    }

    switch (quizPage) {
        case "Home":
            return <QuizHomePage setQuizNum={setQuizNum} navigation={navigation} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
                setQuizPage={setQuizPage} setScore={setScore} setAnswers={setAnswers}
                setOverlay={setOverlay} artifact={props.artifact} />
        case "Question":
            return <QuizQuestion navigation={navigation} setQuizPage={setQuizPage} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
                quizNum={quizNum} setScore={setScore} answers={answers} score={score}
                setAnswers={setAnswers} setQuizNum={setQuizNum} artifact={props.artifact}
                questionAndAnswers={props.artifact == "Sunflowers" ?
                    questionsSunflowers[quizNum - 1] :
                    questionsGreatWave[quizNum - 1]}
                setOverlay={setOverlay} overlay={overlay} />
        case "CorrectOrWrong":
            return <QuizCorrectOrWrong navigation={navigation} setQuizPage={setQuizPage} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
                answers={answers} setScore={setScore} setAnswers={setAnswers} artifact={props.artifact}
                quizNum={quizNum} setQuizNum={setQuizNum} addAnswers={addAnswers}
                updateState={props.updateState}
                score={score}
                questionAndAnswers={props.artifact == "Sunflowers" ?
                    questionsSunflowers[quizNum - 1] :
                    questionsGreatWave[quizNum - 1]}
                setOverlay={setOverlay} overlay={overlay} />
        case "Results":
            return <QuizResults navigation={navigation} setQuizPage={setQuizPage} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
                setAnswers={setAnswers} answers={answers}
                setQuizNum={setQuizNum}
                score={score} setScore={setScore}
                overlayAchieved={overlayAchieved} toggleOverlay={() => { setOverlayAchieved(false) }}
                newAchieved={props.newAchieved}
                setOverlay={setOverlay} artifact={props.artifact} />
        default:
            return "Should not happen"
    }
}

const QuizHomePage = (props) => {
    return <>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
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
        <Text style={{ fontStyle: 'italic', color: 'black', marginTop: 5, marginHorizontal: 10, alignSelf: 'center', textAlign: 'center', fontSize: 20 }}>
            There will be 3 questions in this quiz.{"\n"}
            Only one answer for each question is correct.
        </Text>

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight 
                underlayColor={styles.palette._3}
                style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => props.setQuizPage("Question")}>
                <Text style={styles.textButtonConfirm}>START NOW</Text>
            </TouchableHighlight>
        </View>
    </>
}

const QuizQuestion = (props) => {
    useEffect(() => {
        props.setIsQuizOpen(true);
    }, []);

    let [answerSelected, setAnswerSelected] = useState(-1); // -1 means no answer selected yet
    let options = [];
    let disabled = answerSelected === -1;
    for (let i = 0; i <= 3; ++i) {
        options.push(
            <TouchableHighlight key={i} 
                underlayColor={styles.palette._4}
                style={answerSelected === i ?
                { ...styles.quizSelected, width: "90%", alignSelf: 'center' } :
                { ...styles.button, width: "90%", alignSelf: 'center', backgroundColor: "white", borderWidth: 3 }}
                onPress={() => setAnswerSelected(i)}>
                <Text style={{ color: answerSelected === i ? "white" : styles.palette._2, alignSelf: 'center', fontSize: 16, fontWeight: "600" }}>{props.questionAndAnswers.options[i]}</Text>
            </TouchableHighlight>
        )
    }

    <hr />

    return <View style={{ flex: 1 }}>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={true}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={props.quizNum} />

        <ConfirmExitOverlay setOverlay={props.setOverlay} setQuizNum={props.setQuizNum} setIsQuizOpen={props.setIsQuizOpen}
            setScore={props.setScore} setAnswers={props.setAnswers} navigation={props.navigation}
            setQuizPage={props.setQuizPage} overlay={props.overlay} />

        <Text style={{ color: 'black', paddingHorizontal: 20, marginTop: 90, marginBottom: 30, alignSelf: 'center', fontSize: 28, textAlign: "center" }}>
            {props.questionAndAnswers.question}
        </Text>

        {options}

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight disabled={disabled} 
                underlayColor={styles.palette._3}
                style={disabled ?
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
    useEffect(() => {
        props.setIsQuizOpen(true);
    }, []);

    return <>
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={true}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={props.quizNum} />

        <ConfirmExitOverlay setOverlay={props.setOverlay} setQuizNum={props.setQuizNum}
            setScore={props.setScore} setAnswers={props.setAnswers} navigation={props.navigation}
            setQuizPage={props.setQuizPage} overlay={props.overlay} setIsQuizOpen={props.setIsQuizOpen} />

        <QuizCorrectOrWrongBody answers={props.answers} quizNum={props.quizNum}
            questionAndAnswers={props.artifact == "Sunflowers" ?
                questionsSunflowers[props.quizNum - 1] :
                questionsGreatWave[props.quizNum - 1]} />

        <View style={{ ...styles.bottom }}>
            <TouchableHighlight 
                underlayColor={styles.palette._3}
                style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => {
                if (props.quizNum < 3) {
                    props.setQuizNum(x => x + 1);
                    props.setQuizPage("Question");
                } else {
                    props.setQuizNum(1);
                    props.updateState({
                        artifact: props.artifact,
                        answers: props.answers,
                        date: moment().calendar(),
                        score: props.score
                    });
                    props.addAnswers();
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
    useEffect(() => {
        props.setIsQuizOpen(true);
    }, []);

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
        <QuizSecondHeader setScore={props.setScore} setQuizNum={props.setQuizNum} setIsQuizOpen={props.setIsQuizOpen} isQuizOpen={props.isQuizOpen}
            setAnswers={props.setAnswers} navigation={props.navigation} xIcon={false}
            setQuizPage={props.setQuizPage} setOverlay={props.setOverlay} artifact={props.artifact} />

        <QuizBreadcrumb quizNum={-1} />
        
        <View  style={{ ...styles.quizCards, marginTop: 55 }}>
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
            <TouchableHighlight 
                underlayColor={styles.palette._3}
                style={{ ...styles.buttonConfirm, width: "90%", alignSelf: 'center' }} onPress={() => {
                props.setQuizPage("Home");
                props.setScore(0);
                props.setAnswers([]);
            }}>
                <Text style={styles.textButtonConfirm}> BACK TO QUIZ HOMEPAGE </Text>
            </TouchableHighlight>
        </View>
        {props.newAchieved.length !== 0 ? <Overlay isVisible={props.overlayAchieved} onBackdropPress={props.toggleOverlay} overlayStyle={{ backgroundColor: styles.palette._0, color: styles.palette._0, borderRadius: 15, width: '65%', height: '20%' }}>

            <View>
                <Icon name='close' type='material' onPress={props.toggleOverlay} style={{ color: 'black', marginLeft: 'auto' }}></Icon>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, margin: 5, alignSelf: "center", alignContent: 'center', position: 'absolute' }}>New Achievements!</Text>
                <Text style={{ textAlign: "center", fontSize: 14, margin: 10 }}>{"You have obtained " + props.newAchieved.length + " new achievement" + (props.newAchieved.length > 1 ? "s" : "") + ": "}</Text>
                {props.newAchieved.map((item) => {
                    return <Text key={item["id"]} style={{ fontWeight: 'bold', textAlign: "center", fontSize: 16, color: "black" }}>{item["title"]}</Text>;
                })}
            </View>
        </Overlay> : <></>}
    </>
}

const QuizSecondHeader = (props) => {
    return <>
        <ActivityBar
            titleName={"Quiz - " + props.artifact}
            isMenuHidden={props.isQuizOpen}
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
                    props.setIsQuizOpen(false);
                    props.navigation.navigate('Home');
                    props.setQuizPage("Home");
                }
            }}
        />
    </>
}

const QuizBreadcrumb = (props) => {
    return <>
        {/* height breadcrumb: 35 */}
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
        <View style={{ ...styles.quizCards, marginTop: 45 }}>
            <Text style={{ color: correct ? 'green' : '#d80303', alignSelf: 'center', fontSize: 35, fontWeight: "800", marginBottom: 10 }}>
                {correct ? "Correct!" : "Wrong!"}
            </Text>

            {correct ?
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    <View>
                        <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }}>Your answer:</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'green', fontStyle: "italic", fontWeight: "600", fontSize: 20, marginRight: 10 }}>
                            {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
                        </Text>
                    </View>
                </View>
                :
                <>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                        <View>
                            <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }}>Your answer:</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#d80303', fontStyle: "italic", fontWeight: "600", fontSize: 20, marginRight: 10 }}>
                                {props.questionAndAnswers.options[props.answers[props.quizNum - 1]]}
                            </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                        <View>
                            <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }}>Correct answer:</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'green', fontStyle: "italic", fontWeight: "600", fontSize: 20, marginRight: 10 }}>
                                {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
                            </Text>
                        </View>
                    </View>
                </>
            }
        </View>

        <View style={{ ...styles.quizCards, marginTop: 10 }}>
            <Text style={{ color: 'black', marginHorizontal: 10, alignSelf: 'center', fontSize: 23, textAlign: "center", fontWeight: "900" }}>
                {props.questionAndAnswers.question}
            </Text>
            <Text style={{ color: 'black', fontStyle: 'italic', marginVertical: 10, marginHorizontal: 10, alignSelf: 'center', fontSize: 18, textAlign: "justify" }}>
                {props.questionAndAnswers.explanation}
            </Text>
        </View>
    </>
}

const ConfirmExitOverlay = (props) => {
    return <Overlay onBackdropPress={() => props.setOverlay(0)} isVisible={props.overlay != 0} overlayStyle={{ backgroundColor: styles.palette._0, color: styles.palette._0, borderRadius: 10, padding: 20 }}>
        <Text style={{ color: "black", alignSelf: "center", fontSize: 22, fontWeight: "700" }}>
            Your progress will be lost
        </Text>
        <Text style={{ color: "black", alignSelf: "center", fontSize: 17, marginTop: 5, marginBottom: 15 }}>
            Are you sure you want to quit?
        </Text>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableHighlight underlayColor={styles.palette._4} style={{ ...styles.button, backgroundColor: styles.palette._0, borderColor:styles.palette._2, borderWidth: 2, width: "35%" }}
                onPress={() => props.setOverlay(0)}>
                <Text style={{ color: styles.palette._2, alignSelf: 'center', fontSize: 18, fontWeight: "900" }}>CANCEL</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"#a32a2a"} style={{ ...styles.button, backgroundColor: "#EC4646", width: "35%" }}
                onPress={() => {
                    props.setQuizNum(1);
                    props.setScore(0);
                    props.setAnswers([]);
                    if (props.overlay == 1) {
                        props.setIsQuizOpen(false);
                        props.navigation.navigate('Home');
                    }
                    props.setQuizPage("Home");
                    props.setOverlay(0);
                }}>
                <Text style={{ color: styles.palette._0, alignSelf: 'center', fontSize: 18, fontWeight: "900" }}>QUIT</Text>
            </TouchableHighlight>
        </View>
    </Overlay>
}

export default Quiz;