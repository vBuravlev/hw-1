
const { createReadliners } = require('./helpers/readline.js');
const { statFileSize } = require('./helpers/fs-helper.js');

const expectResults = async (inputFilePath, resultFilePath, inputFileRequiredSize) => {

    const fileResultSize = await statFileSize(resultFilePath);
    const fileInputSize = await statFileSize(inputFilePath);
    const deltaInputAndRequiredSizeFiles = inputFileRequiredSize - fileInputSize;
    const deltaInputAndOutputSizeFiles = fileInputSize - fileResultSize;

    const readLine = createReadliners([resultFilePath])[0];

    let previusLine = Infinity;
    let notSortedLine = [];
    let notSortedIndex = [];
    let notSortedLinePrevius = [];
    let notSortedLinePreviusIndex = [];
    let lineCount = 0;

    for await (const line of readLine) {
        if (previusLine) {
            if (!parseInt(line) <= parseInt(previusLine)) {
                notSortedLine.push(line);
                notSortedIndex.push(lineCount);
                notSortedLinePrevius.push(previusLine);
                notSortedLinePreviusIndex.push(lineCount - 1);
            };
        } else {
            previusLine = parseInt(line);
        };
        lineCount++;
    };

    console.dir({ lineCount });
    console.dir({ notSortedLine });
    console.dir({ notSortedIndex });
    console.dir({ notSortedLinePrevius });
    console.dir({ notSortedLinePreviusIndex });
    console.dir({ inputFileRequiredSize });
    console.dir({ deltaInputAndRequiredSizeFiles });
    console.dir({ fileResultSize });
    console.dir({ fileInputSize });
    console.dir({ deltaInputAndOutputSizeFiles });

}

module.exports = { expectResults };