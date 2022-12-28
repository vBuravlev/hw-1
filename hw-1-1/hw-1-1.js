
const { tree } = require('../hw-1-1/utils/node-tree');
const testObject = require('./test-data/test-obj');
const { defaultDelimeter } = require('./configs/delimeters');

try {
    const result = tree(testObject, defaultDelimeter);
    console.log(result);
} catch (e) {
    console.error('Error', e);
}