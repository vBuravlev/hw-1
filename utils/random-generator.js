
function getRandomInt(min = 10000, max = 9999999999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createRandomNumbersArray = async (size = 1000, { minInt, maxInt } = {}) => {
    return await Promise.all((new Array(size).fill()).map(item => getRandomInt(minInt, maxInt)));
}

module.exports = { createRandomNumbersArray }