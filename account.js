//dimensions of svg.accounts
var margin = {top: 90, right: 50, bottom: 100, left: 100}
var outerWidth = 700;
var outerHeight = 350;
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;

//establishes columns to pull info from and sits max pixels
var rMax = 90;
var xColumn = "accountType";
var rColumn = "balance";
var color = d3.scale.category10();
var cColumn = "accountType";

//pixel space for circles that will be generated.
var xScale = d3.scale.ordinal().rangePoints([0, innerWidth]);
var rScale = d3.scale.sqrt().range([0,rMax]);



function draw(data){
	//set domains/data space
	xScale.domain( data.map( function (d){ return d[xColumn]; }));
	rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);
	color.domain(data.map(function (d){ return d[cColumn]; }));
	
	var tip = d3.tip()
		.offset([-10, 0])
		.attr('class', 'd3-tip')
		.html(function(d) {return "<strong><span style='color:#94FF6E'>Balance:</strong></span> <span style='color:white'>" + d.balance  + " USD" + "</span>";
 		});
	// creates svg element in .accounts and adds a g element so circles are in view.
	var svg = d3.select(".accounts")
		.attr("width", outerWidth)
		.attr("height", outerHeight)
		.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //tooltip generated
	
	svg.call(tip);
    //enter phase where data is bound to each circle and added to the var svg and adds svg circles.
	var circle = svg.selectAll("circle").data(data);
	circle.enter().append("circle")
		.attr("r",  function(d){ return rScale(d[rColumn]); })
		.attr("cx", function(d){ return xScale(d[xColumn]); })
		.attr("cy", innerHeight/2)
		.on("mouseover",tip.show)
		.on("mouseout", tip.hide)
		.style("fill", function(d){ return color(d[cColumn]); })
		.style("stroke","black")
		.style("stroke-width","2px");

    //follows same logic of circles. binds data to text and creates svg text elements
	var text = svg.selectAll("text").data(data);
	text.enter().append("text")
		.attr("dx", function(d){ return xScale(d[xColumn])-24; })
		.attr("dy", innerHeight/2)
		.text(function(d) {return (d[xColumn]); })
		.style("stroke", "white");

	circle.exit().remove();
	text.exit().remove();
}

function parse(d){
	d.balance = +d.balance;
	return d;
}

d3.csv("account.csv", parse, draw);

