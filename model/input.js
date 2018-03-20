var incomeTaxRates = [];

// TODO: get tax rate from database


// write here for default use, number is in percent
var marginalIncomeTaxRate2017 = {
    5000:   0,
    11635:  new QuebecMarginalIncomeTaxRate(12.53, 0),
    14890:  new QuebecMarginalIncomeTaxRate(12.53, 15),
    42705:  new QuebecMarginalIncomeTaxRate(12.53, 20),
    45916:  new QuebecMarginalIncomeTaxRate(17.12, 20),
    85405:  new QuebecMarginalIncomeTaxRate(17.12, 24),
    91831:  new QuebecMarginalIncomeTaxRate(21.71, 24),
    103915: new QuebecMarginalIncomeTaxRate(21.71, 25.75),
    142353: new QuebecMarginalIncomeTaxRate(24.22, 25.75),
    202800: new QuebecMarginalIncomeTaxRate(27.56, 25.75)
}


function getIncomeTax(income, taxRates) {
    if(taxRates === null || taxRates === undefined) {
        return;
    }
    var taxRateLevels = Object.keys(taxRates);

    if (taxRateLevels === null || taxRateLevels === undefined) {
        return;
    }

    // Calculation not good.
    var taxLevel = taxRateLevels.sort((a, b) => Math.abs(income - a) - Math.abs(income - b))[0];
}

function QuebecMarginalIncomeTaxRate(federal, quebec) {
    this.federal = federal;
    this.quebec = quebec;
    this.total = federal + quebec;
}