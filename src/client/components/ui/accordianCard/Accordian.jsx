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
        <div className="accordion-panel m-b-15">
          <div className="filter-bar m-b-15" onClick={this.handleClick} onKeyDown={this.handleClick}>
                <div className="navbar navbar-light bg-faded">
                <ul class="nav navbar-nav">
                        <a className="accordioncard-msg scale_active" href="javascript:void(0)">
                        <strong>{title}</strong>
                        </a>
                    </ul>                
                    <div className="f-right">
                      <button type="button" class="btn btn-sm-icon btn-primary m-r-10">
                        <i class="icofont icofont-listine-dots"></i>
                      </button>
                      <button type="button" class="btn btn-sm-icon btn-primary m-r-10">
                        <i class="icofont icofont-info"></i>
                      </button>
                      <button type="button" class="btn btn-sm-icon btn-primary m-r-10">
                        <i class="icofont icofont-question"></i>
                      </button>
                    </div>
                </div>            
          </div>
          <Transition in={this.state.visible} timeout={350}>
            {status => <Panel status={status}>{children}</Panel>}
          </Transition>
        </div>
      </div>
    );
  }
}
