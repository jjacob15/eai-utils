const chart = {};

chart.create = function (el, props) {
  const svg = d3
    .select(el)
    .append('svg')
    .attr('width', el.offsetWidth)
    // .attr('height', el.offsetHeight)
    .append('g')
    .attr('class', 'dendrogram')
    .attr('transform', 'translate(40,10)');

  const chart = svg.append("g")
    .attr('class', 'chart')
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)

  chart.append("g")
    .attr('class', 'paths')
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)

  chart.append("g")
    .attr('class', 'nodes')
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)

  chart.append('g').attr('class', 'x axis')
};

chart.draw = function (el, props) {
  let width = el.offsetWidth;
  const height = el.offsetHeight;
  let { data, rightToLeft, hideYAxis } = props;

  width = (rightToLeft) ? width - 300 : width;

  const tree = function (data) {
    const root = d3.hierarchy(data)
      .sort((a, b) => (a.height - b.height) || a.data.name.localeCompare(b.data.name));
    root.dx = 10;
    root.dy = width / (root.height + ((rightToLeft) ? 0 : 1));
    return d3.cluster().nodeSize([root.dx, root.dy])(root);
  }

  const root = tree(data);

  const getDepth = function (obj) {
    var depth = 0;
    if (obj.children) {
      obj.children.forEach(function (d) {
        var tmpDepth = getDepth(d)
        if (tmpDepth > depth) {
          depth = tmpDepth
        }
      })
    }
    return 1 + depth
  }

  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  let g = d3.select(el).select('.chart');

  g = g.attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

  const paths = g.select('.paths')
    .selectAll("path")
    .data(root.links());

  const getY = (y) => (!rightToLeft) ? y : width - y;

  paths.attr("d", d => `
        M${getY(d.target.y)},${d.target.x}
        L${getY(d.source.y) + root.dy / 2 * ((rightToLeft) ? -1 : 1)},${d.target.x}
         ${getY(d.source.y) + root.dy / 2 * ((rightToLeft) ? -1 : 1)},${d.source.x}
         ${getY(d.source.y)},${d.source.x}
      `);

  paths.enter().append("path")
    .attr("d", d => {
      return `
        M${getY(d.target.y)},${d.target.x}
        L${getY(d.source.y) + root.dy / 2 * ((rightToLeft) ? -1 : 1)},${d.target.x}
         ${getY(d.source.y) + root.dy / 2 * ((rightToLeft) ? -1 : 1)},${d.source.x}
         ${getY(d.source.y)},${d.source.x}
      `});

  g.select('.nodes').selectAll('g').remove();

  const nodes = g.select('.nodes')
    .selectAll("g")
    .data(root.descendants().reverse())

  var add = nodes.enter().append("g")
    .attr("transform", d => `translate(${getY(d.y)},${d.x})`);

  add.append("circle")
    .attr("fill", d => d.children ? "#555" : "#999")
    .attr("r", 2.5)


  if (rightToLeft) {
    var text = add.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => !d.children ? -6 : 6)
      .text(d => d.data.name);

    text.filter(d => !d.children)
      .attr("text-anchor", "end")

    text.filter(d => d.children)
      .clone(true).lower()
      .attr("stroke", "white")

  } else {

    add.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d.children ? -6 : 6)
      .text(d => d.data.name)
      .filter(d => d.children)
      .attr("text-anchor", "end")
      .clone(true).lower()
      .attr("stroke", "white");
  }

  paths.exit().remove();


  const drawAxis = () => {
    //x axis
    const depth = getDepth(root);
    var x = d3.scaleLinear();
    if (rightToLeft) {
      x.domain([depth, 1])
        .range([0, width]);
    } else {
      x.domain([1, depth])
        .range([0, width - (width / depth)]);
    }

    const logBase = (val) => {
      return Math.log(val) / Math.log(depth);
    }

    var xAxis = d3.axisBottom(x)
      .ticks(4).tickFormat(d => Math.round((logBase(d) * 100)) / 100);

    var bBox = d3.select(el).select('.nodes').node().getBBox();
    // const axisX = (bBox.height - root.dy / 3) > 100 ? bBox.height - root.dy / 3 : bBox.height;
    const axisX = bBox.height / 2 + (root.dx - x0)/2 ;

    g.select(".x.axis")
      .attr("transform", "translate(0," + axisX + ")")
      .call(xAxis);
  }

  if (hideYAxis) {
    g.select('.x.axis').selectAll('*').remove();
  } else {
    drawAxis();
  }

  //artificially set the height
  var dDim = d3.select(el).select('.dendrogram').node().getBBox();
  d3.select(el).select('svg').style('height', `${dDim.height + 30}px`)
};

export default chart;
