import React, { Component } from 'react';

class VideoEach extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var data = this.props.data;
    var image = data.image;
    var title = data.title;
    return (
      <div className="m-r-30">
        <div className="videoBox" onClick={this.props.openModel.bind(this, this.props.mapid)}>
          <img src={image} alt={title} style={{ height: '100px' }} />
        </div>
        <div className="text-muted text-center">
          <small>{title}</small>
        </div>
      </div>
    );
  }
}

export default VideoEach;
