const path = require('node:path');
const { TAB, LAST, MID, LONG } = require('../configs/graphics');
const { readDir } = require('./fs-helpers');


const printCounters = async (counters) => {
    let acc = [];
    for (const [key, value] of Object.entries(counters)) {
        acc.push(`${value} ${key}`);
    }
    console.log('\n' + acc.join(', '));
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
        for (const dirent of dir) {
            const graphics = await getNode(lastprefix, (dirent.name === dir[dir.length - 1].name));
            const output = `${lastprefix}${graphics.prefix}${dirent.name}`;
            if (dirent.isDirectory()) {
                counters.directories++;
                console.log(output);
                if (depth > level || !depth) await print(path.join(dirpath, dirent.name), depth, graphics.node, level);
            } else {
                counters.files++;
                console.log(output);
            }
        }
        return counters;
    }
    return print(dirpath, depth, lastprefix, level);
}



module.exports = { printCounters, printTree }