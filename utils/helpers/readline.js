const readline = require("node:readline");
const { createCustomReadStream } = require('./fs-helper.js');

const createSymbolIterators = (paths) => {
    let iterators = [];
    for (const pathFile of paths) {
        const readLine = readline.createInterface({ input: createCustomReadStream(pathFile) })[Symbol.asyncIterator]();
        iterators.push(readLine);
    };
    return iterators;
};

const createReadliners = (paths) => {
    let iterators = [];
    for (const pathFile of paths) {
        const readLine = readline.createInterface({ input: createCustomReadStream(pathFile) });
        iterators.push(readLine);
    };
    return iterators;
};

module.exports = { createSymbolIterators, createReadliners };