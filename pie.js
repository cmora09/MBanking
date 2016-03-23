// function draw(data){
// 	var width= 800;
// 	var height = 500

// 	var radius = Math.min(width,height)/2;

// 	var color = d3.scale.category10();

// 	var arc = d3.svg.arc()
// 		.outerRadius(radius - 10)
// 		.innerRadius(radius - 40);
	
// 	var pie = d3.layout.pie()
// 		.sort(null)
// 		.value(function(d){ return d.percentage; });

// 	var svg = d3.select(".expenditures")
// 		.attr("width",width)
// 		.attr("height",height)
// 		.append("g")
// 			.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
// 	var donut = svg.selectAll(".arc")
// 		.data(pie)
// 		.enter().append("g")
// 		.attr("class","arc");
// 	console.log(donut);
// 	donut.append("path")
// 		.attr("d", arc)
// 		.style("fill", function(d) { return color(d.data.expenditure); });
	
// 	donut.append("text")
// 		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//     	.attr("dy", ".35em")
//     	.text(function(d) { return d.data.percentage; });

// }

// function parse(data){
// 	d.percentage = +d.percentage;
// 	return d;
// }

// d3.csv("expenditure.csv",parse,draw);


var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 140);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.percentage; });

var svg = d3.select(".expenditures")
	.attr("class", "test")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("expenditure.csv", type, function(error, data) {
	if (error) throw error;

	var donut = svg.selectAll(".arc")
    	.data(pie(data))
    	.enter().append("g")
    	.attr("class", "arc");

	donut.append("path")
    	.attr("d", arc)
    	.style("fill", function(d) { return color(d.data.expenditure); })
    	.style("stroke","white");

    donut.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    	.attr("dy", ".35em")
    	.text(function(d) { return d.data.percentage + "%"; })
    	.style("stroke","white");


    donut.append("text")
    	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    	.attr("dx","-2.5em")
    	.attr("dy", "-2em")
    	.text(function(d) { return d.data.expenditure; })
    	.style("stroke","white");
});

function type(d) {
  d.percentage = +d.percentage;
  return d;
}
