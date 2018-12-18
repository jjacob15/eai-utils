import React from 'react';
import Accordian from './Accordian';

export default class Comp extends React.Component {
  render() {
    return <Accordian {...this.props} />;
  }
}
