import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";

const Quiz = ({navigation}) => {
  const [isQuizHome, setIsQuizHome] = useState(true);
  const [quizNum, setQuizNum] = useState(1);

  const questionsSunflowers = [
  {
  question: "Why are these flowers called 'sunflowers'?",
  options: [
  "Because they turn toward the sun",
  "Because they only grow during summer",
  "Because their shape resembles the sun",
  "Because they only appear when sunny"
  ],
  solution: 0
  },
    {
    question: "How long can sunflowers live?",
    options: [
    "From 10 to 20 days",
    "From 8 to 12 weeks",
    "From 5 to 6 months",
    "About a year"
    ],
    solution: 1
    },
      {
      question: "How do sunflowers use energy?",
      options: [
      "Generating oxygen and biomass",
      "Creating free electricity",
      "Generating the sunflower fruit",
      "Warming the surrounding environment"
      ],
      solution: 0
      }
  ];

  const quizComponent = isQuizHome ?
    <QuizHomePage navigation={navigation} setIsQuizHome={setIsQuizHome}/> :
    <QuizQuestion navigation={navigation} quizNum={quizNum} setQuizNum={setQuizNum} questionAndAnswers={questionsSunflowers[quizNum-1]}/>;

    return quizComponent
}

const QuizHomePage = (props) => {
return <>
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => props.navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz - Sunflowers
                           </Text>
                       </View>


                           <Text style={{color:'black', marginTop:250, alignSelf:'center', fontSize:40}}>
                               Quiz
                           </Text>
                           <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:30}}>
                                  Test your knowledge{"\n"} about "Sunflowers"
                           </Text>
                           <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:20}}>
                               There will be 3 questions in this quiz {"\n"}
                               Only one answer is correct
                           </Text>

                           <TouchableHighlight style={{...styles.button, width:"90%", alignSelf:'center'}} onPress={() => props.setIsQuizHome(false)}>
                               <Text style={{color:'white', alignSelf:'center'}}>Start</Text>
                           </TouchableHighlight>
                       </>
}

const QuizQuestion = (props) => {
let [answerSelected, setAnswerSelected] = useState(-1); // -1 means no answer selected yet
let options = [];
let disabled = (answerSelected === -1) || props.quizNum >= 3;
for (let i=0; i<=3; ++i) {
    options.push(
                               <TouchableHighlight style={answerSelected === i ?
                               {...styles.quizSelected, width:"90%", alignSelf:'center'} :
                               {...styles.button, width:"90%", alignSelf:'center'}} onPress={() => setAnswerSelected(i)}>
                                   <Text style={{color:'white', alignSelf:'center'}}>{props.questionAndAnswers.options[i]}</Text>
                               </TouchableHighlight>
    )
}

return <>
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => props.navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz - Sunflowers ({props.quizNum})
                           </Text>
                       </View>


                           <Text style={{color:'black', marginTop:100, marginBottom:30, alignSelf:'center', fontSize:30}}>
                               {props.questionAndAnswers.question}
                           </Text>

                            {options}


                           <TouchableHighlight disabled={disabled} style={disabled ?
                           {...styles.buttonDisabled, width:"90%", alignSelf:'center', marginTop:50}:
                           {...styles.button, width:"90%", alignSelf:'center', marginTop:50}} onPress={() => {
                                                      props.setQuizNum(x => x+1);
                                                      setAnswerSelected(false);
                           }}>
                               <Text style={{color:'white', alignSelf:'center'}}>Confirm</Text>
                           </TouchableHighlight>
                       </>
}

export default Quiz;