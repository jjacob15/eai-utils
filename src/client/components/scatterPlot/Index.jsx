import React from 'react';
import ScatterPlot from '../ui/charts/scatterPlot';

var data = [
    { obv: 'ALB', x: 1.062, y: -0.819 },
    { obv: 'ALS', x: -6.418, y: -1.714 },
    { obv: 'ARZ', x: -0.837, y: 2.065 },
    { obv: 'ARK', x: 1.564, y: -0.349 },
    { obv: 'CAL', x: -2.671, y: 1.025 },
    { obv: 'COL', x: -2.855, y: 1.082 },
    { obv: 'CON', x: 1.113, y: 0.348 },
    { obv: 'DEL', x: 0.282, y: 0.533 },
    { obv: 'DOC', x: -0.162, y: -0.479 },
    { obv: 'FLO', x: 2.919, y: 2.964 },
    { obv: 'GEO', x: -2.703, y: 0.186 },
    { obv: 'HAW', x: -1.971, y: -0.553 },
    { obv: 'IDA', x: -1.355, y: 0.54 },
    { obv: 'ILO', x: -0.555, y: -0.322 },
    { obv: 'IND', x: 0.404, y: -0.563 },
    { obv: 'IOW', x: 2.258, y: -0.571 },
    { obv: 'KAN', x: 0.476, y: -0.904 },
    { obv: 'KEN', x: 0.551, y: -0.664 },
    { obv: 'LOU', x: -0.344, y: -1.811 },
    { obv: 'MAI', x: 2.431, y: 0.778 },
    { obv: 'MAR', x: -1.116, y: 0.45 },
    { obv: 'MAS', x: 1.036, y: 0.162 },
    { obv: 'MIC', x: 0.277, y: -0.377 },
    { obv: 'MIN', x: -0.243, y: 0.134 },
    { obv: 'MIS', x: 0.032, y: -1.408 },
    { obv: 'MIR', x: 1.233, y: -0.309 },
    { obv: 'MON', x: 1.437, y: -0.453 },
    { obv: 'NEB', x: 0.727, y: -0.877 },
    { obv: 'NEV', x: -2.095, y: 4.156 },
    { obv: 'NHS', x: 0.208, y: 1.237 },
    { obv: 'NJY', x: 0.298, y: 0.745 },
    { obv: 'NMX', x: -0.959, y: -0.704 },
    { obv: 'NYK', x: -0.051, y: 0.14 },
    { obv: 'NOC', x: -0.714, y: 0.07 },
    { obv: 'NOD', x: 2.094, y: -1.74 },
    { obv: 'OHI', x: 1.188, y: -0.776 },
    { obv: 'OKL', x: 0.917, y: -0.813 },
    { obv: 'ORE', x: 0.361, y: 1.016 },
    { obv: 'PEN', x: 3.173, y: 0.022 },
    { obv: 'RHI', x: 1.859, y: 0.926 },
    { obv: 'SOC', x: -0.092, y: -0.212 },
    { obv: 'SOD', x: 1.544, y: -0.713 },
    { obv: 'TEN', x: 0.581, y: -0.306 },
    { obv: 'TEX', x: -2.983, y: 0.487 },
    { obv: 'UTA', x: -4.584, y: -1.278 },
    { obv: 'VER', x: 1.237, y: 0.505 },
    { obv: 'VIR', x: -1.702, y: -0.105 },
    { obv: 'WAS', x: -1.372, y: 0.616 },
    { obv: 'WEV', x: 3.679, y: -0.476 },
    { obv: 'WIS', x: 0.93, y: 0.01 },
    { obv: 'WYO', x: -0.09, y: -0.878 },


];

class PlayGround extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data.slice(0, 10),
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        const len = this.state.data.length;
        if (len + 10 > data.length) {
            this.setState({
                data: data.slice(0, 10),
            });
            return;
        }
        let updated = [].concat(this.state.data, data.slice(len, len + 10));
        this.setState({
            data: updated,
        });
    }
    render() {
        const { data } = this.state;
        return (
            <div style={{ height: '500px' }}>
                <button onClick={this.onClick}>Add data</button>
                <ScatterPlot
                    data={data}
                    style={{ background: 'transparent' }}
                    hideXAxis={false}
                    hideYAxis={false}
                    hideYAxisLabel={false}
                    hideXAxisLabel={false}
                    hideTooltip={false}
                    pointSize={4}
                />
            </div>
        );
    }
}

export default PlayGround;
