// @TODO: YOUR CODE HERE!
// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("assets/data/data.csv").then(function(stateData) {

  console.log(stateData);
  
  // Parse the data
  stateData.forEach(function(data) {
  	data.id = +data.id;
  	data.poverty = +data.poverty;
//  	data.povertyMoe = +data.povertyMoe;
  	data.age = +data.age;
//  	data.ageMoe = +data.ageMoe;
  	data.income = +data.income;
//  	data.incomeMoe = +data.incomeMoe;
//  	data.healthcare = +data.healthcare;
//  	data.healthcareLow = +data.healthcareLow;
//  	data.healthcareHigh = +data.healthcareHigh;
  	data.obesity = +data.obesity;
//  	data.obesityLow = +data.obesityLow;
//  	data.obesityHigh = +data.obesityHigh;
  	data.smokes = +data.smokes;
//  	data.smokesLow = +data.datasmokesLow;
//  	data.smokesHigh = +data.datasmokesHigh;
  });
  
  // Create scaling function
  var xLinearScale = d3.scaleLinear()
  	.domain(d3.extent(stateData, d => d.income))
  	.range([0, width]);
  
  var yLinearScale1 = d3.scaleLinear()
  	.domain(d3.extent(stateData, d => d.obesity))
  	.range([height, 0]);
  	
//  var yLinearScale2 = d3.scaleLinear()
//  	.domain([0, d3.max(stateData, d => d.smokes)])
//  	.range([height, 0]);
  	
  // Create the axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale1);
//  var rightAxis = d3.axisRight(yLinearScale2);
  
  // Add x and y axis
  chartGroup.append("g")
  	.attr("transform", `translate(0, ${height})`)
  	.call(bottomAxis);
  
  chartGroup.append("g")
  	.call(leftAxis);
  	
//  chartGroup.append("g")
//	.attr("transform", `translate(${width}, 0)`)
//	.call(rightAxis);
	
  // Append circles to chart so they start at the top
  var circlesGroup = chartGroup.selectAll("circle")
  	.data(stateData)
  	.enter()
  	.append("circle")
  	.attr("r", "15")
  	.attr("fill", "red")
  	.attr("opacity", ".75")
  	  	
  // Event listeners with transitions
//  circlesGroup.on("click", function() {
//  	d3.select(this)
//  	.transition()
//  	.duration(1000)
//  	.attr("r", 20)
//  	.attr("fill", "lightblue");
//  })
//	.on("mouseout", function() {
//		d3.select(this)
//		.transition()
//		.duration(1000)
//		.attr("r", 10)
//		.attr("fill", "red");
//	});
	
  // Transition on page load
  chartGroup.selectAll("circle")
  	.transition()
  	.duration(3000)
  	.attr("cx", d => xLinearScale(d.income))
  	.attr("cy", d => yLinearScale1(d.obesity))
  
  // Trying to add text to the circles CURRENTLY DOES NOT WORK	
  chartGroup.append("text")
  	.text(function(d) {
  		d => d.abbr;
  	});
  
  	
  // Initialize the tooltip
  var toolTip = d3.tip()
  	.attr("class", "d3-tip")
  	.offset([80, -60])
  	.html(function(d) {
  		return(`${d.state}<br>Income: ${d.income}<br>Obesity: ${d.obesity}`);
  	});
  	
  // Create the tooltip in the chartGroup
  chartGroup.call(toolTip);
  
  // Create click event listener to display to diplay tooltip
  circlesGroup.on("click", function(d) {
  	toolTip.show(d, this);
  })
  // create mouseout listener to hide tooltip
  	.on("mouseout", function(d) {
  		toolTip.hide(d);
  	});
  
  // Create axes labels
  chartGroup.append("text")
  	.attr("transform", "rotate(-90)")
  	.attr("y", 0 - margin.left + 50)
  	.attr("x", 0 - (height / 2))
  	.attr("dy", "1em")
  	.attr("class", "aText")
  	.text("Percent of State Obese");
 
  chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
     .attr("class", "aText")
     .text("Obesity vs Income by State");

  
});
