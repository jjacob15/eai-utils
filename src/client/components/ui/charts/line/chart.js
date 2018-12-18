const chart = {};
chart.margin = {
  height: 30,
  width: 80,
};
chart.create = function(el, props) {
  const { hideYAxisLabel, hideXAxisLabel, hideYAxis, hideXAxis } = props;

  const svg = d3
    .select(el)
    .append('svg')
    .attr('class', 'chart')
    .attr('width', el.offsetWidth)
    .attr('height', el.offsetHeight)
    .append('g')
    .attr('class', 'lineChart')
    .attr('transform', 'translate(40,10)');

  svg.append('path').attr('class', 'line');

  svg
    .append('g')
    .attr('class', `x axis ${hideXAxisLabel ? 'hidden' : ''} ${hideXAxis ? 'hideAxis' : ''}`)
    .attr('transform', `translate(0,${el.offsetHeight - chart.margin.height})`);

  svg.append('g').attr('class', `y axis ${hideYAxisLabel ? 'hidden' : ''}  ${hideYAxis ? 'hideAxis' : ''}`);
};

chart.draw = function(el, props) {
  const { hideYAxis, hideXAxis, showXGrid, showYGrid, data, curvedLine } = props;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  // set the ranges
  chart.x = d3
    .scaleBand()
    .domain(data.map(d => d.key))
    .rangeRound([0, width - chart.margin.width])
    .padding(1);

  chart.y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => +d.value)])
    .range([height - chart.margin.height, 0]);

  // define the line
  chart.valueline = d3
    .line()
    .x(d => chart.x(d.key))
    .y(d => chart.y(+d.value))
    .curve(curvedLine ? d3.curveMonotoneX : d3.curveLinear);

  // Add the valueline path.
  const svg = d3.select(el).select('.chart');

  svg
    .select('.line')
    .transition()
    .duration(250)
    .attr('d', chart.valueline(data));

  svg
    .select('.x.axis') // change the x axis
    .transition()
    .duration(250)
    .call(d3.axisBottom(chart.x));
  svg.select('.x.axis').call(g => g.selectAll('.tick line').attr('class', 't'));

  svg
    .select('.y.axis') // change the y axis
    .transition()
    .duration(250)
    .call(d3.axisLeft(chart.y).ticks(5));

  svg.select('.y.axis').call(g => {
    g.selectAll('.y.grid').remove();
    g.selectAll('.tick line').attr('class', 't');
    if (showYGrid) {
      g.selectAll('.tick line')
        .clone()
        .attr('class', 'y grid')
        .attr('stroke-opacity', 0.2)
        .attr('x2', width - chart.margin.width);
    }
  });
};

export default chart;
