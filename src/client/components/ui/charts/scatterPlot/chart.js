const chart = {};
chart.margin = { top: 20, right: 60, bottom: 40, left: 10 };
chart.parseDate = d3.timeParse('%m/%d/%Y');
chart.formatDate = d3.timeFormat('%B %-d, %Y');

chart.create = function (el, props) {
  const { hideYAxisLabel, hideXAxisLabel, hideTooltip } = props;
  const height = el.offsetHeight,
    { left, bottom } = chart.margin;

  const svg = d3
    .select(el)
    .append('svg')
    .attr('class', 'chart')
    .attr('width', el.offsetWidth)
    .attr('height', el.offsetHeight)
    .append('g')
    .attr('class', 'scatterChart')
    .attr('transform', 'translate(40,10)');

  svg
    .append('g')
    .attr('class', `x axis ${hideXAxisLabel ? 'hidden' : ''}`)
    .attr('transform', `translate(0,${height - bottom})`);
  svg
    .append('g')
    .attr('class', `y axis ${hideYAxisLabel ? 'hidden' : ''}`)
    .attr('transform', `translate(${left},0)`);

  if (!hideTooltip) {
    // Define the div for the tooltip
    chart.tooltip = d3
      .select(el)
      .append('div')
      .attr('class', 'chart tooltip')
      .style('opacity', 0);
    chart.tooltipText = d => d.obv;
  }
};


chart.draw = function (el, props) {
  let { data, hideXAxis, hideYAxis, pointSize, hideTooltip, squareFit, boundary } = props;

  pointSize = pointSize || 3.5;
  boundary = boundary || 1;
  const width = squareFit ? el.offsetHeight : el.offsetWidth,
    height = el.offsetHeight,
    { top, right, left, bottom } = chart.margin,
    duration = 250;



  const xAxis = d3.scaleLinear()
    .range([left, width - right]);

  const yAxis = d3.scaleLinear()
    .range([top, height - bottom]);

  xAxis.domain(squareFit ? [-boundary, boundary] : d3.extent(data, d => d.x)).nice()
  yAxis.domain(squareFit ? [-boundary, boundary] : d3.extent(data, d => d.y)).nice()

  const svg = d3.select(el).select('.scatterChart');

  svg
    .select('.x.axis')
    .transition()
    .duration(250)
    .call(d3.axisBottom(xAxis))
    .call(g => {
      g.selectAll('.tick line').attr('class', 't');
    });

  svg.select('.x.axis')
    .call(g => {
      g.selectAll('.x.grid').remove();
      g.selectAll('.tick line').filter(d => d == 0)
        .clone()
        .attr('class', 'x grid')
        .attr('stroke-opacity', 0.2)
        .attr('y2', -(height - bottom - top))
    })
    .call(g => (!hideXAxis ? g : g.select('.domain').remove()));;


  svg
    .select('.y.axis')
    .transition()
    .duration(250)
    .call(d3.axisLeft(yAxis))
    .call(g => {
      g.selectAll('.tick line').attr('class', 't');
    });


  svg.select('.y.axis')
    .call(g => {
      g.selectAll('.y.grid').remove();
      g.selectAll('.tick line').filter(d => d == 0)
        .clone()
        .attr('class', 'y grid')
        .attr('stroke-opacity', 0.2)
        .attr('x2', width - left - right)
    })
    .call(g => (!hideYAxis ? g : g.select('.domain').remove()));;

  const dots = svg.selectAll(".dot")
    .data(data);

  dots.enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", xAxis(0))
    .attr("cy", yAxis(0))
    .on('mouseover', function (d) {
      if (hideTooltip) return;

      chart.tooltip
        .transition()
        .duration(200)
        .style('opacity', 0.9);

      chart.tooltip
        .html(chart.tooltipText(d))
        .style('left', d3.event.pageX + 15 + 'px')
        .style('top', d3.event.pageY + 'px');
    })
    .on('mouseout', function (d) {
      if (hideTooltip) return;
      chart.tooltip.transition().style('opacity', 0);
    })
    .classed('withConnector', d => d.hasConnector)
    .transition()
    .duration(duration)
    .attr("r", pointSize)
    .attr("cx", d => xAxis(d.x))
    .attr("cy", d => yAxis(d.y))

  dots
    .classed('withConnector', d => d.hasConnector)
    .transition()
    .duration(duration)
    .attr("cx", d => xAxis(d.x))
    .attr("cy", d => yAxis(d.y))

  dots.exit().transition()
    .duration(duration)
    .remove();


  const connectors = svg.selectAll(".connector")
    .data(data.filter(x => x.hasConnector));

  connectors.enter()
    .append("line")
    .attr("class", "connector")
    .attr("x2", xAxis(0))
    .attr("y2", yAxis(0))
    .attr("x1", xAxis(0))
    .attr("y1", yAxis(0))
    .transition()
    .duration(duration)
    .attr("x1", d => xAxis(d.x))
    .attr("y1", d => yAxis(d.y))

  connectors
    .transition()
    .attr("x2", xAxis(0))
    .attr("y2", xAxis(0))
    .attr("x1", xAxis(0))
    .attr("y1", xAxis(0))
    .duration(duration)
    .attr("x2", xAxis(0))
    .attr("y2", yAxis(0))
    .attr("x1", d => xAxis(d.x))
    .attr("y1", d => yAxis(d.y))

  connectors.exit().remove();

};

export default chart;
