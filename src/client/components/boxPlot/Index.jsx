import React from 'react';
import BoxPlot from '../ui/charts/boxPlot';

function randomArray(k) {
  return function () {
    let arr = [];
    let i = 10;
    while (i > 0) {
      arr.push(Math.random() * k)
      i--;
    }
    return arr;
  }
}

class PlayGround extends React.Component {
  constructor() {
    super();

    this.resetRandomGen();
    this.state = {
      data: [this.getData(1)],
    };
    this.onClick = this.onClick.bind(this);
    this.randomArray;
  }

  getData(i) {
    return { name: `Brand ${i}`, value: this.randomArray() }
  }
  resetRandomGen() {
    this.randomArray = randomArray(Math.random() * 100000)
  }

  onClick(e) {
    const len = this.state.data.length;
    if (len === 15) {
      this.resetRandomGen();
      this.setState({
        data: [this.getData(1)]
      })
      return;
    }
    this.setState((prev) => ({
      data: [...prev.data, this.getData(len + 1)]
    }));
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{ height: '500px' }}>
        <button onClick={this.onClick}>Add data</button>
        <BoxPlot
          data={data}
          style={{ background: 'transparent' }}
          showYGrid={true}
          hideYAxis={true}
          hideYAxisLabel={false}
          hideXAxisLabel={false}
          hideXAxis={false}
        />
      </div>
    );
  }
}

export default PlayGround;
