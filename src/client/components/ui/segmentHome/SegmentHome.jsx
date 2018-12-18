import React from 'react';
import Builder from '../accordianGen';
import PropTypes from 'prop-types';

class SegmentHome extends React.Component {
  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
  }
  handleEnter(id) {
    this.props.onEnter(id);
  }

  render() {
    const { segments, title, icon } = this.props;
    return (
      <div>
        
          <div class="card bg-c-green notification-card m-b-30" style={{position: 'relative'}}>
            <div className="segment-image-container" >
              <a className="segment-image">                    
                    <img className="seg-img img-radius" src={icon} />
              </a>
            </div>
            <div class="card-block">
                    <div class="row align-items-center p-t-10 p-b-10">
                        <div class="col-md-3 text-right">
                            <h3 className="m-r-10">{title}</h3>                        
                        </div>
                        <div class="col-md-5 notify-cont text-left">
                            <h6 className="p-l-20"> Build statistical models</h6>
                            <span className="p-l-20"> Lorem ipsum Lorem ipsum Lorem ipsum</span>
                        </div>  
                        <div class="col-md-4">                  
                        <div className="row f-right">
                            <div className="icon-list-demo">
                            <i className="fa fa-sort-amount-down" />
                            </div>
                            <div className="icon-list-demo m-l-10">
                            <i className="fa fa-th" />
                            </div>
                            <div className="icon-list-demo m-l-10">
                            <i className="fa fa-search" />
                            </div>
                        </div>
                        </div>                    
                    </div>
                </div>                  
          </div>
           

        
          <div className="m-t-25">
            <Builder segments={segments} onEnter={this.handleEnter} />
          </div>
        
      </div>
    );
  }
}

SegmentHome.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      podId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pod: PropTypes.object.isRequired,
      longDesc: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,

  onEnter: PropTypes.func.isRequired,
};

export default SegmentHome;
