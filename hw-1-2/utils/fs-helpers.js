
const fsPromises = require('node:fs/promises');

const readDir = async (dirpath) => {
    return await fsPromises.readdir(dirpath, { withFileTypes: true });
}

module.exports = { readDir };