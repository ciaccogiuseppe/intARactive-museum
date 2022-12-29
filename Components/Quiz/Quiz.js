import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from "@rneui/themed";
import { TouchableHighlight } from "react-native";
import styles from "../../Globals/Styles";

  const questionsSunflowers = [
  {
  question: "Why are these flowers called 'sunflowers'?",
  options: [
  "Because they turn toward the sun",
  "Because they only grow during summer",
  "Because their shape resembles the sun",
  "Because they only appear when sunny"
  ],
  solution: 0,
  explanation: "The name sunflower comes from the Greek helios 'sun' and anthos 'flower'. Sunflower got its name because the flowers turn toward the sun."
  },
    {
    question: "How long can sunflowers live?",
    options: [
    "From 10 to 20 days",
    "From 8 to 12 weeks",
    "From 5 to 6 months",
    "About a year"
    ],
    solution: 1,
    explanation: "They are tough plants that offer 8-12 weeks of flowers. Rather than sending up a giant flower head, like many of the annual types, these sunflowers form clumps with many smaller flowers."
    },
      {
      question: "How do sunflowers use energy?",
      options: [
      "Generating oxygen and biomass",
      "Creating free electricity",
      "Generating the sunflower fruit",
      "Warming the surrounding environment"
      ],
      solution: 0,
      explanation: "Flowers capture sunlight during the day, they transform the sunlight energy into chemical energy and by consuming carbon dioxide and water, they generate biomass and oxygen. Many flowers also follow the sun in order to maximize their exposure to the light that sustains their life"
      }
  ];

  let givenAnswers = [ // indexes of this array corresponds to that of questions array to keep a mapping without using IDs
  [],
  [],
  [],
  ];



const Quiz = ({navigation}) => {
  const [quizPage, setQuizPage] = useState("Home");
  const [quizNum, setQuizNum] = useState(1);
  const [score, setScore] = useState(0);

  switch (quizPage) {
                                 case "Home":
                                   return <QuizHomePage navigation={navigation} setQuizPage={setQuizPage}/>
                                   break;
                                 case "Question":
                                  return <QuizQuestion navigation={navigation} setQuizPage={setQuizPage}
                                          quizNum={quizNum} setScore={setScore}
                                          givenAnswers={givenAnswers[quizNum-1]}
                                          questionAndAnswers={questionsSunflowers[quizNum-1]}/>
                                   break;
                                 case "Correct":
                                   return <QuizCorrect navigation={navigation} setQuizPage={setQuizPage}
                                                                             quizNum={quizNum} setQuizNum={setQuizNum}
                                                                             questionAndAnswers={questionsSunflowers[quizNum-1]}/>
                                   break;
                                 case "Wrong":
                                   return <QuizWrong navigation={navigation} setQuizPage={setQuizPage}
                                                                             quizNum={quizNum} setQuizNum={setQuizNum}
                                                                             givenAnswers={givenAnswers[quizNum-1]}
                                                                             questionAndAnswers={questionsSunflowers[quizNum-1]}/>
                                   break;
                                 case "Results":
                                   return <QuizResults navigation={navigation} setQuizPage={setQuizPage}
                                                  givenAnswers={givenAnswers[quizNum-1]} score={score} setScore={setScore}
                                                  questionAndAnswers={questionsSunflowers[quizNum-1]}/>
                                   break;
                                 default:
                                   return <QuizHomePage navigation={navigation} setQuizPage={setQuizPage}/>
                               }
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

                           <TouchableHighlight style={{...styles.button, width:"90%", alignSelf:'center'}} onPress={() => props.setQuizPage("Question")}>
                               <Text style={{color:'white', alignSelf:'center'}}>Start</Text>
                           </TouchableHighlight>
                       </>
}

const QuizQuestion = (props) => {
let [answerSelected, setAnswerSelected] = useState(-1); // -1 means no answer selected yet
let options = [];
let disabled = answerSelected === -1;
for (let i=0; i<=3; ++i) {
    options.push(
                               <TouchableHighlight key={i} style={answerSelected === i ?
                               {...styles.quizSelected, width:"90%", alignSelf:'center'} :
                               {...styles.button, width:"90%", alignSelf:'center'}}
                               onPress={() => setAnswerSelected(i)}>
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
                                                      if (answerSelected == props.questionAndAnswers.solution) {
                                                      props.setQuizPage("Correct");
                                                      props.setScore(x => x+1);
                                                      } else {
                                                      props.setQuizPage("Wrong");
                                                      }
                                                      props.givenAnswers.push(answerSelected);
                                                      setAnswerSelected(-1);
                           }}>
                               <Text style={{color:'white', alignSelf:'center'}}>Confirm</Text>
                           </TouchableHighlight>
                       </>
}

const QuizCorrect = (props) => {
return <>
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => props.navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz - Sunflowers
                           </Text>
                       </View>


                           <Text style={{color:'black', marginTop:50, alignSelf:'center', fontSize:40}}>
                               Correct!
                           </Text>
                           <Text style={{color:'black', marginTop:20, alignSelf:'center', fontSize:25}}>
                                  Your answer: {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
                           </Text>
                           <Text style={{color:'black', marginTop:20, alignSelf:'center', fontSize:25}}>
                               {props.questionAndAnswers.question}
                           </Text>
                           <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:25}}>
                               {props.questionAndAnswers.explanation}
                           </Text>

                           <TouchableHighlight style={{...styles.button, width:"90%", alignSelf:'center'}} onPress={() => {
                                                      if (props.quizNum < 3) {
                                                      props.setQuizNum(x => x+1);
                                                      props.setQuizPage("Question");
                                                      } else {
                                                      props.setQuizNum(1);
                                                      props.setQuizPage("Results");
                                                      }
                           }}>
                               <Text style={{color:'white', alignSelf:'center'}}>{props.quizNum == 3 ?
                                                                                "See results" :
                                                                                "Next question"
                                                                                }</Text>
                           </TouchableHighlight>
                       </>
}

const QuizWrong = (props) => {
return <>
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => props.navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz - Sunflowers
                           </Text>
                       </View>


                           <Text style={{color:'black', marginTop:50, alignSelf:'center', fontSize:40}}>
                               Wrong!
                           </Text>
                           <Text style={{color:'black', marginTop:20, alignSelf:'center', fontSize:25}}>
                                  Your answer: {props.questionAndAnswers.options[props.givenAnswers[props.givenAnswers.length - 1]]}
                                  {"\n"}
                                  Correct answer: {props.questionAndAnswers.options[props.questionAndAnswers.solution]}
                           </Text>
                           <Text style={{color:'black', marginTop:20, alignSelf:'center', fontSize:25}}>
                               {props.questionAndAnswers.question}
                           </Text>
                           <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:25}}>
                               {props.questionAndAnswers.explanation}
                           </Text>

                           <TouchableHighlight style={{...styles.button, width:"90%", alignSelf:'center'}} onPress={() => {
                                                      if (props.quizNum < 3) {
                                                      props.setQuizNum(x => x+1);
                                                      props.setQuizPage("Question");
                                                      } else {
                                                      props.setQuizNum(1);
                                                      props.setQuizPage("Results");
                                                      }
                           }}>
                               <Text style={{color:'white', alignSelf:'center'}}>{props.quizNum == 3 ?
                                    "See results" :
                                    "Next question"
                               }</Text>
                           </TouchableHighlight>
                       </>
}


const QuizResults = (props) => {
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
                       <View style={{...styles.secondHeader}}>
                           <TouchableHighlight style={{...styles.button, width:"20%", alignSelf:'center'}} onPress={() => props.navigation.navigate('Home')}>
                           <Text style={{color:'white', alignSelf:'center'}}>Home</Text>
                           </TouchableHighlight>
                           <Text style={{color:'white', alignSelf:'center', fontSize:30}}>
                               Quiz - Sunflowers
                           </Text>
                       </View>


                           <Text style={{color:'black', marginTop:50, alignSelf:'center', fontSize:40}}>
                               Quiz result
                           </Text>
                           <Text style={{color:'black', marginTop:20, alignSelf:'center', fontSize:25}}>
                                  You answered correctly at
                           </Text>
                           <Text style={{color:'black', alignSelf:'center', fontSize:35}}>
                                  {props.score}/3
                           </Text>
                           <Text style={{color:'black', alignSelf:'center', fontSize:25}}>
                                  proposed questions
                           </Text>
                           <Text style={{color:'black', margin:20, alignSelf:'center', fontSize:20}}>
                               {resultCommentMessage}
                           </Text>

                           <TouchableHighlight style={{...styles.button, width:"90%", alignSelf:'center'}} onPress={() => {
                                props.setQuizPage("Home");
                                props.setScore(0);
                                }}>
                               <Text style={{color:'white', alignSelf:'center'}}>Back to quiz home page</Text>
                           </TouchableHighlight>
                       </>
}

export default Quiz;