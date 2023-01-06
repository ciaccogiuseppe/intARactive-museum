export const questionsSunflowers = [
  {
    question: "Why are these flowers called 'sunflowers'?",
    options: [
      "Because they turn toward the sun",
      "Because they only grow during summer",
      "Because their shape resembles the sun",
      "Because they only appear when sunny"
    ],
    solution: 0,
    explanation: "The name sunflower comes from the Greek helios 'sun' and anthos 'flower'.\nSunflower got its name because the flowers turn toward the sun."
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
    explanation: "They are tough plants that offer 8-12 weeks of flowers.\nRather than sending up a giant flower head, like many of the annual types, these sunflowers form clumps with many smaller flowers."
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
    explanation: "Sunflowers capture sunlight during the day, they transform it into chemical energy, and by consuming carbon dioxide and water they generate biomass and oxygen."
  }
];


export var givenAnswersSunflowers = [];
    // when the user complete a quiz it will contain objects like this:
    //{
    //   answers: [0,1,0] // numbers are the indexes of the given questions
    //   date: 30/12/2022 10:45
    //   score: 3
    //}

export let quizAnswered = [];
    // when the user complete a quiz it will contain objects like this:
    //{
    //   quizID: 1, 
    //   correctAnswers: [1,1,0], // 1 if correct, 0 if wrong
    //   bestScore: 2
    //}