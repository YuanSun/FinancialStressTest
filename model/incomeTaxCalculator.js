var marginalIncomeTaxRate = require('./incomeTaxRate');

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

module.exports = function getIncomeTax(income) {
    var taxRates = marginalIncomeTaxRate;
    var taxRateLevels = Object.keys(taxRates);

    if (taxRateLevels === null || taxRateLevels === undefined) {
        return;
    }

    var taxRate = bruteForceSearchRate(taxRateLevels, income);
	// var taxRate = binarySearchRate(taxRateLevels, income, 0, taxRateLevels.length - 1);
	return marginalIncomeTaxRate[taxRate].total * income / 100;
   
};