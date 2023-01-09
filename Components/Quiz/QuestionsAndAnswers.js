export const questionsSunflowers = [
  {
    question: "Where did Van Gogh paint them?",
    options: [
      "Arles",
      "Paris",
      "Marseille",
      "Lyon"
    ],
    solution: 0,
    explanation: "Van Gogh painted them at Arles. This artwork belongs to \"the Arles Sunflowers\", in particular to the group \"the Repetitions\"."
  },
  {
    question: "When did Van Gogh paint this series?",
    options: [
      "1887",
      "1889",
      "1898",
      "1878"
    ],
    solution: 1,
    explanation: "\"Sunflowers\" is the title of two series of still life paintings by Vincent van Gogh.\nThe first series, executed in Paris in 1887, depicts the flowers lying on the ground, while the second set, made a year later (1888-1889) in Arles, shows a bouquet of sunflowers in a vase."
  },
  {
    question: "What technique did the artist use?",
    options: [
      "Impasto",
      "Sfumato",
      "Pointillism",
      "Oil sketch"
    ],
    solution: 0,
    explanation: "Impasto: it is a technique used in painting, where paint is laid on an area of the surface thickly, usually thick enough that the brush or painting-knife strokes are visible.\nPaint can also be mixed right on the canvas. When dry, impasto provides texture; the paint appears to be coming out of the canvas."
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

export var givenAnswersArtifact = [];
    // when the user complete a quiz it will contain objects like this:
    //{
    //   artifact: "Sunflowers"
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