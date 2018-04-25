angular.module('incometax').controller('TaxRateController', TaxRateController);

function TaxRateController(incomeTaxFactory){
    var vm = this;
    var currentTaxYear = '2017';
    vm.title = 'Income Tax Rate for ' + currentTaxYear;
    vm.testQuant = 1;

    incomeTaxFactory.taxRate().then(function(response) {
        // console.log("Here is in the TaxRateController");
        vm.taxRate = response;
    });

    var rates = vm.taxRate;
    var rateArr = Object.keys(rates);

    d3.select('#chart')
        .selectAll('div')
        .data(rateArr)
        .enter()
        .append('div')
        .style("height", (d) => d + 'px');
}