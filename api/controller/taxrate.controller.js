var taxRate2017 = require('../data/incomeTaxRate.js');

module.exports.taxRate2017 = function(req, res) {
    res
        .status(200)
        .json(taxRate2017);
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
    
    // calculate taxIncome
    var rateArr = Object.keys(taxRate2017);
    var arrLength = rateArr.length
    var applicableIncomeTaxRate = {};

    if(income && income < rateArr[0]) {
        applicableIncomeTaxRate = taxRate2017[rateArr[0]]; 
    }

    if(income && income > rateArr[arrLength - 1]) {
        applicableIncomeTaxRate = taxRate2017[rateArr[arrLength - 1]];
    }

    for(var i = 0; i < rateArr.length - 1; i++) {
        if(income >= rateArr[i] && income < rateArr[i+1]) {
            applicableIncomeTaxRate = taxRate2017[rateArr[i]];
        }
    }

    var federalTax = Math.round(income * applicableIncomeTaxRate.federal / 100);
    var quebecTax = Math.round(income * applicableIncomeTaxRate.quebec / 100);
    var totalTax = federalTax + quebecTax;
    var marginalTaxRate = Math.round(totalTax / income * 100) / 100;
    var afterTax = income - totalTax;
    var incomeTax = {
        income: income,
        federal: federalTax,
        quebec: quebecTax,
        totalTax : totalTax,
        marginalTaxRate : marginalTaxRate,
        afterTax : afterTax
    };

    if(income) {
        res
        .status(200)
        .json(incomeTax);
    }
    
}