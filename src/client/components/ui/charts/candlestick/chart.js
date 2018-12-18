const chart = {};
chart.margin = { top: 20, right: 60, bottom: 40, left: 10 };
chart.parseDate = d3.timeParse('%m/%d/%Y');
chart.formatDate = d3.timeFormat('%B %-d, %Y');

chart.create = function(el, props) {
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
    .attr('class', 'candleChart')
    .attr('transform', 'translate(40,10)');

  svg
    .append('g')
    .attr('class', `x axis ${hideXAxisLabel ? 'hidden' : ''}`)
    .attr('transform', `translate(0,${height - bottom})`);
  svg
    .append('g')
    .attr('class', `y axis ${hideYAxisLabel ? 'hidden' : ''}`)
    .attr('transform', `translate(${left},0)`);

  svg
    .append('g')
    .attr('stroke-linecap', 'butt')
    .attr('stroke', 'black')
    .attr('class', 'allcandles');

  if (!hideTooltip) {
    // Define the div for the tooltip
    chart.tooltip = d3
      .select(el)
      .append('div')
      .attr('class', 'chart tooltip')
      .style('opacity', 0);
    chart.tooltipText = d =>
      `${chart.formatDate(d.date)}<br/> High: ${Math.round(d.high)}<br/>Open: ${Math.round(
        d.open
      )}<br/>Close: ${Math.round(d.close)}<br/>Low: ${Math.round(d.low)}<br/>`;
  }
};

chart.x = function(data, width) {
  const { left, right } = this.margin;
  return d3
    .scaleBand()
    .domain(d3.timeDay.range(data[0].date, +data[data.length - 1].date + 1))
    .range([left, width - right])
    .padding(0.5);
};

chart.y = function(data, height) {
  const { bottom, top } = this.margin;

  return d3
    .scaleLog()
    .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
    .rangeRound([height - bottom, top]);
};

chart.draw = function(el, props) {
  let { data } = props;
  const { hideYAxis, hideXAxis, showXGrid, showYGrid, hideTooltip } = props;

  const width = el.offsetWidth,
    height = el.offsetHeight,
    { top, right, left, bottom } = chart.margin;

  data = data.map(d => Object.assign(d, { date: typeof d.date === 'string' ? chart.parseDate(d.date) : d.date }));

  d3.select(el)
    .select('svg')
    .attr('width', el.offsetWidth)
    .attr('height', el.offsetHeight);

  const x = chart.x(data, width),
    y = chart.y(data, height);

  // gridlines in x axis function
  const xGridlines = () => {
    return d3.axisBottom(x).ticks(5);
  };

  const chartSvg = d3.select(el).select('.candleChart');

  chartSvg
    .select('.x.axis')
    .transition()
    .duration(250)
    .call(
      d3
        .axisBottom(x)
        .tickValues(d3.timeMonday.every(width > 720 ? 1 : 2).range(data[0].date, data[data.length - 1].date))
        .tickFormat(d3.timeFormat('%-m/%-d'))
    )
    .call(g => {
      g.selectAll('.tick line').attr('class', 't');
    })
    .call(g => (!hideXAxis ? g : g.select('.domain').remove()));

  chartSvg
    .select('.y.axis')
    .transition()
    .duration(250)
    .call(
      d3
        .axisLeft(y)
        .tickFormat(d3.format('$~f'))
        .tickValues(
          d3
            .scaleLinear()
            .domain(y.domain())
            .ticks()
        )
    );

  chartSvg
    .select('.y.axis')
    .call(g => {
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
    .call(g => (!hideYAxis ? g : g.select('.domain').remove()));

  // add the x gridlines
  chartSvg.select('.x.grid').remove();
  if (showXGrid) {
    chartSvg
      .append('g')
      .attr('class', 'x grid')
      .attr('transform', 'translate(0,' + (height + top) + ')')
      .call(
        xGridlines()
          .tickSize(-height)
          .tickFormat('')
      )
      .call(g =>
        g
          .selectAll('line')
          .attr('y1', -(bottom + top))
          .attr('stroke-opacity', 0.2)
      )
      .call(g => g.select('.domain').remove());
  }

  const getClass = d => (d.open > d.close ? 'up' : d.close > d.open ? 'down' : 'default');

  let candles = chartSvg
    .select('.allcandles')
    .selectAll('.candle')
    .data(data);

  const update = candles
    .transition()
    .duration(250)
    .attr('transform', d => `translate(${x(d.date)},0)`);

  update
    .selectAll('.hl')
    .attr('class', d => `hl ${getClass(d)}`)
    .attr('y1', d => y(d.low))
    .attr('y2', d => y(d.high));

  update
    .selectAll('.oc')
    .attr('class', d => `oc ${getClass(d)}`)
    .attr('y1', d => y(d.open))
    .attr('y2', d => y(d.close))
    .attr('stroke-width', x.bandwidth());

  const add = candles
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x(d.date)},0)`)
    .attr('class', 'candle');

  if (!hideTooltip) {
    add
      .on('mouseover', function(d) {
        chart.tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9);

        chart.tooltip
          .html(chart.tooltipText(d))
          .style('left', d3.event.pageX + x.bandwidth() + 'px')
          .style('top', d3.event.pageY + 'px');
      })
      .on('mouseout', function(d) {
        chart.tooltip.transition().style('opacity', 0);
      });
  }

  add
    .append('line')
    .attr('class', d => `hl ${getClass(d)}`)
    .transition()
    .duration(200)
    .attr('y1', d => y(d.low))
    .attr('y2', d => y(d.high));

  add
    .append('line')
    .attr('class', d => `oc ${getClass(d)}`)
    .transition()
    .duration(200)
    .attr('y1', d => y(d.open))
    .attr('y2', d => y(d.close))
    .attr('stroke-width', x.bandwidth());

  candles.exit().remove(); //remove unneeded
};

export default chart;
