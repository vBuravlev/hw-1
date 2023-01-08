//node --max-old-space-size=50 runner.js

const { createDataFile } = require('./utils/files-creator.js');
const { splitIntoFiles } = require('./utils/splitter.js');
const { writeSortedFile } = require('./utils/parallel-reader.js');
const { eventLoop } = require('./utils/helpers/eventLoop.js');
const { createDir, deleteDir } = require('./utils/helpers/fs-helper.js');
const { expectResults } = require('./utils/expect-result.js');

const REQUIRED_FILE_SIZE = 104857600; //104857600 - 100 МБ
const CHUNK_FILES = 50 //количество файлов на которое нужно разбить большой файл
const PATH_FILE = './testFiles/100mb.txt';
const PATH_RESULT_FILE = "./testFiles/result.txt";
const PATH_DIR = './testFiles/';

(async () => {
    console.time('program');
    console.log('Start');
    const intervalEventLoop = eventLoop(interval = 500, maxDelata = 50);

    await deleteDir(PATH_DIR);
    await createDir(PATH_DIR);
    const pathBigFile = await createDataFile(REQUIRED_FILE_SIZE, PATH_FILE, { timeout: 200000 });
    const pathsSmallFiles = await splitIntoFiles(CHUNK_FILES, pathBigFile, PATH_DIR, REQUIRED_FILE_SIZE, { timeout: 200000 });
    await writeSortedFile(pathsSmallFiles, PATH_RESULT_FILE, PATH_FILE, { timeout: 200000, interval: 10000 });
    await expectResults(PATH_FILE, PATH_RESULT_FILE, REQUIRED_FILE_SIZE);

    intervalEventLoop && clearInterval(intervalEventLoop);
    console.log('Finish');
    console.timeEnd('program');

})();

