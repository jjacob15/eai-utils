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
    const { style } = this.props;
    let styleProps = {
      height: '100%',
    };
    if (style) {
      styleProps = Object.assign(styleProps, style);
    }
    return <div ref={this.chartEl} style={styleProps} />;
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  showMarker: PropTypes.bool,
  levels:PropTypes.number, // number of circles,
  color: PropTypes.array,
  pointRadius:PropTypes.number //radius of the points
};

export default withChart(Chart, chart);
