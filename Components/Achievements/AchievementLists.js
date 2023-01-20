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

function getNeeded(achievement) {
    let index = getIndexByLevel(achievement.level);
    return pointPerLevel[index];
}

//deprecated
function updateDone(bestAnswers, oldScore) {
    let updateScore = bestAnswers.bestScore - oldScore;
    let newAchieved = [];
    if (bestAnswers.quizID == 1) {
        if ((doneByTheme.vanGogh < pointPerLevel.enjoyer) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.enjoyer))) {
            achievementsList[0].date_obtained = moment().format('MM/DD/YYYY');
            newAchieved.push(achievementsList[0]);
        }
        if ((doneByTheme.vanGogh < pointPerLevel.fan) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.fan))) {
            achievementsList[2].date_obtained = moment().format('MM/DD/YYYY');
            newAchieved.push(achievementsList[2]);
        }
        if ((doneByTheme.vanGogh < pointPerLevel.expert) && ((doneByTheme.vanGogh + updateScore >= pointPerLevel.expert))) {
            achievementsList[5].date_obtained = moment().format('MM/DD/YYYY');
            newAchieved.push(achievementsList[5]);
        }
        doneByTheme.vanGogh += updateScore;
    } else {
        if (bestAnswers.quizID == 2) {
            if ((doneByTheme.nineteenthCentury < pointPerLevel.novice) && ((doneByTheme.nineteenthCentury + updateScore >= pointPerLevel.novice))) {
                achievementsList[21].date_obtained = moment().format('MM/DD/YYYY');
                newAchieved.push(achievementsList[21]);
            }
            if ((doneByTheme.nineteenthCentury < pointPerLevel.expert) && ((doneByTheme.nineteenthCentury + updateScore >= pointPerLevel.expert))) {
                achievementsList[22].date_obtained = moment().format('MM/DD/YYYY');
                newAchieved.push(achievementsList[22]);
            }
            doneByTheme.nineteenthCentury += updateScore;
        }
    }
    return newAchieved;
}

export { getNeeded, updateDone, getIndexByTheme, themes, pointPerLevel, levels };