var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(7);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

// Define the line
var zeeLine = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.balance); });

var color = d3.scale.category10();
// Adds the svg canvas
var svg = d3.select(".balances")
    	.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
// Get the data
d3.csv("data.csv", function(error, data) {
	if (error) throw error;

	color.domain(d3.keys(data[0]).filter(function(key){ return key !== "date"; }));
    data.forEach(function(d) {
        d.date = parseDate(d.date);
});
var accounts = color.domain().map(function(accountName){
	return {
		accountName: accountName,
		values: data.map(function(d){
			return {date: d.date, balance: +d[accountName]};
		})
	};
});

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([
    d3.min(accounts, function(a) { return d3.min(a.values, function(v) {return v.balance;}); }),
    d3.max(accounts, function(a) { return d3.max(a.values, function(v) {return v.balance;}); })
]);
    // Add the valueline path.
var account = svg.selectAll(".blines")
    account.data(accounts)
    .enter().append("g")
    .attr("class","blines")

var aLines = svg.selectAll(".blines").append("path")
        .attr("class", "line")
	    .attr("d", function(d) { return zeeLine(d.values); })
    	.style("stroke", function(d) { return color(d.accountName); });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

//analyzes total length of each line
var totalLength = [aLines[0][0].getTotalLength(), aLines[0][1].getTotalLength(),aLines[0][2].getTotalLength()];

//generate lines for each account
d3.select(aLines[0][0])
    .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] ) 
    .attr("stroke-dashoffset", totalLength[0])
    .transition()
    .duration(2200)
    .ease("linear")
    .attr("stroke-dashoffset", 0);

d3.select(aLines[0][1])
    .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1] )
    .attr("stroke-dashoffset", totalLength[1])
    .transition()
    .duration(2200)
    .ease("linear")
    .attr("stroke-dashoffset", 0);

d3.select(aLines[0][2])
    .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1] )
    .attr("stroke-dashoffset", totalLength[1])
    .transition()
    .duration(2200)
    .ease("linear")
    .attr("stroke-dashoffset", 0);

});

