// Dimensions of sunburst.
var widthSB = 500;
var heightSB = 500;
var radiusSB = Math.min(widthSB, heightSB) / 2;
var currSB="rul";

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 75, h: 30, s: 3, t: 10
};


var colors = {
  "Ruler": "rgb(106, 159, 239)",
  "Main Religion": "rgb(90, 134, 199)",
  "Religion": "rgb(71, 106, 160)",
  "Culture": "rgb(58, 89, 134)",
  "Province": "rgb(45, 70, 108)"
};

var colors2 = {
    "Main Religion": "rgb(106, 159, 239)",
    "Religion": "rgb(90, 134, 199)",
    "Ruler": "rgb(71, 106, 160)",
    "Culture": "rgb(58, 89, 134)",
    "Province": "rgb(45, 70, 108)"
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var visSB = d3.select("#sunBurstchart").append("svg:svg").attr("id", "svgSB")
    .attr("width", widthSB)
    .attr("height", heightSB)
    .append("svg:g")
    .attr("id", "containerSunburst")
    .attr("transform", "translate(" + widthSB / 2 + "," + heightSB / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radiusSB * radiusSB])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.



function switchSBData(mySBdata){

    currSB = mySBdata;
    
    d3.select("#containerSunburst").remove();

    visSB = d3.select("#svgSB")
        .append("svg:g")
        .attr("id", "containerSunburst")
        .attr("transform", "translate(" + widthSB / 2 + "," + heightSB / 2 + ")");

    partition = d3.layout.partition()
        .size([2 * Math.PI, radiusSB * radiusSB])
        .value(function(d) { return d.size; });

    arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y); })
        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


    if (mySBdata == "rel"){
        createVisualization(buildHierarchy(sunburstRel));
    }
    else if (mySBdata == "rul"){
        createVisualization(buildHierarchy(sunburstRul));
    }
       
}


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {
console.debug("creating visSB with json:",json)
  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
    visSB.append("svg:circle")
      .attr("r", radiusSB)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = visSB.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { 
                   
          return colorAreas[d.name]; })
      .style("opacity", 1)
      .style("cursor","pointer")
      .on("mouseover", mouseover)
      .on("click", centerToClick);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#containerSunburst").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.

function centerToClick() {
    var lastBread=$("#trail").find("text:last").html();
    var breadIndex=$("#trail").find("text").length;
    
    if (currSB=="rel"){
        switch(breadIndex){
            case (2):
                goTomRel(lastBread);
                break;
            case (3):
                goToRel(lastBread);
                break;
            case (4):
                goToRuler(lastBread);
                break;
            case (5):
                goToCul(lastBread);
                break;
            case (6):
                goToAll(lastBread);
                break;
        }
    }
    else{
        switch(breadIndex){
            case (2):
                goToRuler(lastBread);
                break;
            case (3):
                goTomRel(lastBread);
                break;
            case (4):
                goToRel(lastBread);
                break;
            case (5):
                goToCul(lastBread);
                break;
            case (6):
                goToAll(lastBread);
                break;
        }
    }
    
    
}
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
    d3.select("#sunBurstchart").selectAll("path")
      .style("opacity", 0.8);

  // Then highlight only those that are an ancestor of the current segment.
    visSB.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
    d3.select("#sunBurstchart").selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
    d3.select("#sunBurstchart").selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
    d3.select("#trail").remove();
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", widthSB)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colorAreas[d.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };
   d3.select("#legendSB").remove();
    
    if(currSB=="rul"){
        var legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(colors).length * (li.h + li.s))
            .attr("id","legendSB");
    }
    else {
        var legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(colors2).length * (li.h + li.s))
            .attr("id","legendSB");
    }

    if(currSB=="rul"){
  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });
    } else {
    var g = legend.selectAll("g")
        .data(d3.entries(colors2))
        .enter().append("svg:g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * (li.h + li.s) + ")";
        });      
    }
  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
    
    
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};
