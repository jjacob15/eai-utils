import React, { Component } from 'react';
import cx from 'classnames';
import velocity from 'velocity-animate';

export default class ProfileMenu extends Component {
  constructor() {
    super();
    this.el = React.createRef();
    this.animateMe = this.animateMe.bind(this);
    this.currentState;
  }

  componentWillReceiveProps(nxt) {
    this.animateMe(nxt.status);
  }

  animateMe(status) {
    const el = this.el.current;

    if (this.currentState !== status) {
      if (status === 'entering') velocity(el, 'slideDown', { duration: 250, ease: 'ease-in-out' });
      if (status === 'exiting') velocity(el, 'slideUp', { duration: 250, ease: 'ease-in-out' });

      this.currentState = status;
    }
  }

  render() {
    const c = cx({
      'show-notification': true,
      'profile-notification': true,
    });
    return (
      <ul className={c} ref={this.el}>
        <li>
          <a>
            <i className="ti-settings" />
            Settings
          </a>
        </li>
        <li>
          <a>
            <i className="ti-user" />
            Profile
          </a>
        </li>
        <li>
          <a>
            <i className="ti-email" />
            My Messages
          </a>
        </li>
        <li>
          <a>
            <i className="ti-lock" />
            Lock Screen
          </a>
        </li>
        <li>
          <a>
            <i className="ti-layout-sidebar-left" />
            Logout
          </a>
        </li>
      </ul>
    );
  }
}
