import React from 'react';
import { Transition } from 'react-transition-group';
import Panel from './Panel';

export default class Accordian extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  }

  render() {
    const { title, children } = this.props;
    return (
      <div>
        <div className="accordion-panel">
          <div className="accordion-heading" onClick={this.handleClick} onKeyDown={this.handleClick}>
            <h3 className="card-title accordion-title">
              <a className="accordion-msg scale_active" href="javascript:void(0)">
                {title}
              </a>
            </h3>
          </div>
          <Transition in={this.state.visible} timeout={350}>
            {status => <Panel status={status}>{children}</Panel>}
          </Transition>
        </div>
      </div>
    );
  }
}
