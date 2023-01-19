const path = require('node:path');
const { TAB, LAST, MID, LONG } = require('../configs/graphics');
const { readDir } = require('./fs-helpers');


const printCounters = async (counters) => {
    let acc = [];
    for (const [key, value] of Object.entries(counters)) {
        acc.push(`${value} ${key}`);
    }
    const result = '\n' + acc.join(', ');
    return result;
}

const getNode = async (lastPrefix, isLastItem) => {
    let prefix;
    let node = lastPrefix;
    if (isLastItem) {
        prefix = LAST;
        node += TAB;
    } else {
        prefix = MID;
        node += (LONG + TAB);
    }
    return { prefix: prefix, node: node };
}
const printTree = async (dirpath, depth, lastprefix = '', level = 0) => {

    const counters = {
        directories: 0,
        files: 0
    }

    const print = async function (dirpath, depth, lastprefix, level) {
        level++;
        const dir = await readDir(dirpath);
        let output= "";
        for (const dirent of dir) {
            const graphics = await getNode(lastprefix, (dirent.name === dir[dir.length - 1].name));
            const outputLine = `${lastprefix}${graphics.prefix}${dirent.name}\n`;
            if (dirent.isDirectory()) {
                counters.directories++;
                output += outputLine;
                if (depth > level || !depth) await print(path.join(dirpath, dirent.name), depth, graphics.node, level);
            } else {
                counters.files++;
                output += outputLine;
            }
        };
        return { counters, output };
    }
    return print(dirpath, depth, lastprefix, level);
}



module.exports = { printCounters, printTree }