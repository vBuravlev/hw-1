const { setImmediate } = require('node:timers/promises');
const { createCustomWriteStream, intervalFileSize } = require('./helpers/fs-helper.js');
const { timeOutError } = require('./helpers/timeouts.js');
const { createSymbolIterators } = require('./helpers/readline.js');
const { AccumulatorParallels } = require('./classes/accumulators.js');
const Pool = require('./classes/poll-parallel.js');

const createString = (splitter, array) => {
    return `${array.join(splitter)}${splitter}`
};

const intervalErrorMessage = 'The size of the sorted file exceeds the original file';
const timeOutErrorMessage = 'The file is not sorted in the specified time';

const writeSortedFile = async (pathsFiles, outputPath, inputPath, { timeout, interval, chunkSize = 100, splitter = "\n" } = {}) => {

    const writeStream = createCustomWriteStream(outputPath);

    const createStringForWrite = createString.bind(null, splitter);
    const iterators = createSymbolIterators(pathsFiles);

    const pool = await Pool.createPool(iterators);
    const accumulator = AccumulatorParallels.createAccum(chunkSize);

    let intervalSorted = interval && inputPath && outputPath ? await intervalFileSize(inputPath, outputPath, interval, { errorMessage: intervalErrorMessage }) : undefined;
    let timeoutSorted = timeout ? timeOutError(timeout, timeOutErrorMessage) : undefined;

    while (!pool.isEmpty()) {

        const [minIndex, minValue] = pool.getMinimumValue();

        if (minValue) {
            const value = pool.extractMinValueInPool();
            accumulator.addValue(value);
            if (accumulator.isFull()) {
                writeStream.write(createStringForWrite(accumulator.extractAccum()));
                await setImmediate();
            };
        };

        const { value } = await iterators[minIndex].next();
        pool.setPoolItemByIndex(minIndex, value);

    };
    intervalSorted && clearInterval(intervalSorted);
    timeoutSorted && clearTimeout(timeoutSorted);
    writeStream.close();
}





module.exports = { writeSortedFile }