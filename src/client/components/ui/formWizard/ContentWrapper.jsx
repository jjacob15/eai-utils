import React from 'react';
import velocity from 'velocity-animate';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
    this.el = React.createRef();
    this.animateMe = this.animateMe.bind(this);
    this.currentMargin = 0;
  }

  componentDidMount() {
    const el = this.el.current;
    const { to, id } = this.props;

    if (to !== id) {
      velocity(el, { marginLeft: 1500 }, { duration: 0 });
      this.hideShowElement(el);
    } else {
      this.hideShowElement(el, true);
    }
  }
  hideShowElement(el, show) {
    el.style.display = show ? 'block' : 'none';
    el.style.float = show ? 'unset' : 'left';
  }

  componentWillReceiveProps(nxtProps) {
    const { status, width } = nxtProps;

    this.animateMe(status);

    //reset all the leftmargins to new width
    if (this.props.width != width) {
      const el = this.el.current;

      if (this.currentMargin !== 0) {
        const newMargin = this.currentMargin > 0 ? width : width / -1;
        velocity(el, { marginLeft: newMargin }, { duration: 0 });
      }
    }
  }

  animateMe(status) {
    const el = this.el.current;
    const { from, to, width, children } = this.props;

    let leftMargin = width < 200 ? 200 : width;

    //invert if you are going back
    leftMargin = to > from ? leftMargin / -1 : leftMargin;

    if (status === 'exiting') {
      velocity(
        el,
        { marginLeft: leftMargin },
        {
          duration: 250,
          easing: 'easeInOutQuad',
          complete: () => {
            this.currentMargin = leftMargin;
          },
        }
      );
      this.hideShowElement(el);
    }
    if (status === 'entering') {
      velocity(
        el,
        { marginLeft: 0 },
        {
          duration: 250,
          easing: 'easeInOutQuad',
          complete: () => {
            this.currentMargin = 0;
          },
        }
      );
      this.hideShowElement(el, true);
    }
  }
  render() {
    const { children } = this.props;
    return (
      <div className="body current" style={{ margin: '20px 20px 20px 0px' }} ref={this.el}>
        {children}
      </div>
    );
  }
}
