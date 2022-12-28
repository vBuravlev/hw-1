const path = require('node:path');
const { printCounters, printTree } = require('./utils/node-tree')
const { helper, params } = require('./utils/input-validators');


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

