import React from 'react';
import ScatterPlot from '../ui/charts/scatterPlot';

var data = [
    { obv: 'ND', x: -0.161, y: 0.841, hasConnector: true },
    { obv: 'F/C', x: 0.529, y: 0.211, hasConnector: true },
    { obv: 'NIM', x: -0.417, y: 0.563, hasConnector: true },
    { obv: 'PB', x: -0.748, y: -0.208, hasConnector: true },
    { obv: 'PD', x: 0.883, y: -0.162, hasConnector: true },
    { obv: '<65', x: -0.935, y: -0.132, hasConnector: true },
    { obv: '>65', x: 0.935, y: 0.132, hasConnector: true },
];

class PlayGround extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data
        };
    }
    render() {
        const { data } = this.state;
        return (
            <div style={{ height: '500px' }}>
                <ScatterPlot
                    data={data}
                    style={{ background: 'transparent' }}
                    hideXAxis={false}
                    hideYAxis={false}
                    hideYAxisLabel={false}
                    hideXAxisLabel={false}
                    hideTooltip={false}
                    pointSize={4}
                    squareFit={true}
                    boundary={1}
                />
            </div>
        );
    }
}

export default PlayGround;
