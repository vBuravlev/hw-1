

module.exports = {

    standartObj: {
        "name": 1,
        "items": [{
            "name": 2,
            "items": [{ "name": 3 }, { "name": 4 }]
        }, {
            "name": 5,
            "items": [{ "name": 6, "items": [{ "name": 7 }] }]
        }]
    },

    itemsEmptyObj: {
        "name": 1,
        "items": [{
            "name": 2,
            "items": [{ "name": 3 }, { "name": 4 }]
        }, {
            "name": 5,
            "items": [{ "name": 6, "items": [] }]
        }]
    },


    emptyObj: {

    },

    confusedObj: {
        "items": 1,
        "name": [{
            "items": 2,
            "name": [{ "items": 3, }, { "items": 4 }]
        }, {
            "items": 5,
            "name": [{ "items": 6 }]
        }]
    },


}