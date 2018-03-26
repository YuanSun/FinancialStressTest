module.exports = function() {
    arr = [];
    init = 1000;
    for (i = 0; i < 20; i++) {
        arr.push(init += (i * 100));
    }

    return arr;
}