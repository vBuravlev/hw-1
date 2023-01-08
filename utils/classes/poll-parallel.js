module.exports = class Pool {
    constructor() {
        this._iterators = [];
        this._pool = [];
        this._minValue = Infinity;
        this._minIndex = 0;
    }

    getPool() {
        return this._pool;
    }

    getPoolSize() {
        return this._pool.length;
    }

    getPoolEntries() {
        return this._pool.entries();
    }

    getPoolItemByIndex(index) {
        return this._pool[index];
    }

    setIterators(iterators) {
        this._iterators = iterators;
    }

    setPoolItemByIndex(index, value) {
        const valueInt = parseInt(value);
        this._pool[index] = valueInt ? valueInt : Infinity;
    }

    static async createPool(iterators) {
        const pool = new Pool();
        pool.setIterators(iterators);
        await pool.setFirstPool(iterators);
        return pool;
    }

    async setFirstPool(iterators) {
        for (const iterator of iterators) {
            const { value } = await iterator.next();
            this._pool.push(parseInt(value));
        };
    }

    getMinimumValue() {
        let minValue = this._minValue;
        let minIndex = this._minIndex;
        for (const [index, item] of this.getPoolEntries()) {
            if (item < minValue) {
                minValue = item;
                minIndex = index;
            }
        };
        this._minValue = minValue;
        this._minIndex = minIndex;

        return [minIndex, minValue];
    }

    extractMinValueInPool() {
        let minValue = this._minValue;
        if (minValue) this._minValue = Infinity;
        return minValue;
    }

    isEmpty() {
        return this._pool.every(item => item === Infinity);
    }

}
