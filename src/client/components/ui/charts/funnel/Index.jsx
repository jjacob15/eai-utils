import React from 'react';
import PropTypes from 'prop-types';
import D3Funnel from 'd3-funnel';

const options = {
  block: {
    dynamicHeight: false,
    minHeight: 15,
    highlight: true,
    fill: {
      type: 'gradient',
    }
  },
};

class Chart extends React.Component {
  constructor() {
    super();

    this.drawChart = this.drawChart.bind(this)
  }

  componentDidMount() {
    this.drawChart(this.props)
  }

  componentWillReceiveProps(nxtProps) {
    this.drawChart(nxtProps)
  }

  drawChart(props) {
    const { data, dynamicHeight, colors } = props;

    if (dynamicHeight) options.block.dynamicHeight = dynamicHeight
    if (colors) options.block.fill.scale = colors


    const chart = new D3Funnel('#funnel');
    chart.draw(data, options);
  }

  render() {
    const { style } = this.props;

    return <div id="funnel" style={style} >
    </div>;
  }
}

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  dynamicHeight: PropTypes.bool,
  colors: PropTypes.func
};

export default Chart;
