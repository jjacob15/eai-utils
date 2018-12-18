import React from 'react';
import Dendrogram from '../ui/charts/dendrogram';

var data = {
    name: "flare",
    children: [{
        name: "analytics",
        children: [{
            name: "cluster",
            children: [{
                name: "types",
                children: [{
                    name: "AgglomerativeCluster",
                    size: 3938
                }, {
                    name: "HierarchicalCluster",
                    size: 6714
                }]
            }, {
                name: "MergeEdge",
                size: 743
            }]
        }, {
            name: "graph",
            children: [{
                name: "BetweennessCentrality",
                children: [
                    {
                        name: "LinkDistance",
                        size: 5731
                    }, {
                        name: "MaxFlowMinCut",
                        size: 7840
                    }
                ]
            }, {
                name: "ShortestPaths",
                size: 5914
            }]
        }, {
            name: "optimization",
            children: [{
                name: "AspectRatioBanker",
                size: 7074
            }]
        }]
    }, {
        name: "animate",
        children: [{
            name: "Easing",
            size: 17010
        }, {
            name: "FunctionSequence",
            size: 5842
        }, {
            name: "interpolate",
            children: [{
                name: "ArrayInterpolator",
                size: 1983
            }, {
                name: "ColorInterpolator",
                size: 2047
            }]
        }, {
            name: "ISchedulable",
            size: 1041
        }, {
            name: "Parallel",
            size: 5176
        }, {
            name: "Pause",
            size: 449
        }, {
            name: "Scheduler",
            size: 5593
        }, {
            name: "Sequence",
            size: 5534
        }, {
            name: "Transition",
            size: 9201
        }, {
            name: "Transitioner",
            size: 19975
        }, {
            name: "TransitionEvent",
            size: 1116
        }, {
            name: "Tween",
            size: 6006
        }]
    }, {
        name: "data",
        children: [{
            name: "converters",
            children: [{
                name: "Converters",
                size: 721
            }, {
                name: "DelimitedTextConverter",
                size: 4294
            }, {
                name: "GraphMLConverter",
                size: 9800
            }, {
                name: "IDataConverter",
                size: 1314
            }, {
                name: "JSONConverter",
                size: 2220
            }]
        }, {
            name: "DataField",
            size: 1759
        }, {
            name: "DataSchema",
            size: 2165
        }, {
            name: "DataSet",
            size: 586
        }, {
            name: "DataSource",
            size: 3331
        }, {
            name: "DataTable",
            size: 772
        }, {
            name: "DataUtil",
            size: 3322
        }]
    }, {
        name: "display",
        children: [{
            name: "DirtySprite",
            size: 8833
        }, {
            name: "LineSprite",
            size: 1732
        }, {
            name: "RectSprite",
            size: 3623
        }, {
            name: "TextSprite",
            size: 10066
        }]
    }, {
        name: "flex",
        children: [{
            name: "FlareVis",
            size: 4116
        }]
    }, {
        name: "physics",
        children: [{
            name: "DragForce",
            size: 1082
        }, {
            name: "GravityForce",
            size: 1336
        }, {
            name: "IForce",
            size: 319
        }, {
            name: "NBodyForce",
            size: 10498
        }, {
            name: "Particle",
            size: 2822
        }, {
            name: "Simulation",
            size: 9983
        }, {
            name: "Spring",
            size: 2213
        }, {
            name: "SpringForce",
            size: 1681
        }]
    }]
};

class PlayGround extends React.Component {
    constructor() {
        super();
        this.state = {
            data: this.getInitial(),
            hideYAxis: true,
            rightToLeft: false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleAxis = this.handleAxis.bind(this);
        this.handleDirection = this.handleDirection.bind(this);
    }
    getInitial() {
        return { name: 'flare', children: data.children.slice(0, 1) };
    }
    handleAdd(e) {
        const len = this.state.data.children.length;
        if (len === 6) {
            this.setState({
                data: this.getInitial()
            })
            return;
        }

        let updated = [].concat(this.state.data.children, data.children.slice(len, len + 1));
        this.setState({
            data: { ...data, children: updated },
        });
    }
    handleAxis() {
        this.setState((prev) => ({
            hideYAxis: !prev.hideYAxis
        }))
    }
    handleDirection() {
        this.setState((prev) => ({
            rightToLeft: !prev.rightToLeft
        }))
    }
    render() {
        const { data, hideYAxis, rightToLeft } = this.state;
        return (
            <div>
                <button onClick={this.handleAdd} style={{ marginRight: '10px' }}>Add data</button>
                <button onClick={this.handleAxis} style={{ marginRight: '10px' }}>Show/Hide axis</button>
                <button onClick={this.handleDirection} style={{ marginRight: '10px' }}>Switch direction</button>
                <Dendrogram
                    style={{ background: 'transparent' }}
                    data={data}
                    hideYAxis={hideYAxis}
                    rightToLeft={rightToLeft}
                />
            </div>
        );
    }
}

export default PlayGround;
