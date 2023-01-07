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

export const questionsGreatWave = [
  {
    question: "When was \"The Great Wave off Kanagawa\" created?",
    options: [
      "In 1831",
      "In 1931",
      "In 1856",
      "In 1801"
    ],
    solution: 0,
    explanation: "\"The Great Wave off Kanagawa\" is a woodblock print by Japanese artist Hokusai, created in late 1831 during the Edo period of Japanese History."
  },
  {
    question: "Which series does this print belong to?",
    options: [
      "One Hundred Views of Mount Fuji",
      "Waves",
      "Thirty-six Views of Mount Fuji",
      "Blue Period"
    ],
    solution: 2,
    explanation: "The print is Hokusai's best-known work and the first in his series \"Thirty-six-Views of Mount Fuji\", in which the use of Prussian blue revolutionized Japanese prints."
  },
  {
    question: "Which art movement did the print inspired?",
    options: [
      "Expressionism",
      "Realism",
      "Romanticism",
      "Impressionism"
    ],
    solution: 3,
    explanation: "The composition of \"The Great Wave\" earned to the artist immediate success in Japan and later in Europe, where Hokusai's art inspired works by the Impressionist."
  }
];

export var givenAnswersSunflowers = [];
    // when the user complete a quiz it will contain objects like this:
    //{
    //   answers: [0,1,0] // numbers are the indexes of the given questions
    //   date: 30/12/2022 10:45
    //   score: 3
    //}
    
export var givenAnswersGreatWave = [];

export let quizAnswered = [];
    // when the user complete a quiz it will contain objects like this:
    //{
    //   quizID: 1, 
    //   correctAnswers: [1,1,0], // 1 if correct, 0 if wrong
    //   bestScore: 2
    //}