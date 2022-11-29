// ALGORITHM THAT SORTS A USER'S API OBJECT TRANSACTIONS INTO SINS
// const { response } = require('express');
// const { limbo, lust, gluttony, greed, wrath, heresy, violence, fraud, treachery } = require('./9sins.js');
import { limbo, lust, gluttony, greed, wrath, heresy, violence, fraud, treachery } from './9sins.js';

const d3 = await import("d3");

// ex API_obj
const ex = {
  "accounts": [{ Object }],
  "transactions": [{
    "account_id": "vokyE5Rn6vHKqDLRXEn5fne7LwbKPLIXGK98d",
    "amount": 2307.21,
    "iso_currency_code": "GBP",
    "unofficial_currency_code": null,
    "category": [
      "Shops",
      "Computers and Electronics"
    ],
    "category_id": "19013000",
    "date": "2017-01-03",
    "authorized_date": "2017-01-27",
    "location": {
      "address": "null",
      "city": "null",
      "region": "null",
      "postal_code": "null",
      "country": "null",
      "lat": null,
      "lon": null,
      "store_number": "1235"
    },
    "name": "Apple Store",
    "payment_meta": Object,
    "payment_channel": "in store",
    "pending": false,
    "pending_transaction_id": null,
    "account_owner": null,
    "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
    "transaction_code": null,
    "transaction_type": "place"
  }, {
    "account_id": "XA96y1wW3xS7wKyEdbRzFkpZov6x1ohxMXwep",
    "amount": 78.5,
    "iso_currency_code": "GBP",
    "unofficial_currency_code": null,
    "category": [
      "Food and Drink",
      "Restaurants"
    ],
    "category_id": "13005000",
    "date": "2017-01-29",
    "authorized_date": "2017-01-28",
    "location": {
      "address": "null",
      "city": "null",
      "region": "null",
      "postal_code": "null",
      "country": "null",
      "lat": null,
      "lon": null,
      "store_number": "null"
    },
    "name": "Pret A Manger",
    "payment_meta": Object,
    "payment_channel": "in store",
    "pending": false,
    "pending_transaction_id": null,
    "account_owner": null,
    "transaction_id": "4WPD9vV5A1cogJwyQ5kVFB3vPEmpXPS3qvjXQ",
    "transaction_code": null,
    "transaction_type": "place"
  }],
  "item": { Object },
  "total_transactions": Number,
  "request_id": "45QSn"
}

function calc_percentage(res) {
  res.limbo.percent = res.limbo.score / res.transac_ct;
  res.lust.percent = res.lust.score / res.transac_ct;
  res.gluttony.percent = res.gluttony.score / res.transac_ct;
  res.greed.percent = res.greed.score / res.transac_ct;
  res.wrath.percent = res.wrath.score / res.transac_ct;
  res.heresy.percent = res.heresy.score / res.transac_ct;
  res.violence.percent = res.violence.score / res.transac_ct;
  res.fraud.percent = res.fraud.score / res.transac_ct;
  res.treachery.percent = res.treachery.score / res.transac_ct;
  return res;
}

export default function arbiter(API_obj) {
  let res = {
    'sin': '',
    'transac_ct': 0,
    'limbo': { 'score': 0, 'percent': 0 },
    'lust': { 'score': 0, 'percent': 0 },
    'gluttony': { 'score': 0, 'percent': 0 },
    'greed': { 'score': 0, 'percent': 0 },
    'wrath': { 'score': 0, 'percent': 0 },
    'heresy': { 'score': 0, 'percent': 0 },
    'violence': { 'score': 0, 'percent': 0 },
    'fraud': { 'score': 0, 'percent': 0 },
    'treachery': { 'score': 0, 'percent': 0 }
  };

  // iterate through each purchase obj
  for (let x = 0; x < API_obj.transactions.length; x++) {
    let purchase = API_obj.transactions[x];
    let id = purchase.category_id;

    if (id in limbo) {
      res.limbo.score += 1;
    } else {
      if (id in lust) { res.lust.score += 1 }
      if (id in gluttony) { res.gluttony.score += 1 }
      if (id in greed) { res.greed.score += 1 }
      if (id in wrath) { res.wrath.score += 1 }
      if (id in heresy) { res.heresy.score += 1 }
      if (id in violence) { res.violence.score += 1 }
      if (id in fraud) { res.fraud.score += 1 }
      if (id in treachery) { res.treachery.score += 1 }
    }
    res.transac_ct += 1;
  }
  // CALCULATE PERCENTAGES OF SINS
  res = calc_percentage(res);

  // ASSIGN SINS
  // if treachery.percent >0 -> assign treachery
  // elif fraud.percent >0 -> assign fraud
  // elif violence.percent >0 -> assign violence
  // else compare max between lust, gluttony, greed, wrath, heresy, limbo
  if (res.treachery.percent > 0)
    res.sin = 'treachery';
  else if (res.fraud.percent > 0)
    res.sin = 'fraud';
  else if (res.violence.percent > 0)
    res.sin = 'violence';
  else {
    const max = Math.max(
      res.lust.percent, res.gluttony.percent,
      res.greed.percent, res.wrath.percent,
      res.heresy.percent, res.limbo.percent
    );

    res.sin = (
      max == res.lust.percent ? 'lust' :
        max == res.gluttony.percent ? 'gluttony' :
          max == res.greed.percent ? 'greed' :
            max == res.wrath.percent ? 'wrath' :
              max == res.heresy.percent ? 'heresy' : 'limbo'
    );
  }
  return res;
}


export  function make_svg(transac_obj) {
  // MAKE SVG FILE SCRIPT
  let res = arbiter(ex);
  //console.log(res);

  // set the dimensions and margins of the graph
  var width = 500
  height = 500
  margin = 70

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  let data = {};
  for (const [key, value] of Object.entries(res)) {
    if (typeof (value) === 'object' && value.percent != 0)
      data[key] = value.percent;
  }
  console.log(data);

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(Object.keys(data))
    .range(d3.schemeRdBu[10]);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function (d) { return d.value; })
  var data_ready = pie(d3.entries(data))

  // The arc generator
  var arc = d3.arc()
    .innerRadius(radius * 0.5)         // This is the size of the donut hole
    .outerRadius(radius * 0.8)

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d) { return (color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

  // Add the polylines between chart and labels:
  svg
    .selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function (d) {
      var posA = arc.centroid(d) // line insertion in the slice
      var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

  // Add the polylines between chart and labels:
  svg
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) { console.log(d.data.key); return d.data.key })
    .attr('transform', function (d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
    })
    .style('text-anchor', function (d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
    })
}

//module.exports =  {arbiter, make_svg} ;