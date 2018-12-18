/**
 * Created by John.Doe on 7/11/2018.
 */
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import NavBar from './components/nav/NavBar';
import MainContainer from './components/MainContainer';
import { SET_BROWSER_SIZE, TOGGLE_SIDEBAR } from './constants';
import { withRouter } from 'react-router-dom';
import style from './assets/scss/style.scss';

// map all necessary literals from state to props here
const stateMap = state => ({
  auth: state.auth,
  nav: state.nav,
  review: state.review,
  segments: state.segments,
});

const propMap = dispatch => ({
  updateScreenSize: status => {
    dispatch({ type: SET_BROWSER_SIZE, size: status });
  },
  dimissSideBar: () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const { nav, updateScreenSize } = this.props;
    if (nav.isSmallDevice && document.body.offsetWidth > 992) {
      updateScreenSize(false);
    }

    if (!nav.isSmallDevice && document.body.offsetWidth < 992) {
      updateScreenSize(true);
    }
  }

  renderOverlay() {
    const { dimissSideBar, nav } = this.props;
    const { isSmallDevice, displaySideBar } = nav;
    const c = cx({
      'overlay-box': true,
      'overlay-box-show': isSmallDevice && displaySideBar,
    });
    return <div className={c} role="link" tabIndex="0" onClick={dimissSideBar} onKeyDown={dimissSideBar} />;
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        {this.renderOverlay()}
        <NavBar {...this.props} />
        <MainContainer {...this.props} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    stateMap,
    propMap
  )(App)
);
