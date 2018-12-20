import React from 'react';

function withChart(WrappedComponent, chart) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.chartRef = React.createRef();
      this.resize = this.resize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.resize);
      chart.create(this.chartRef.current, this.props);
      chart.draw(this.chartRef.current, this.props);
    }

    componentWillReceiveProps(nxtProps) {
      if (this.props.data !== nxtProps.data)
        chart.draw(this.chartRef.current, nxtProps);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
    resize() {
      chart.draw(this.chartRef.current, this.props);
    }

    render() {
      return (
        <WrappedComponent
          onRef={item => {
            this.chartRef = item;
          }}
          chart={chart}
          {...this.props}
        />
      );
    }
  };
}

export default withChart;
