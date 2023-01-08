const conditions = (fileSize, chunkSize, percentageOfExcess) => {
    return fileSize < chunkSize && percentageOfExcess >= fileSize / chunkSize * 100;
};

const chunkFiles = (fileSize, chunkCount = 1, percentageOfExcess = 25) => {

    const chunkSize = Math.floor(fileSize / chunkCount);
    let files = [];
    while (fileSize > 0) {
        if (conditions(fileSize, chunkSize, percentageOfExcess)) {
            files[files.length - 1] += fileSize;
            fileSize -= fileSize;
        } else {
            files.push(chunkSize);
            fileSize -= chunkSize;
        };
    };
    return files;
};

module.exports = { chunkFiles };