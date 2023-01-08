const eventLoop = (interval = 500, maxDelta = 50) => {
    let time1 = Date.now();
    const intervalEventLoop = setInterval(() => {
        let time2 = Date.now();
        let delta = time2 - time1;
        console.log(`EventLoop alive ${delta} ms${delta > interval + maxDelta ? " ALARM! Blocking EventLoop on" : ""}`);
        time1 = time2;
    }, interval).unref();
    return intervalEventLoop;
}

module.exports = { eventLoop };