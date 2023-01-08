
class Accumulator {

    constructor(size = 1) {
        this._size = size;
        this._accumulator = [];
    }

    static createAccum() {
        throw new Error('You cannot create objects of an abstract class');
    }

    addValue(value) {
        this._accumulator.push(value);
    }

    getAccum() {
        return this._accumulator;
    }

    extractAccum() {
        let accum = Array.from(this._accumulator);
        this._accumulator.length = 0;
        return accum;
    }

    reset() {
        this._accumulator.length = 0;
    }

    isFull() {
        return this._accumulator.length === this._size;
    }

    isEmpty() {
        return this._accumulator.length === 0;
    }

}


class AccumulatorParallels extends Accumulator {
    constructor(size) {
        super(size)
    }

    static createAccum(size) {
        return new AccumulatorParallels(size);
    }

}

class AccumulatorSplitter extends Accumulator {

    constructor() {
        super()
    }

    static createAccum() {
        return new AccumulatorSplitter();
    }

}

module.exports = { AccumulatorParallels, AccumulatorSplitter }