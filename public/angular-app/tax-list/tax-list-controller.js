angular.module('incometax').controller('TaxRateController', TaxRateController);

function TaxRateController(incomeTaxFactory){
    var vm = this;
    var currentTaxYear = '2017';
    vm.title = 'Income Tax Rate for ' + currentTaxYear;
    vm.testQuant = 1;
    var rates = {};
    incomeTaxFactory.taxRate().then(function(response) {
        // console.log("Here is in the TaxRateController");
        vm.taxRate = response.taxRate;

        /**
         * construct d3 chart
         */
        var data = {};
        data.incomes = response.incomes;
        data.incomeTaxes = response.incomeTaxes;
        
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;
        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
        var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

        // define line
        var valueLine = d3.svg.line()
            .x(function(d) {
                return x(d.close);
            })
            .y(function(d) {
                return y(d.close);
            });
        
        // adds the svg canvas
        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", heigh + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // get the data
    });  
 
}