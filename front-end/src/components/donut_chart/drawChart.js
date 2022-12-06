//import React from 'react';
import * as d3 from 'd3';

const drawChart = (element, data) => {
  const colors = ["#f1b0b0", "#ea9999", "#e06666", "#df3333", "#cc0000","#be0505", "#990000", "#660000", "#510000"];
  const boxSize = 500;

  d3.select(element).select("svg").remove(); // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

  const arcGenerator = d3.arc().innerRadius(0).outerRadius(250);

  // DATA FORMAT
  // data = [ 
  //    { sin: 'limbo', value: 10 }, 
  //    { sin: 'lust', value: 2 },
  // ]
  const pieGenerator = d3.pie().value((d) => d.value);
  const arcs = svg.selectAll().data(pieGenerator(data)).enter();

  // colors of pie chart
  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d, i) => colors[i % data.length]);

  // append text labels
  arcs
    .append("text")
    .attr("text-anchor", "middle")
    .text((d) => `$(d.data.sin)%`) // label text
    .style("fill", "#fff") // label color
    .style("font-size", "30px") // label size
    .attr("transform", (d) => {
      const [x,y] = arcGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    });
};

export default drawChart;