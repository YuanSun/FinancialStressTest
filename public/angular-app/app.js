angular.module('incometax',['ngRoute'])
    .config(config)
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix(''); // deal with #! 
      }]);

function config($routeProvider) {
    $routeProvider
        .when('/taxrate', {
            templateUrl : 'angular-app/tax-list/tax.html',
            controller: TaxRateController,
            controllerAs: 'vm'
        })
        .when('/taxcalculator', {
            templateUrl: 'angular-app/tax-calculator/tax-calculator.html',
            controller: TaxCalculatorController,
            controllerAs: 'vm'
        });
}