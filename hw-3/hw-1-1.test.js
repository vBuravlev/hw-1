
const { tree } = require('../hw-1-1/utils/node-tree.js');
const { standartObj, itemsEmptyObj, emptyObj, confusedObj } = require('../configs/test-data.js');
const { defaultDelimeter } = require('../hw-1-1/configs/delimeters');


describe('should tree utils', () => {
    test('test standart object', () => {
        const resultTree = tree(standartObj, defaultDelimeter);
        const sample = '1\n├ 2\n| ├ 3\n| └ 4\n└ 5\n  └ 6\n    └ 7\n';
        expect(resultTree).toEqual(sample);
    });

    test('test confused "name" and "item" object', () => {
        const resultTree = tree(confusedObj, defaultDelimeter);
        const sample = "1\n├ 2\n| ├ 3\n| └ 4\n└ 5\n  └ 6\n";
        expect(resultTree).toEqual(sample);
    });

    test('test empty object', () => {
        const resultTree = tree(emptyObj, defaultDelimeter);
        const sample = "";
        expect(resultTree).toEqual(sample);
    });

    test('test itemsEmpty object', () => {
        const resultTree = tree(itemsEmptyObj, defaultDelimeter);
        const sample = "1\n├ 2\n| ├ 3\n| └ 4\n└ 5\n  └ 6\n";
        expect(resultTree).toEqual(sample);
    });

})
