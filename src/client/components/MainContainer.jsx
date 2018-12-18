import React from 'react';
import { Transition } from 'react-transition-group';
import SideBar from './sidebar/Sidebar';
import Landing from './landing/Landing';

class MainContainer extends React.Component {
  render() {
    return (
      <div className="main-container">
        <SideBarWrapper {...this.props} />
        <Landing {...this.props} />
      </div>
    );
  }
}

const SideBarWrapper = props => {
  const { nav } = props;
  const { displaySideBar } = nav;
  return (
    <Transition in={displaySideBar} timeout={250}>
      {status => <SideBar status={status} {...props} />}
    </Transition>
  );
};

export default MainContainer;
