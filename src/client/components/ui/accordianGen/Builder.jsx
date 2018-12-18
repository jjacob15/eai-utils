import React, { Component } from 'react';
import Accordian from '../accordianCard';
import PropTypes from 'prop-types';

class AccordianGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segments: props.segments,
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleEnter(e) {
    this.props.onEnter(e.target.getAttribute('data-id'));
  }
  handleInfo() {}
  handleUpload() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      segments: nextProps.segments,
    });
  }
  render() {
    const { segments } = this.state;
    const allSegments = segments.map(m => ({ id: m.podId, name: m.pod.name }));

    const uniqueSegments = allSegments.reduce((acc, segment) => {
      if (!acc.find(x => x.id === segment.id)) {
        acc.push(segment);
      }
      return acc;
    }, []);

    const img = require('../../../assets/images/avatar-4.jpg');

    return (
      <div>
        {uniqueSegments.map(u => (
          <Accordian key={u.id} title={u.name}>
            <div className="col-md-12 p-l-35 p-r-0">
            {segments.filter(x => x.podId === u.id).map(c => (
              <div className="card card-border-info">
              
              <div key={c.id} className="filter-bar ">
                            <div className="p-l-25 p-t-15 p-r-20">
                                <a className="card-title"><strong>{c.name}</strong></a>
                                <span className="f-right">
                                    <small className="m-r-5">Last Used:</small>
                                    <span className="label label-danger "> 28 January, 2015 </span>
                                    <small className="m-r-5">Added On:</small>
                                    <span className="label label-warning "> 28 January, 2015 </span>
                                </span>                            
                            </div>
              </div>
              <div className="card-block p-b-15 p-t-15">
                            <div className="row">
                                <div className="col-md-9">
                                    <p className="task-detail">
                                        <small>{c.longDesc}</small>
                                    </p>                                    
                                </div>
                                <div className="col-md-3">
                                    <div className="row f-right p-r-12">
                                            <button data-id={c.id}
                              onClick={this.handleEnter} className="btn btn-primary btn-mini m-r-5">Enter</button>
                                            <button data-id={c.id}
                              onClick={this.handleUpload} class="btn btn-default btn-outline-default btn-mini-icon m-r-5">
                                                <i class="icofont icofont-user-alt-3"></i>
                                            </button>
                                            <button data-id={c.id}
                              onClick={this.handleInfo} class="btn btn-default btn-outline-default btn-mini-icon m-r-5">
                                                <i class="icofont icofont-document-folder"></i>
                                            </button>                                                                                                                  
                                    </div>
                                </div>
                            </div>
                </div>
                
                  
              </div>
            ))}
            </div>
          </Accordian>
        ))}
      </div>
    );
  }
}

AccordianGen.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      podId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pod: PropTypes.object.isRequired,
      longDesc: PropTypes.string.isRequired,
    })
  ).isRequired,

  onEnter: PropTypes.func.isRequired,
};

export default AccordianGen;
