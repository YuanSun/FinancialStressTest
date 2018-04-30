angular.module('incometax').controller('TaxRateController', TaxRateController);

function TaxRateController(incomeTaxFactory){
    var vm = this;
    var DEFAULTINCOME = 80000;
    var currentTaxYear = '2017';
    vm.title = 'Income Tax Rate for ' + currentTaxYear;
    vm.testQuant = 1;
    var rates = {};
    var data = [];
    vm.CAPTION = {
        income: 'Income ($)',
        federal : 'Federa Income Tax ($)',
        quebec: 'Quebec Income Tax ($)',
        totalTax:  'Total Income Tax ($)',
        afterTax: 'After Tax Income ($)',
        marginalTaxRate: 'Marginal Tax Rate (%)',
        monthlyDisposable: 'Monthly Disposable Income ($)'
    };

    vm.CHART = {
        FEDERAL: 'federal',
        QUEBEC: 'quebec',
        TOTAL: 'totalTax',
        AFTERTAX: 'afterTax',
        MARGINALRATE: 'marginalTaxRate',
        MONTHLY: 'monthlyDisposable',
        ANNUALMARGINAL: 'annualmarginal',
        MONTHLYMARGINAL: 'monthlymarginal'
    };

    var titlePrefix = "Annual Income vs ";
    vm.CHARTTITLE = {
        FEDERAL: 'Federal Income Tax',
        QUEBEC: 'Quebec Income Tax',
        TOTAL: 'Total Income Tax',
        AFTERTAX: 'After Tax Income',
        MARGINALRATE: 'Marginal Tax Rate',
        MONTHLY: 'Monthly Disposable Income',
        ANNUALMARGINAL: 'Marginal Annual Income Increase',
        MONTHLYMARGINAL: 'Marginal Monthly Income Increase'
    };

    vm.AXISTITLE = {
        FEDERAL: 'Federal Income Tax ($)',
        QUEBEC: 'Quebec Income Tax ($)',
        TOTAL: 'Total Income Tax ($)',
        AFTERTAX: 'After Tax Income ($)',
        MARGINALRATE: 'Marginal Tax Rate (%)',
        MONTHLY: 'Monthly Disposable after Tax ($)',
        ANNUALMARGINAL: 'Marginal Annual Income Increase (%)',
        MONTHLYMARGINAL: 'Marginal Monthly Income Increase (%)'
    };

    vm.enteredIncome = DEFAULTINCOME;
    incomeTaxFactory.taxRate().then(function(response) {
        // console.log("Here is in the TaxRateController");
        vm.taxRate = response.taxRate;
        vm.data = response.incomeTaxes;
        data = vm.data;
        vm.drawChart(vm.CHART.MONTHLY);
    });  
    vm.incrementQuant = function() {
        vm.testQuant++;
    };

    vm.resetQuant = function() {
        vm.testQuant = 1;
    };

    vm.drawChart = function(chartName) {
        if(chartName === null || chartName === undefined) {
            chartName = vm.CHART.MONTHLY;
        }
        var titleKey = (_.invert(vm.CHART))[chartName];
        var axisTitle = (_.invert(vm.CHART))[chartName];

        /**
         * construct d3 chart
         */
        var	margin = {top: 30, right: 20, bottom: 30, left: 70},
            width = 800 - margin.left - margin.right,
            height = 570 - margin.top - margin.bottom;

        var ChartTitle = titlePrefix + vm.CHARTTITLE[titleKey];
        // Set the ranges
        var	x = d3.scaleLinear().range([0, width]);
        var	y = d3.scaleLinear().range([height, 0]);

        // Define the axes
        var	xAxis = d3.axisBottom(x).ticks(10).tickSize(-height, 0, 0);

        var	yAxis = d3.axisLeft(y).ticks(8).tickSize(-width, 0, 0).tickFormat("");

        // Define the line
        var	valueline = d3.line()
            .x(function(d) { return x(d.income); })
            .y(function(d) { return y(d[chartName]); });
            
        // Adds the svg canvas
        var	svg = d3.select("#chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        // d3.csv("data.csv", function(error, data) {
            data.forEach(function(d) {
                //d.date = parseDate(d.date);
                d[chartName] = +d[chartName];
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.income; })).nice();
            y.domain([0, d3.max(data, function(d) { return d[chartName]; })]).nice();
            // Add the valueline path.
            svg.append("path")		// Add the valueline path.
                .attr("class", "line")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")			// Add the X Axis
                .attr("class", "x axis grid")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")			// Add the Y Axis
                .attr("class", "y axis grid")
                .call(yAxis);
            
            svg.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text(vm.AXISTITLE[axisTitle]);

            svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text(ChartTitle);

    };

    vm.updateChart = function(chartName) {
        d3.selectAll("svg").remove();
        vm.drawChart(chartName);
    };

    vm.calculateTax = function(income) {
        incomeTaxFactory.incomeTax(income).then(function(response) {
            vm.calculatedResult = response;
        });
    };

    vm.resultIncome = function() {
        vm.calculatedResult = {};
        vm.enteredIncome = DEFAULTINCOME;
    };
}