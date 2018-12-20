import box from './box';

const chart = {};
chart.margin = { top: 20, right: 50, bottom: 20, left: 30 };
chart.parseDate = d3.timeParse('%m/%d/%Y');
chart.formatDate = d3.timeFormat('%B %-d, %Y');

chart.create = function (el, props) {
  const height = el.offsetHeight,
    width = el.offsetWidth,
    { left, bottom, right, top } = chart.margin;

  const svg = d3.select(el)
    .append("svg")
    .attr("width", width + left + right)
    .attr("height", height)
    .attr("class", "chart")
    .append("g")
    .attr("class", "boxChart")
    .attr("transform", "translate(" + left + "," + top + ")")

  svg.append("g")
    .attr("class", "y axis")
    .attr('transform', `translate(${left},0)`)

  svg.append("g")
    .attr("class", "x axis")

};


chart.draw = function (el, props) {
  let { left, bottom, right, top } = chart.margin;
  let height = el.offsetHeight - top - bottom,
    width = el.offsetWidth;

  const labels = true;
  let { data, showYGrid, hideYAxis, hideYAxisLabel, hideXAxis, hideXAxisLabel } = props;
  const duration = 300;

  let min = Infinity,
    max = -Infinity;
  let formattedData = [];
  data.forEach((d, i) => {
    formattedData[i] = []
    formattedData[i][0] = d.name;
    formattedData[i][1] = [];
  })



  const count = data[0].value.length;

  for (let i = 0; i < count; i++) {
    let rowVals = [];
    data.forEach((b, di) => {
      let val = Math.floor(b.value[i]);
      rowVals.push(val);
      formattedData[di][1].push(val)
    })

    const rowMax = Math.max.apply(null, rowVals);
    const rowMin = Math.min.apply(null, rowVals);

    if (rowMax > max) max = rowMax;
    if (rowMin < min) min = rowMin;
  }


  const pct = 0.025;
  min = min - min * pct;
  max = max + max * pct;

  var boxChart = d3.box()
    .whiskers(iqr(1.5))
    .height([height - bottom - top - 20, 0])
    .domain([min, max])
    .duration(duration)
    .showLabels(labels);

  // the x-axis
  var x = d3.scaleBand()
    .domain(formattedData.map(function (d) { return d[0] }))
    .range([left, width - right])
    .padding(0.75);

  var xAxis = d3.axisBottom(x)

  // the y-axis
  var y = d3.scaleLinear()
    .domain([min, max]).nice()
    .range([height - top - bottom, top]);

  var yAxis = d3.axisLeft(y)

  const svg = d3.select(el).select('.boxChart');
  const boxes = svg.selectAll('.box')
    .data(formattedData);

  boxes.attr("transform", function (d) { return "translate(" + x(d[0]) + "," + top + ")"; })
    .call(boxChart.width(x.bandwidth()));

  boxes.enter().append("g")
    .attr("transform", function (d) { return "translate(" + x(d[0]) + "," + top + ")"; })
    .attr("class", 'box')
    .call(boxChart.width(x.bandwidth()));

  boxes.exit().remove();

  // draw y axis
  const yAxisSvg = svg.select(".y.axis");

  yAxisSvg.classed('hidden', hideYAxisLabel)

  yAxisSvg
    .transition()
    .duration(duration)
    .call(yAxis);

  yAxisSvg.call(g => {
    g.selectAll('.y.grid').remove();
    g.selectAll('.tick line').attr('class', 't');
    if (showYGrid) {
      g.selectAll('.tick line')
        .clone()
        .attr('class', 'y grid')
        .attr('stroke-opacity', 0.2)
        .attr('x2', width - left - right);
    }
  })
    .call(g => (!hideYAxis ? g : g.select('.domain').remove()))


  // draw x axis	
  const xAxisSvg = svg.select(".x.axis");
  xAxisSvg.classed('hidden', hideXAxisLabel)

  xAxisSvg.attr("transform", "translate(0," + (height - top - bottom) + ")")
    .transition()
    .duration(duration)
    .call(xAxis)

  xAxisSvg.call(g => (!hideXAxis ? g : g.select('.domain').remove()))


};


// Returns a function to compute the interquartile range.
function iqr(k) {
  return function (d, i) {
    var q1 = d.quartiles[0],
      q3 = d.quartiles[2],
      iqr = (q3 - q1) * k,
      i = -1,
      j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}


export default chart;
