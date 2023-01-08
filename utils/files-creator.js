const { createRandomNumbersArray } = require('./random-generator.js');
const { createCustomWriteStream } = require('./helpers/fs-helper.js');
const { setImmediate } = require('node:timers/promises');
const { timeOutError } = require('./helpers/timeouts.js');

const createString = (splitter, numbers) => {
    return `${numbers.join(splitter)}${splitter}`;
}

const timeOutErrorMessage = 'The file of the required size was created within the set time';

const createDataFile = async (fileSize, pathFile, { timeout, splitter = '\n', sizeRandomArray, minInt, maxInt } = {}) => {

    const writeStream = createCustomWriteStream(pathFile);

    const createStringForWrite = createString.bind(null, splitter);

    let buffer = 0;
    let chunkSize = 0;
    let counter = 0;
    let string = "";

    let timeoutCreateFile = timeout ? timeOutError(timeout, timeOutErrorMessage) : undefined;

    return new Promise(async (resolve) => {

        while (buffer < fileSize) {
            if (counter === 150) {
                counter = 0;
                await setImmediate();
            };
            const numbers = await createRandomNumbersArray(sizeRandomArray, { minInt, maxInt });
            string = createStringForWrite(numbers);
            chunkSize += Buffer.byteLength(string);
            buffer += chunkSize;
            writeStream.write(string);
            chunkSize = 0;
            string.length = 0;
            counter++;
        }
        timeoutCreateFile && clearTimeout(timeoutCreateFile);
        writeStream.close();
        resolve(pathFile);
    });
};

module.exports = { createDataFile };