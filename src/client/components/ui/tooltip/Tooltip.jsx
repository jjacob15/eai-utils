import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import PropTypes from 'prop-types';

const placements = ['top', 'bottom', 'left', 'right'];

class PopperElement extends React.Component {
  render() {
    const { innerRef, style, placement, title } = this.props;
    return (
      <div className="eai-tooltip" ref={innerRef} style={style} data-placement={placement}>
        {title}
        <div className="arrow" />
      </div>
    );
  }
}

class Tooltip extends React.Component {
  constructor() {
    super();
    this.state = {
      isMouseOver: false,
      showPopup: false,
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  mouseEnter() {
    this.setState(
      {
        isMouseOver: true,
      },
      () => this.manageHover(true)
    );
  }
  mouseLeave() {
    this.setState(
      {
        isMouseOver: false,
      },
      () => this.manageHover(false)
    );
  }

  manageHover(val) {
    if (!val && !this.state.isMouseOver) {
      setTimeout(() => {
        if (!this.state.isMouseOver) {
          this.setState({
            showPopup: false,
          });
        }
      }, 450);
    } else {
      setTimeout(() => {
        this.setState({
          showPopup: true,
        });
      }, 100);
    }
  }

  render() {
    const { children, title, placement } = this.props;
    const { showPopup } = this.state;
    const placementPos = placements.indexOf(placement) === -1 ? 'top' : placement;
    return (
      <Manager>
        <Reference>
          {({ ref }) => {
            return (
              <div onMouseOver={this.mouseEnter} onMouseOut={this.mouseLeave} ref={ref} id="parent">
                {children}
              </div>
            );
          }}
        </Reference>
        {showPopup && (
          <Popper placement={placementPos}>
            {({ ref, style, placement }) => {
              return <PopperElement innerRef={ref} title={title} style={style} placement={placement} />;
            }}
          </Popper>
        )}
      </Manager>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  placement: PropTypes.string,
};

export default Tooltip;
