var taxRate = require('../data/incomeTaxRate.js');

module.exports.taxRate2017 = function(req, res) {
    var result = {};
    result.taxRate = taxRate;

    var incomeArr = [];
    var incomeTaxArr = [];
    for (i = 5000; i < 250000; i+= 1000) {
        incomeArr.push(i);
        incomeTaxArr.push(calculateTax(i, taxRate));
    }

    result.incomes = incomeArr;
    result.incomeTaxes = incomeTaxArr;

    res
        .status(200)
        .json(result);
}

module.exports.calculateTax = function(req, res) {
    if(!req.params.income || isNaN(req.params.income)) {
        res
        .status(400)
        .json({
            "message" : "Not a valid income"
        });
    }
    var income = parseFloat(req.params.income);
    
    var incomeTax = calculateTax(income, taxRate);

    if(income) {
        res
        .status(200)
        .json(incomeTax);
    }
    
}

var calculateTax = function(income, taxRate) {
    if(isNaN(income)){
        return {
            "message" : "income is not valid"
        }
    }

    // calculate taxIncome
    var rateArr = Object.keys(taxRate);
    var arrLength = rateArr.length;
    var applicableIncomeTaxRate = {};

    if(income && income < rateArr[0]) {
        applicableIncomeTaxRate = taxRate[rateArr[0]]; 
    }

    if(income && income > rateArr[arrLength - 1]) {
        applicableIncomeTaxRate = taxRate[rateArr[arrLength - 1]];
    }

    for(var i = 0; i < rateArr.length - 1; i++) {
        if(income >= rateArr[i] && income < rateArr[i+1]) {
            applicableIncomeTaxRate = taxRate[rateArr[i]];
        }
    }

    var federalTax = Math.round(income * applicableIncomeTaxRate.federal / 100);
    var quebecTax = Math.round(income * applicableIncomeTaxRate.quebec / 100);
    var totalTax = Math.round((federalTax + quebecTax)*100) / 100;
    var marginalTaxRate = Math.round(totalTax / income * 100) / 100;
    var afterTax = income - totalTax;
    var monthlyDisposable = Math.round(afterTax / 12 * 100) / 100;

    var incomeTax = {
        income: income,
        federal: federalTax,
        quebec: quebecTax,
        totalTax : totalTax,
        marginalTaxRate : marginalTaxRate,
        afterTax : afterTax,
        monthlyDisposable : monthlyDisposable
    };

    return incomeTax;
    
} 