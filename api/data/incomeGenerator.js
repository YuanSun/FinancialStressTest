module.exports = {
    defaultIncomeArr : [50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000],
    generateIncomeArr: function(from, to, step) {
        if(typeof(from) === 'number' && typeof(to) === 'number' && step === 'number') {
            if(from <= to) {
                var arr = [];
                for (int = from; i <= to; i += step) {
                    arr.push(i);
                }

                if (arr.length > 0) {
                    return arr;
                }
            }
        }
    }
}