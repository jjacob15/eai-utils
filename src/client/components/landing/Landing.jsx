import React from 'react';
import Candle from '../candle';
import BoxPlot from '../boxPlot';
import ScatterPlot from '../scatterPlot';
import BiPlot from '../biPlot';
import CorrelationPlot from '../correlationPlot';
import Dendrogram from '../dendrogram';
import Radar from '../radar';
import { Route, Switch, withRouter } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.resizeTriggered = this.resizeTriggered.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeTriggered);
    this.resizeTriggered();
    // this.props.setLandingMenu();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTriggered);
  }

  resizeTriggered() {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const y = w.innerHeight || e.clientHeight || g.clientHeight;
    this.setState({
      height: y - 76,
    });
  }

  render() {
    const { nav } = this.props;
    return (
      <div
        className="landing-content"
        style={{ marginLeft: nav.displaySideBar && !nav.isSmallDevice ? '255px' : '0px' }}>
        <div className="landing-inner-content">
          <div className="main-body">
            <div className="page-wrapper">
              <div className="row">
                <div className="col-xl-12">
                  <Switch>
                    <Route path="/dendrogram" render={() => <Dendrogram />} />
                    <Route path="/box" render={() => <BoxPlot />} />
                    <Route path="/scatter" render={() => <ScatterPlot />} />
                    <Route path="/correlation" render={() => <CorrelationPlot />} />
                    <Route path="/biplot" render={() => <BiPlot />} />
                    <Route path="/radar" render={() => <Radar />} />
                    <Route exact path="/" render={() => <Candle />} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Landing);
