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
        vm.data = response.incomeTaxes;
        var data = vm.data;
        var	margin = {top: 30, right: 20, bottom: 30, left: 70},
            width = 800 - margin.left - margin.right,
            height = 570 - margin.top - margin.bottom;

        var ChartTitle = "Income vs After Tax Monthly Disposable Income";
        // Set the ranges
        var	x = d3.scaleLinear().range([0, width]);
        var	y = d3.scaleLinear().range([height, 0]);

        var y2 = d3.scaleLinear().range([height, 0]);
        // Define the axes
        var	xAxis = d3.axisBottom(x).ticks(10);

        var	yAxis = d3.axisLeft(y).ticks(10);

        var yAxis2 = d3.axisRight(y2).ticks(8);

        // Define the line
        var	valuelineMonth = d3.line()
            .x(function(d) { return x(d.income); })
            .y(function(d) { return y(d.monthlyDisposable); });
        
        var valuelineTotalTax = d3.line()
            .x(function(d) {return x(d.income);})
            .y(function(d) {return y(d.totalTax);});
            
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
                d.monthlyDisposable = +d.monthlyDisposable;
                d.totalTax = +d.totalTax;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.income; })).nice();
            y.domain([0, d3.max(data, function(d) { return d.monthlyDisposable; })]).nice();
            y2.domain([0, d3.max(data, function(d) { return d.totalTax; })]).nice();
            // Add the valuelineMonth path.
            svg.append("path")		// Add the valuelineMonth path.
                .attr("class", "line")
                .attr("d", valuelineMonth(data));

            // svg.append("path")
            //     .attr("class", "line")
            //     .style("stroke", "crimson")
            //     .attr("d", valuelineTotalTax(data));
            
            // Add the X Axis
            svg.append("g")			// Add the X Axis
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")			// Add the Y Axis
                .attr("class", "y axis")
                .call(yAxis);

            // svg.append("g")
            //     .attr("class", "y2 axis")
            //     .call(yAxis2);
            
            svg.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Monthly Disposable after Tax ($)");

            svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text(ChartTitle);
    });  
 
}