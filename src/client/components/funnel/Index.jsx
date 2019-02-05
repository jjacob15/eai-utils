import React from 'react';
import Funnel from '../ui/charts/funnel';

const dataset = [
    { label: 'Prospects', value: 1000 },
    { label: 'Qualified prospects', value: 425 },
    { label: 'Needs analysis', value: 200 },
    { label: 'Price quotes', value: 150 },
    { label: 'Negotiations', value: 100 },
    { label: 'Closed sales', value: 90 },
];
class PlayGround extends React.Component {
    constructor() {
        super();
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            data: dataset.slice(0, 1)
        }
    }
    handleAdd() {
        const { data } = this.state;
        let len = data.length;

        if (data.length === dataset.length) len = 0;

        this.setState({
            data: dataset.slice(0, len + 1)
        })
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <button onClick={this.handleAdd} style={{ margin: '10px' }}>Add data</button>
                <Funnel
                    style={{ height: '300px', width: '500px' }}
                    data={data}
                    dynamicHeight={true} //adds relative height for each block based on their values
                    colors={d3.schemeSet1} //you can add any color scheme from a preset collection here https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
                />
            </div>
        );
    }
}

export default PlayGround;
