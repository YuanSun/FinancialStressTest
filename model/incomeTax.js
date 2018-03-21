var incomeTaxRates = [];

// TODO: get tax rate from database


// write here for default use, number is in percent
var marginalIncomeTaxRate2017 = {
    5000:   new QuebecMarginalIncomeTaxRate(0, 0),
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

function QuebecMarginalIncomeTaxRate(federal, quebec) {
    this.federal = federal;
    this.quebec = quebec;
    this.total = federal + quebec;
}

module.exports = marginalIncomeTaxRate2017;