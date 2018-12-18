import React, { Component } from 'react';
import VideoEach from './VideoGalleryItem';
import ReactModal from 'react-modal';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      idToPlay: null,
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(index) {
    this.setState({ idToPlay: index, showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const map = this.props.data;
    var VideoGrid = [];

    for (var i in map) VideoGrid.push(<VideoEach mapid={i} data={map[i]} openModel={this.handleOpenModal} />);

    var object, video;
    if (this.state.showModal) {
      VideoGrid = [];
      object = map[this.state.idToPlay];
      var youtube = object.link.toLowerCase().search('youtube') !== -1 ? true : false;
      if (youtube) {
        var link = 'https://www.youtube.com/embed/' + object.link.split('=')[1] + '?rel=0;&autoplay=1';
        video = (
          <div style={{ height: '315px' }}>
            <iframe src={link} frameBorder="0" height="315px" width="560px" allowFullScreen={true} tabIndex="-1" />
          </div>
        );
      } else {
        video = (
          <div style={{ height: '315px' }}>
            <video height="315px" width="560px" autoplay="autoplay" controls>
              <source src={object.link} type="video/mp4" />
            </video>
          </div>
        );
      }
    }
    return (
      <div className="col-md-12">
        <div className="row">{VideoGrid}</div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Player"
          className="videoModal"
          overlayClassName="videoOverlay"
          style={{ height: '315px', width: '560px' }}>
          <button
            className="btn btn-icon btn-primary"
            style={{ position: 'absolute', top: '-25px', right: '-25px' }}
            onClick={this.handleCloseModal}>
            <i className="icofont icofont-close" style={{ marginRight: '0px' }} />
          </button>
          {video}
        </ReactModal>
      </div>
    );
  }
}
export default Index;
