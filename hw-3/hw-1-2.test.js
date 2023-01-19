const { printCounters, printTree } = require('../hw-1-2/utils/node-tree.js');
const { validateDepth, helper } = require('../hw-1-2/utils/input-validators.js');
const { readDir } = require('../hw-1-2/utils/fs-helpers.js');

const { testData: { dirPathTest, pathFileTest, MIN_COUNTS_DIRS, COUNTS_FILES, COUNTS_DIRECTORIES, sample },
    arrValidData, arrNotValidData, validValueHelp, notValidValueHelp } = require('../configs/test-data-utils.js');

/* const mockFsPromises = require('node:fs/promises');
const mockFs = require('node:fs');
const mockValue = [
    { name: 'hw-1-1.test.js', type: 1 },
    { name: pathFileTest, type: 1 },
    { name: '__mocks__', type: 2 }
]

jest.mock('node:fs/promises');
jest.mock('node:fs');
mockFsPromises.readdir.mockResolvedValue(mockValue);
mockFs.Dirent.mockReturnValue(true); */

describe('should tree utils', () => {
    describe('should readDir test', () => {
        beforeAll(async () => {
            this.result = await readDir(dirPathTest);
        })

        test('the result array contains more than 1 element', async () => {
            expect(this.result.length).toBeGreaterThanOrEqual(MIN_COUNTS_DIRS);
        });

        test('the result array contains the file name', async () => {
            const arrayRes = this.result.map(el => el.name);
            expect(arrayRes.join(',')).toMatch(pathFileTest);
        });
    });

    describe('should printTree and printCounters test', () => {
        beforeAll(async () => {
            const { counters, output } = await printTree(dirPathTest);
            this._counters = counters;
            this._output = output;
            this.countersString = await printCounters(this._counters);
        });

        test('test checking the compliance of the output', async () => {
            expect(this._output).toMatch(sample);
        });

        test('test the number of files in the folder is greater than or equal to 1', async () => {
            expect(this._counters.files).toBeGreaterThanOrEqual(COUNTS_FILES);
        });

        test('test the number of directories in the folder is greater than or equal to', async () => {
            expect(this._counters.directories).toEqual(COUNTS_DIRECTORIES);
        });

        test('test ', async () => {
            const resultString = `\n${COUNTS_DIRECTORIES} directories, ${COUNTS_FILES} files`;
            expect(this.countersString).toMatch(resultString);
        });

    });

    describe('should validateDepth test', () => {

        test.each(arrValidData)('test checking that "true" is returned for valid input data', async ({ depthNameShort, valueDepth }) => {
            const result = validateDepth(depthNameShort, valueDepth);
            expect(result).toBeTruthy();
        });

        test.each(arrNotValidData)('test checking that "false" is returned for no valid input data', async ({ depthNameShort, valueDepth }) => {
            const result = validateDepth(depthNameShort, valueDepth);
            expect(result).toBeUndefined();
        });

    });

    describe('should helper test', () => {

        test('test valid value', async () => {
            const result = helper(validValueHelp);
            expect(result).toBeTruthy();
        });

        test('test not valid value', async () => {
            const result = helper(notValidValueHelp);
            expect(result).toBeUndefined();
        });


    });


})
