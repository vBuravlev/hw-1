
//Валидаторы для вводы с клавиатуры

const validateDepthValue = (value) => {
    try {
        if (!Number.isInteger(Number(value))) throw new Error(`Input params "depth" = "${value}" is not integer!`);
        if (value < 1) throw new Error(`Input params "depth" = "${value}" is "<1"!`);
        return value;
    } catch (e) {
        console.error('Error', e);
        return;
    }
}

const validateParamNameDepth = (depthName) => {
    if (depthName === '-d' || depthName === '-depth') return true;
    console.log(`Parameter "depth" "${depthName}" is not defined correctly, please, use help command help`);
    return;
}

const validateDepth = (depthName, value) => {
    if (validateParamNameDepth(depthName)) return validateDepthValue(value);
    return;
}

const helper = (value) => {
    if (value === 'help') {
        console.log(`npm start -- ./test -d 3 - to output the directory tree along the path "./test" with a depth of "3"`);
        console.log(`"-d" or "-depth" is an optional parameter, if not specified, the depth will be the maximum`)
        return true;
    }
    return;
}



module.exports = { validateDepth, helper }