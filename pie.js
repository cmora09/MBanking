var width= 800;
var height = 500

var radius = Math.min(width,height)/2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
	.outerRadius(radius - 10)
	.innerRadius(radius - 10);

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d){ return d.percentage});

function draw(data){
	var svg = d3.select(".expenditures")
		.attr("width",width)
		.attr("height",height)
		.append("g")
			.attr("transform(" + width/2 + "," height/2 + ",");

	var donut = svg.selectAll(".arc")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class","arc");

	donut.append("path")
		.attr("d",arc)
		.style("fill", function(d) return{ color(d.expenditure)})

}

function parse(data){
	d.percentage = +d.percentage;
	return d.percentage;
}

d3.csv("type.csv",parse,draw);