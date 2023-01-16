import { Text, Icon } from "@rneui/themed";
import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View, ScrollView } from "react-native";
import styles from "../../Globals/Styles";
import { QuizCorrectOrWrongBody } from "../Quiz/Quiz";
import { questionsSunflowers, questionsGreatWave } from "../Quiz/QuestionsAndAnswers";
import { ActivityBar } from "../../Globals/Components";
import { useIsFocused } from '@react-navigation/native';
import { Button, Divider, Overlay } from 'react-native-elements';

const QuizHistory = (props) => {
    const { navigation } = props;

    const [historyPage, setHistoryPage] = useState("Home");
    const [historyNum, setHistoryNum] = useState(1);
    const [historyId, setHistoryId] = useState(0);
    const [helpOverlay, setHelpOverlay] = useState(false);
    switch (historyPage) {
        case "Home":
            return <>
                <ActivityBar onHelp={()=>setHelpOverlay(true)}  titleName={'Quiz history'} navigation={props.navigation} isHome={true} onHomeOrBack={() => navigation.navigate('Home')} />

                {props.takenQuiz.length === 0 ?
                    <View style={{backgroundColor:styles.palette._5, height:"100%"}}>
                    <Text style={{ color: 'black', marginTop: 250, alignSelf: 'center', fontSize: 20 }}>
                        You have not completed any quiz yet
                    </Text></View> :
                    <View style={{ flex: 2 }}>
                        <CompletedQuizList navigation={navigation}
                            setHistoryId={setHistoryId} takenQuiz={props.takenQuiz}
                            setHistoryPage={setHistoryPage} setHistoryNum={setHistoryNum} historyNum={historyNum} />
                    </View>
                    }
                <Overlay  isVisible={helpOverlay} onBackdropPress={()=>setHelpOverlay(false)} overlayStyle={{borderColor:styles.palette._3, borderWidth:3, backgroundColor: styles.palette._4, color: styles.palette._4, borderRadius: 15, width: '65%', height: '20%' }}>
                    <View>
                        <Icon name='close' type='material' onPress={()=>setHelpOverlay(false)} style={{ color: 'black', marginLeft: 'auto' }}></Icon>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, margin: 5, alignSelf: "center", alignContent: 'center', position: 'absolute' }}>HELP</Text>
                        <Divider color="black" style={{marginTop:10, width:"70%", alignSelf:'center'}}/>
                        <Text style={{ textAlign: "center", fontSize: 14, margin: 10 }}>{"Click on the achievement icons to see more details about the achievements"}</Text>
                    </View>
                </Overlay>
            </>
            break;
        case "Info":
            return <QuizHistoryCorrectOrWrong navigation={navigation} setHistoryPage={setHistoryPage}
                answers={props.takenQuiz[historyId].answers}
                artifact={props.takenQuiz[historyId].artifact}
                historyNum={historyNum} setHistoryNum={setHistoryNum}
                questionAndAnswers={props.takenQuiz[historyId].artifact == "Sunflowers" ?
                    questionsSunflowers[historyNum - 1] :
                    questionsGreatWave[historyNum - 1]
                } />
            break;
        default:
            return "Should not happen"
    }
}

const CompletedQuizList = (props) => {
    const scrollViewRef = React.useRef(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (!isFocused) {
            scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
        }
    }, [isFocused]);
    let list = [];
    for (let i = 0; i < props.takenQuiz.length; ++i) {
        list.push(<TouchableHighlight  underlayColor={styles.palette._4} key={i} style={{ ...styles.button, borderColor:styles.palette._3, borderWidth:3, backgroundColor:styles.palette._0, marginTop: i == 0 ? 20 : 5, width: "90%", alignSelf: 'center' }}

            onPress={() => {
                props.setHistoryPage("Info");
                props.setHistoryNum(1);
                props.setHistoryId(i);
            }}>

            <View >
                <Text style={{ color: styles.palette._3, alignSelf: 'center', fontSize: 25, fontWeight: "bold", textAlignVertical: "center" }}>
                    {props.takenQuiz[i].artifact}
                </Text>
                <Text style={{ color: styles.palette._3, alignSelf: 'center', fontSize: 15, textAlignVertical: "center" }}>
                    <Text style={{ color: styles.palette._3, alignSelf: 'center', fontSize: 15, fontWeight: "bold" }}>Date: </Text>{props.takenQuiz[i].date}
                </Text>
                <Text style={{ color: styles.palette._3, alignSelf: 'center', fontSize: 15, textAlignVertical: "center" }}>
                    <Text style={{ color: styles.palette._3, alignSelf: 'center', fontSize: 15, fontWeight: "bold" }}>Score: </Text> {props.takenQuiz[i].score}/3

                </Text>
            </View>
        </TouchableHighlight>
        );
    }
    return <ScrollView ref={scrollViewRef} style={{backgroundColor:styles.palette._5}}>
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
    <View style={{flex:1, backgroundColor:styles.palette._5}}>
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
                <TouchableHighlight underlayColor={styles.palette._3} style={{ ...styles.buttonConfirm}} onPress={() => {
                    if (props.historyNum < 3) {
                        props.setHistoryNum(x => x + 1);
                    } else {
                        props.setHistoryNum(1);
                        props.setHistoryPage("Home");
                    }
                }}>

                    <Text style={styles.textButtonConfirm}>{props.historyNum == 3 ?
                        "BACK TO QUIZ HISTORY" :
                        "NEXT"
                    }</Text>
                </TouchableHighlight>
            </View>
        </View>
    </>
}

export default QuizHistory;