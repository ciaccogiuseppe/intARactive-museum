const RNFS = require('react-native-fs');

const pathStrings = {
    path_doneByTheme: RNFS.DocumentDirectoryPath + '/storage_doneByTheme.json',
    path_givenAnswers: RNFS.DocumentDirectoryPath + '/storage_givenAnswers.json',
    path_quizAnswered: RNFS.DocumentDirectoryPath + '/storage_quizAnswered.json'
};

const readFromFile = async (path) => {
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
        const objJSON = JSON.stringify(obj);
        await RNFS.writeFile(path, objJSON, 'utf8');
    }
    catch (error) {
        console.log(error);
        return "ERROR in writing: " + path;
    }
};

export { pathStrings, readFromFile, writeToFile }
