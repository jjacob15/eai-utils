import React from 'react';
import chart from './chart';
import withChart from '../ChartWrapper';
import PropTypes from 'prop-types';

class Chart extends React.Component {
  constructor() {
    super();
    this.chartEl = React.createRef();
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this.chartEl);
    }
  }
  render() {
    return <div ref={this.chartEl} style={{ height: '100%' }} />;
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  hideYAxis: PropTypes.bool,
  hideYAxisLabel: PropTypes.bool,
  hideXAxis: PropTypes.bool,
  hideXAxisLabel: PropTypes.bool,
  showYGrid: PropTypes.bool,
  curvedLine: PropTypes.bool,
};

export default withChart(Chart, chart);
