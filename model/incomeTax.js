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

function bruteForceSearchRate(taxRateLevels, income) {
	 if (taxRateLevels === null || taxRateLevels === undefined) {
        return;
    }

    if(taxRateLevels.length == 1) {
        return taxRateLevels[0];
    }
	
	if (income <= taxRateLevels[0]) {
        return taxRateLevels[0];
    }
	
    if (income >= taxRateLevels[taxRateLevels.length - 1]) {
        return taxRateLevels[taxRateLevels.length - 1];
    }
	
	for (i = 0; i < taxRateLevels.length - 1; i++) {
		if (income >= taxRateLevels[i] && income < taxRateLevels[i+1]) {
			return taxRateLevels[i];
		}
	}
}

function binarySearchRate(taxRateLevels, income, beginIndex, endIndex) {
    // taxRateLevels is supposed to be an array

    if (taxRateLevels === null || taxRateLevels === undefined) {
        return;
    }

    if(taxRateLevels.length == 1) {
        return taxRateLevels[0];
    }

    if(taxRateLevels.length == 2 
        && income >= taxRateLevels[0] && income < taxRateLevels[1]) {
        return taxRateLevels[0];
    }

    if (income <= taxRateLevels[beginIndex]) {
        return taxRateLevels[beginIndex];
    }
    if (income >= taxRateLevels[endIndex]) {
        return taxRateLevels[endIndex];
    }

    var midIndex = Math.floor((beginIndex + endIndex) / 2);
    if(income > taxRateLevels[midIndex]) {
        return binarySearchRate(taxRateLevels.slice(midIndex + 1, endIndex + 1), 
        income, midIndex + 1, endIndex);
    }

    if(income < taxRateLevels[midIndex]) {
        return binarySearchRate(taxRateLevels.slice(bginIndex, midIndex + 1), 
        income, beginIndex, midIndex);
    }

}

function QuebecMarginalIncomeTaxRate(federal, quebec) {
    this.federal = federal;
    this.quebec = quebec;
    this.total = federal + quebec;
}

module.exports = function getIncomeTax(income) {
    var taxRates = marginalIncomeTaxRate2017;
    var taxRateLevels = Object.keys(taxRates);

    if (taxRateLevels === null || taxRateLevels === undefined) {
        return;
    }

    var taxRate = bruteForceSearchRate(taxRateLevels, income);
	// var taxRate = binarySearchRate(taxRateLevels, income, 0, taxRateLevels.length - 1);
	return marginalIncomeTaxRate2017[taxRate].total * income / 100;
   
};