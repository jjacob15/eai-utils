import React from 'react';
import { Transition } from 'react-transition-group';
import ContentWrapper from './ContentWrapper';
import classnames from 'classnames';
import Header from './Header';
import PropTypes from 'prop-types';

const initialState = {
  from: 0,
  to: 1,
  width: 0,
  length: 0,
};

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState, length: props.steps.length };

    this.onNext = this.onNext.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onFinish = this.onFinish.bind(this);

    this.handleHeaderClick = this.handleHeaderClick.bind(this);

    this.resizeTriggered = this.resizeTriggered.bind(this);
    this.triggerChildEvents = this.triggerChildEvents.bind(this);

    this.el = React.createRef();
  }

  componentWillMount() {
    const { steps } = this.props;
    this.childRef = [];
    steps.map((s, i) => {
      this.childRef.push(React.createRef());
    });
    // console.log(this.childRef)
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeTriggered);
    this.resizeTriggered();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTriggered);
  }

  resizeTriggered() {
    const width = this.el.current.innerWidth || this.el.current.clientWidth;
    this.setState({
      width: width,
    });
  }

  handleHeaderClick(index) {
    if (this.isValidToGo()) {
      this.setState(
        prev => {
          return {
            to: index,
            from: prev.to,
          };
        },
        () => this.triggerChildEvents(index, this.state.from)
      );
    }
  }

  onNext() {
    if (this.isValidToGo() && this.state.to !== this.state.length) {
      this.setState(
        prev => {
          return {
            from: prev.to,
            to: ++prev.to,
          };
        },
        () => this.triggerChildEvents(this.state.to, this.state.from)
      );
    }
  }

  isValidToGo() {
    const { to } = this.state;
    const curr = to - 1;

    const childRef = this.childRef[curr].current;
    const instance = childRef.wrappedInstance ? childRef.wrappedInstance : childRef;

    if (!instance.onNavigateOutCheck) return true;

    return instance.onNavigateOutCheck();
  }

  triggerChildEvents(curr, prev) {
    curr = curr - 1; //converting to index of 0
    prev = prev - 1; //converting to index of 0
    const childRef = this.childRef[prev].current;
    const instance = childRef.wrappedInstance ? childRef.wrappedInstance : childRef;

    if (instance.onExit) instance.onExit();

    const childRefCur = this.childRef[curr].current;
    const instanceCur = childRefCur.wrappedInstance ? childRefCur.wrappedInstance : childRefCur;

    if (instanceCur.onEnter) instanceCur.onEnter();
  }

  onBack() {
    if (this.isValidToGo() && this.state.to !== 1) {
      this.setState(
        prev => {
          return {
            from: prev.to,
            to: --prev.to,
          };
        },
        () => this.triggerChildEvents(this.state.to, this.state.from)
      );
    }
  }

  onFinish() {
    const childRef = this.childRef[this.childRef.length - 1].current;
    const instance = childRef.wrappedInstance ? childRef.wrappedInstance : childRef;

    if (instance.onExit) instance.onExit();
    this.props.onFinished();
  }

  render() {
    const { steps } = this.props;
    const { to, length } = this.state;
    const prevButton = classnames({
      disabled: to === 1,
    });
    return (
      <form className="wizard-form wizard" id="basic-forms" action="#" role="application">
        <div className="steps clearfix">
          <ul role="tablist">
            {steps.map((x, i) => (
              <Header
                index={i + 1}
                key={i}
                isActive={to === i + 1}
                handleClick={this.handleHeaderClick}
                title={x.header}
              />
            ))}
          </ul>
        </div>
        <div className="content clearfix" ref={this.el}>
          {steps.map((x, i) => (
            <Transition in={this.state.to === i + 1} key={i} timeout={250}>
              {status => (
                <ContentWrapper status={status} {...this.state} id={i + 1}>
                  {<x.component {...this.props} ref={this.childRef[i]} />}
                </ContentWrapper>
              )}
            </Transition>
          ))}
        </div>
        <div className="actions clearfix">
          <ul role="menu" aria-label="Pagination">
            <li className={prevButton}>
              <a onClick={this.onBack}>Previous</a>
            </li>
            {to !== length && (
              <li className="">
                <a onClick={this.onNext}>Next</a>
              </li>
            )}
            {to === length && (
              <li>
                <a onClick={this.onFinish}>Finish</a>
              </li>
            )}
          </ul>
        </div>
      </form>
    );
  }
}

Wizard.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ).isRequired,

  onFinished: PropTypes.func.isRequired,
};

export default Wizard;
