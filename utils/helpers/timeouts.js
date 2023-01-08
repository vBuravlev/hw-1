const timeOutError = (timeout, errorMessage) => {
    return setTimeout(() => {
        throw new Error(errorMessage);
    }, timeout);
};

module.exports = { timeOutError }