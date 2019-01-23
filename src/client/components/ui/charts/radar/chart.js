import radar from './radar';

const chart = {};


chart.create = function (el, props) {
};


chart.draw = function (el, props) {
  const { data, showMarker, levels, pointRadius, color } = props;
  const height = el.offsetHeight,
    width = el.offsetWidth;

  //Options for the Radar chart, other than default
  var mycfg = {
    w: width,
    h: height,
    levels: levels,
    ExtraWidthX: 200,
    showMarker: showMarker,
    pointRadius: pointRadius,
    color: color
  }

  //Call function to draw the Radar chart
  //Will expect that data is in %'s
  radar.draw(el, data, mycfg);
};


export default chart;
