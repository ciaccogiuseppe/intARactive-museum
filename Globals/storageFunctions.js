import { themes, levels } from '../Components/Achievements/AchievementLists'
import moment from 'moment';
import { PermissionsAndroid } from 'react-native';
const RNFS = require('react-native-fs');

const pathStrings = {
    path_doneByTheme: RNFS.ExternalDirectoryPath  + '/storage_doneByTheme.json',
    path_givenAnswers: RNFS.ExternalDirectoryPath  + '/storage_givenAnswers.json',
    path_quizAnswered: RNFS.ExternalDirectoryPath  + '/storage_quizAnswered.json',
    path_achievementsList: RNFS.ExternalDirectoryPath  + '/storage_achievementsList.json'
};


const readFromFile = async (path) => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } catch (err) {
        console.warn(err);
      }
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if(!readGranted || !writeGranted) {
        console.log('Read and write permissions have not been granted');
        return;
      }

    try {
        const fileContent = await RNFS.readFile(path, 'utf8');
        const obj = JSON.parse(fileContent);
        return obj;
    }
    catch (error) {
        console.log(error);
        return "ERROR in reading: " + path;
    }
};

const writeToFile = async (path, obj) => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } catch (err) {
        console.warn(err);
      }
      const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
      const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if(!readGranted || !writeGranted) {
        console.log('Read and write permissions have not been granted');
        return;
      }
    try {
        const objJSON = JSON.stringify(obj);
        await RNFS.writeFile(path, objJSON, 'utf8');
    }
    catch (error) {
        console.log(error);
        return "ERROR in writing: " + path;
    }
};

const givenAnswersArtifact = [];
// when the user complete a quiz it will contain objects like this:
//{
//   artifact: "Sunflowers"
//   answers: [0,1,0] // numbers are the indexes of the given questions
//   date: 30/12/2022 10:45
//   score: 3
//}

const quizAnswered = [
    {
        quizID: 1,
        correctAnswers: [0, 0, 0], // 1 if correct, 0 if wrong
        bestScore: 0
    },
    {
        quizID: 2,
        correctAnswers: [0, 0, 0], // 1 if correct, 0 if wrong
        bestScore: 0
    }
];

const doneByTheme = {
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

const achievementsList = [
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

const resetFiles = () => {
    writeToFile(pathStrings.path_givenAnswers, givenAnswersArtifact).then(success => { console.log("RESET: givenAnswersArtifact"); });
    writeToFile(pathStrings.path_quizAnswered, quizAnswered).then(success => { console.log("RESET: quizAnswered"); });
    writeToFile(pathStrings.path_doneByTheme, doneByTheme).then(success => { console.log("RESET: doneByTheme"); });
    writeToFile(pathStrings.path_achievementsList, achievementsList).then(success => { console.log("RESET: achievementsList"); })
}

export { pathStrings, readFromFile, writeToFile, resetFiles, achievementsList, doneByTheme, givenAnswersArtifact, quizAnswered }
