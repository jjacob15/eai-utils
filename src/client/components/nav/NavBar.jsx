import React from 'react';
import { Transition } from 'react-transition-group';
import NavBarLogo from './NavBarLogo';
import NavRight from './NavRight';

const NavBar = props => {
  const { nav } = props;
  const { headerMinimized } = nav;

  return (
    <nav className="header-navbar">
      <div>
        <NavBarLogo {...nav} />
        <div className="navbar-container container-fluid">
          <Transition in={!headerMinimized} timeout={250}>
            {status => <NavRight status={status} {...props} />}
          </Transition>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
