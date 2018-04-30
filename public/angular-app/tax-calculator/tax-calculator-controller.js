angular.module('incometax').controller('TaxCalculatorController', TaxCalculatorController);

function TaxCalculatorController(incomeTaxFactory){
    var vm = this;
    var DEFAULTINCOME = 80000;
    var currentTaxYear = '2017';
    vm.title = 'Calculator Income Tax of Year ' + currentTaxYear;
    vm.CAPTION = {
        income: 'Income ($)',
        federal : 'Federa Income Tax ($)',
        quebec: 'Quebec Income Tax ($)',
        totalTax:  'Total Income Tax ($)',
        afterTax: 'After Tax Income ($)',
        marginalTaxRate: 'Marginal Tax Rate (%)',
        monthlyDisposable: 'Monthly Disposable Income ($)'
    };
    vm.enteredIncome = undefined;

    vm.calculateTax = function(income) {
        incomeTaxFactory.incomeTax(income).then(function(response) {
            vm.calculatedResult = response;
        });
    };

    vm.resultIncome = function() {
        vm.calculatedResult = {};
        vm.enteredIncome = undefined;
    };


}