const TIPS_DATA = [
    {
        key: '1',
        title: 'SCAN A PIECE OF ART\nTO START YOUR JOURNEY',
        image: require('./../../res/maintips.png')
    },
    {
        key: '2',
        title: 'LEARN SOMETHING NEW',
        image1: require('./../../res/nav1tips.png'),
        description1: 'Explore the artifact in Augmented Reality',
        image2: require('./../../res/desctips.png'),
        description2: 'Get short descriptions whenever you want'
    },
    {
        key: '3',
        title: 'THERE IS MORE TO INTERACT WITH',
        image1: require('./../../res/navitips.png'),
        description1: 'Scan points on the artifact for a deeper interaction',
        image2: require('./../../res/comptips.png'),
        description2: 'Videos, comparisons, additional information to learn even more',
        items: [
            { icon: require('./../../res/video2.png'), label: "Video" },
            { icon: require('./../../res/compare2.png'), label: "Comparison" },
            { icon: require('./../../res/description2.png'), label: "Additional information" }
        ]
    },
    {
        key: '4',
        title: 'IMPROVE YOUR KNOWLEDGE',
        image1: require('./../../res/quiztips.png'),
        description1: 'Test your knowledge with challenging quizzes',
        image2: require('./../../res/achievtips.png'),
        description2: 'Track your progress by unlocking new achievements',
    }
];

export { TIPS_DATA }