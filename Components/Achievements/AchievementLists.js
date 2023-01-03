import moment from "moment";

const levels = {
    enjoyer: "Enjoyer",
    novice: "Novice",
    fan: "Fan",
    expert: "Expert",
};

const pointPerLevel = {
    enjoyer: 15,
    novice: 20,
    fan: 30,
    expert: 50
};

const themes = {
    vanGogh: "Van Gogh",
    monet: "Monet",
    friedrich: "Friedrich",
    canova: "Canova",
    munch: "Munch",
    dali: "Dali",
    egypt: "Egypt",
    impressionism: "Impressionism",
    expressionism: "Expressionism",
    surrealism: "Surrealism",
    eighteenthCentury: "700's",
    nineteenthCentury: "800's",
    twentiethCentury: "900's"
};

let doneByTheme = {
    vanGogh: 48,
    monet: 0,
    friedrich: 0,
    canova: 0,
    munch: 0,
    dali: 0,
    egypt: 38,
    impressionism: 8,
    expressionism: 0,
    surrealism: 0,
    eighteenthCentury: 0,
    nineteenthCentury: 0,
    twentiethCentury: 0
}

function getIndexByTheme(theme) {
    switch (theme) {
        case "Van Gogh": return "vanGogh";
        case "Monet": return "monet";
        case "Friedrich": return "friedrich";
        case "Canova": return "canova";
        case "Munch": return "munch";
        case "Dali": return "dali";
        case "Egypt": return "egypt";
        case "Impressionism": return "impressionism";
        case "Expressionism": return "expressionism";
        case "Surrealism": return "surrealism";
        case "700's": return "eighteenthCentury";
        case "800's": return "nineteenthCentury";
        case "900's": return "twentiethCentury";
        default: return "NotFound";
    }
}

function getIndexByLevel(level) {
    return level.toLowerCase();
}

function getDone(achievement) {
    let index = getIndexByTheme(achievement.theme);
    return doneByTheme[index];
}

function getNeeded(achievement) {
    let index = getIndexByLevel(achievement.level);
    return pointPerLevel[index];
}

function updateDone(bestAnswers, oldScore) {
    let updateScore = bestAnswers.bestScore - oldScore;
    if (bestAnswers.quizID == 1) {
        if ((doneByTheme.vanGogh < pointPerLevel.enjoyer) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.enjoyer))) {
            achievementsList[0].date_obtained = moment().format('MM/DD/YYYY');
        }
        if ((doneByTheme.vanGogh < pointPerLevel.fan) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.fan))) {
            achievementsList[2].date_obtained = moment().format('MM/DD/YYYY');
        }
        if ((doneByTheme.vanGogh < pointPerLevel.expert) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.expert))) {
            achievementsList[5].date_obtained = moment().format('MM/DD/YYYY');
        }
        doneByTheme.vanGogh += updateScore;
    }
}

let achievementsList = [
    {
        id: 1,
        title: "Van Gogh Enjoyer",
        theme: themes.vanGogh,
        level: levels.enjoyer,
        date_obtained: moment("20220610", "YYYYMMDD").calendar()
    }, {
        id: 2,
        title: "Novice Egyptologist",
        theme: themes.egypt,
        level: levels.novice,
        date_obtained: moment("20220628", "YYYYMMDD").calendar()
    }, {
        id: 3,
        title: "Van Gogh Fan",
        theme: themes.vanGogh,
        level: levels.fan,
        date_obtained: moment("20220610", "YYYYMMDD").calendar()
    }, {
        id: 4,
        title: "Expert Egyptologist",
        theme: themes.egypt,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 5,
        title: "Monet Enjoyer",
        theme: themes.monet,
        level: levels.enjoyer,
        date_obtained: null
    }, {
        id: 6,
        title: "Van Gogh Expert",
        theme: themes.vanGogh,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 7,
        title: "Monet Fan",
        theme: themes.monet,
        level: levels.fan,
        date_obtained: null
    }, {
        id: 8,
        title: "Monet Expert",
        theme: themes.monet,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 9,
        title: "Friedrich Enjoyer",
        theme: themes.friedrich,
        level: levels.enjoyer,
        date_obtained: null
    }, {
        id: 10,
        title: "Friedrich Fan",
        theme: themes.friedrich,
        level: levels.fan,
        date_obtained: null
    }, {
        id: 11,
        title: "Friedrich Expert",
        theme: themes.friedrich,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 12,
        title: "Novice Impressionist",
        theme: themes.impressionism,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 13,
        title: "Expert Impressionist",
        theme: themes.impressionism,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 14,
        title: "Canova Enjoyer",
        theme: themes.canova,
        level: levels.enjoyer,
        date_obtained: null
    }, {
        id: 15,
        title: "Canova Fan",
        theme: themes.canova,
        level: levels.fan,
        date_obtained: null
    }, {
        id: 16,
        title: "Canova Expert",
        theme: themes.canova,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 17,
        title: "Munch Enjoyer",
        theme: themes.munch,
        level: levels.enjoyer,
        date_obtained: null
    }, {
        id: 18,
        title: "Munch Fan",
        theme: themes.munch,
        level: levels.fan,
        date_obtained: null
    }, {
        id: 19,
        title: "Munch Expert",
        theme: themes.munch,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 20,
        title: "700's Novice",
        theme: themes.eighteenthCentury,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 21,
        title: "700's Expert",
        theme: themes.eighteenthCentury,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 22,
        title: "800's Novice",
        theme: themes.nineteenthCentury,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 23,
        title: "800's Expert",
        theme: themes.nineteenthCentury,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 24,
        title: "900's Novice",
        theme: themes.twentiethCentury,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 25,
        title: "900's Expert",
        theme: themes.twentiethCentury,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 26,
        title: "Dali Enjoyer",
        theme: themes.dali,
        level: levels.enjoyer,
        date_obtained: null
    }, {
        id: 27,
        title: "Dali Fan",
        theme: themes.dali,
        level: levels.fan,
        date_obtained: null
    }, {
        id: 28,
        title: "Dali Expert",
        theme: themes.dali,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 29,
        title: "Novice Expressionist",
        theme: themes.expressionism,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 30,
        title: "Expert Expressionist",
        theme: themes.expressionism,
        level: levels.expert,
        date_obtained: null
    }, {
        id: 31,
        title: "Novice Surrealist",
        theme: themes.surrealism,
        level: levels.novice,
        date_obtained: null
    }, {
        id: 32,
        title: "Expert Surrealist",
        theme: themes.surrealism,
        level: levels.expert,
        date_obtained: null
    }
];

export { achievementsList, getDone, getNeeded, updateDone };