
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const fs = require('node:fs');

const createDir = async (pathDir, options) => {
    await fsPromises.mkdir(pathDir, options = { recursive: true });
};

const deleteDir = async (pathDir, options) => {
    await fsPromises.rm(pathDir, options = { recursive: true, force: true });
};

const statFileSize = async (pathFile) => {
    return (await fsPromises.stat(pathFile)).size;
};

const waitForSize = async (pathFile, size, { intervalValue = 50, timeoutValue = 120000 } = {}) => {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            const fileSizeStat = await statFileSize(pathFile);
            if (fileSizeStat >= size) {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve(fileSizeStat)
            }
        }, intervalValue);
        const timeout = setTimeout(() => {
            clearInterval(interval);
            console.error('Error', err);
            reject();
        }, timeoutValue);
    });
}

const createCustomReadStream = (file, options) => {
    return fs.createReadStream(file, options);
}

const createCustomWriteStream = (file, options) => {
    return fs.createWriteStream(file, options);
}

const pathDirName = (pathFile) => {
    return path.dirname(pathFile);
}

const pathFileCreator = (pathDir, index) => {
    return path.join(pathDir, `file${parseInt(index) + 1}.txt`);
}

const intervalFileSize = async (pathFileIn, pathFileOut, interval, { delta = 1.05, errorMessage = 'Error: fileOutputSize > fileInputSize' }) => {
    const fileInputSize = await statFileSize(pathFileIn);

    return setInterval(async () => {
        const fileOutputSize = await statFileSize(pathFileOut);
        if (fileOutputSize > fileInputSize * delta) {
            throw new Error(errorMessage);
        }
    }, interval);

}


module.exports = {
    createDir, statFileSize, createCustomReadStream, createCustomWriteStream,
    pathDirName, pathFileCreator, waitForSize, intervalFileSize, deleteDir
};