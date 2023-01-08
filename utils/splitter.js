
const { waitForSize, createCustomWriteStream, pathFileCreator } = require('./helpers/fs-helper.js');
const { chunkFiles } = require('./helpers/chunk-files.js');
const { setImmediate } = require('node:timers/promises');
const { createReadliners } = require('./helpers/readline.js');
const { AccumulatorSplitter } = require('./classes/accumulators.js');
const { timeOutError } = require('./helpers/timeouts.js');

const createPath = (paths, outputDir, index) => {
    const newPath = pathFileCreator(outputDir, index);
    paths.push(newPath);
    return newPath;
};

const createString = (splitter, array) => {
    return `${array.join(splitter)}${splitter}`
};

const timeOutErrorMessage = 'Small files were not created in the specified time';

const writeChunkFiles = async (files, inputFilePath, outputDir, { timeout, splitter = '\n' } = {}) => {

    const readLine = createReadliners([inputFilePath])[0];

    const accumulator = AccumulatorSplitter.createAccum();

    const pathFiles = [];
    const createNewPath = createPath.bind(null, pathFiles, outputDir);
    const createStringForWrite = createString.bind(null, splitter);

    let index = 0;
    let buffer = 0;
    let chunkSize = 0;

    let timeoutCreateFile = timeout ? timeOutError(timeout, timeOutErrorMessage) : undefined;

    const wtriteToFile = async () => {
        const newPath = createNewPath(index);
        const writeStream = createCustomWriteStream(newPath);
        const sorted = accumulator.extractAccum().sort();
        writeStream.write(createStringForWrite(sorted, splitter));
        buffer = 0;
        index++;
        writeStream.close();
    }

    for await (const line of readLine) {
        chunkSize += Buffer.byteLength(`${line}${splitter}`);
        buffer += chunkSize;
        chunkSize = 0;
        accumulator.addValue(parseInt(line));
        if (buffer >= files[index]) {
            await wtriteToFile();
            await setImmediate();
        };
    }
    
    if (!accumulator.isEmpty()) await wtriteToFile();
    timeoutCreateFile && clearTimeout(timeoutCreateFile);
    return pathFiles;
}


const splitIntoFiles = async (chunkCount, inputFilePath, outputDir, fileSize, { splitter = '\n', percentageOfExcess = 25 } = {}) => {

    const fileSizeStat = await waitForSize(inputFilePath, fileSize);
    const files = chunkFiles(fileSizeStat, chunkCount, percentageOfExcess);
    const pathFiles = await writeChunkFiles(files, inputFilePath, outputDir, { splitter });
    return pathFiles;

};

module.exports = { splitIntoFiles };