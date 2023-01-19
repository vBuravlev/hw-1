
module.exports = {

    testData: {
        dirPathTest: './hw-1-2/testdir',
        pathFileTest: "test 16.js",
        MIN_COUNTS_DIRS: 1,
        COUNTS_FILES: 10,
        COUNTS_DIRECTORIES: 6,
        sample: `├───test 1\n├───test 16.js\n└───test 2`,
    },


    arrValidData: [
        { depthNameShort: "-d", valueDepth: 1 },
        { depthNameShort: "-d", valueDepth: 2 },
        { depthNameShort: "-depth", valueDepth: 1 },
        { depthNameShort: "-depth", valueDepth: 2 },
    ],

    arrNotValidData: [
        { depthNameShort: "-d", valueDepth: 0 },
        { depthNameShort: "-d", valueDepth: -1 },
        { depthNameShort: "-d", valueDepth: "a" },
        { depthNameShort: "-d", valueDepth: undefined },
        { depthNameShort: "-depth", valueDepth: 0 },
        { depthNameShort: "-depth", valueDepth: -1 },
        { depthNameShort: "-depth", valueDepth: "a" },
        { depthNameShort: "-depth", valueDepth: undefined },
        { depthNameShort: "d", valueDepth: 1 },
        { depthNameShort: "", valueDepth: 2 },
        { depthNameShort: "depth", valueDepth: 1 },
        { depthNameShort: "-", valueDepth: 2 },
        { depthNameShort: 1, valueDepth: 2 },
    ],


    validValueHelp : 'help',
    notValidValueHelp: '-d',



}