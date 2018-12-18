/**
 * Created by John.Doe on 7/11/2018.
 */
import React from 'react';
import cx from 'classnames';
import velocity from 'velocity-animate';
import { Transition } from 'react-transition-group';
import ProfileMenu from './ProfileMenu';
import FullScreen from './FullScreen';
import Notification from './NotificationIcons';

class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.el = React.createRef();
    this.animateMe = this.animateMe.bind(this);

    this.currentState;
  }

  componentWillReceiveProps(next) {
    const { status, nav } = next;
    const { isSmallDevice, headerMinimized } = nav;

    if (!isSmallDevice && this.currentState !== 'exited') return;

    this.animateMe(isSmallDevice ? status : 'entering');
  }

  animateMe(status) {
    const el = this.el.current;

    if (this.currentState !== status) {
      if (status === 'entering') velocity(el, 'slideDown', { duration: 250, ease: 'ease-in-out' });
      if (status === 'exiting' || status === 'exited') velocity(el, 'slideUp', { duration: 250, ease: 'ease-in-out' });

      this.currentState = status;
    }
  }

  toggleMenu() {
    this.setState(prev => ({
      showMenu: !prev.showMenu,
    }));
  }

  render() {
    const { showMenu } = this.state;
    const { auth, nav } = this.props;

    const upStyle = cx({
      'user-profile header-notification': true,
      active: showMenu,
    });
    return (
      <ul className="nav-right" ref={this.el}>
        {nav.isSmallDevice ? null : <FullScreen />}
        <Notification />
        <li className={upStyle} onClick={this.toggleMenu} onKeyPress={this.toggleMenu}>
          <a>
            <img alt="avatar" src={require('../../assets/images/avatars/avatar-user.png')} className="img-radius" />
            {!auth.firstname && <span>User Profile</span>}
            {auth.firstname && <span>{`${auth.firstname} ${auth.surname}`}</span>}
            <i className="ti-angle-down" />
          </a>
          <Transition in={showMenu} timeout={250}>
            {status => <ProfileMenu status={status} show={showMenu} />}
          </Transition>
        </li>
      </ul>
    );
  }
}
export default NavRight;
