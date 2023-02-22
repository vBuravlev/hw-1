
const bcrypt = require('bcryptjs');

const createHash = async (value, saltLength = 10) => {
    const salt = await bcrypt.genSalt(saltLength);
    const passHash = await bcrypt.hash(value, salt);
    return passHash;
}

const compareHashValues = async (valueOne, valueTwo) => {
    return bcrypt.compare(valueOne, valueTwo);
}

module.exports = { createHash, compareHashValues };
