import React from 'react';
import velocity from 'velocity-animate';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.el = React.createRef();
  }

  componentWillReceiveProps(nxtProps) {
    this.animateThis(nxtProps.status);
  }

  animateThis(status) {
    const el = this.el;
    if (status === 'entering') velocity(el, 'slideDown', { duration: 350, easing: 'ease' });

    if (status === 'exiting') velocity(el, 'slideUp', { duration: 350, easing: 'ease' });
  }

  render() {
    const { children } = this.props;

    return (
      <div className="panel-collapse in">
        <div className="accordion-content accordioncard-desc" ref={this.el} style={{ display: 'none' }}>
          {children}
        </div>
      </div>
    );
  }
}
