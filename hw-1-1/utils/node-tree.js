const { TAB, LAST, MID, LONG } = require('../configs/graphics');

const buildTree = (nodeType, childsType, delimeter) => (tree, prefix = '') => {
    const treeLastItem = tree.length - 1
    let typeSymbol;

    return tree.reduce((accum, item, index) => {
        const lastNode = (index === treeLastItem);

        typeSymbol = lastNode ? LAST : MID;
        accum += `${prefix}${typeSymbol} ${item[nodeType]}${delimeter}`;

        typeSymbol = lastNode ? TAB : LONG;
        if (item[childsType]) accum += buildTree(nodeType, childsType, delimeter)(item[childsType], `${prefix}${typeSymbol} `);

        return accum;
    }, '');

}

const tree = (sourceObject, delimeter) => {
    let treeRoot = '';
    let nodes = '';
    let nodeType = '';
    let childsType = '';
    for (const [key, value] of Object.entries(sourceObject)) {
        if (!Array.isArray(value)) {
            treeRoot = `${value}${delimeter}`;
            nodeType = key;
        } else {
            childsType = key;
            nodes = buildTree(nodeType, childsType, delimeter)(value);
        };
    }

    return treeRoot.concat(nodes);
}

module.exports = { tree }