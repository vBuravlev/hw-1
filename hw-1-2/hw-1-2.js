const path = require('node:path');
const { printCounters, printTree } = require('./utils/node-tree')
const { helper, validateDepth } = require('./utils/input-validators');

const params = {
    help: process.argv[2],
    path: process.argv[2],
    depth: validateDepth(process.argv[3], process.argv[4])
};

(async () => {

    try {
        if (!helper(params.help)) {
            console.log(path.basename(params.path));
            const counters = await printTree(params.path, params.depth);
            await printCounters(counters);
        }
    } catch (e) {
        console.error('Error', e);
    }

})();

