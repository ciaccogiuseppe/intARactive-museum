const TIPS_DATA = [
    {
        key: '1',
        title: 'SCAN A PIECE OF ART TO START YOUR JOURNEY',
        image: require('./../../res/default.jpg')
    },
    {
        key: '2',
        title: 'LEARN SOMETHING NEW',
        image1: require('./../../res/default.jpg'),
        description1: 'Explore the artifact in Augmented Reality',
        image2: require('./../../res/default.jpg'),
        description2: 'Get short descriptions whenever you want'
    },
    {
        key: '3',
        title: 'THERE IS MORE TO INTERACT WITH',
        image1: require('./../../res/default.jpg'),
        description1: 'Scan points on the artifact to get even more information',
        image2: require('./../../res/default.jpg'),
        description2: 'Videos, comparisons, additional information to learn even more',
        items: [
            { icon: require('./../../res/default.jpg'), label: "Video" },
            { icon: require('./../../res/default.jpg'), label: "Comparison" },
            { icon: require('./../../res/default.jpg'), label: "Additional information" }
        ]
    },
    {
        key: '4',
        title: 'TEST AND IMPROVE YOUR KNOWLEDGE WITH CHALLENGING QUIZZES',
        image1: require('./../../res/default.jpg'),
        description1: 'Evaluate your knowledge by answering to questions specific to the artifact',
        image2: require('./../../res/default.jpg'),
        description2: 'Track your progress by unlocking new achievements',
    }
];

export { TIPS_DATA }