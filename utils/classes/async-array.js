


module.exports = class AsyncArray extends Array {
    [Symbol.asyncIterator]() {
        let i = 0;

        return {
            next: () => new Promise(resolve => {
                setImmediate(() => resolve({
                    value: this[i],
                    done: i++ === this.length
                }));
            })
        };
    }
}
