import React from 'react';
import Tab from './Tab';
import PropTypes from 'prop-types';

export default class Tabs extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const { handleSelected } = this.props;
    handleSelected(i);
  }
  render() {
    const { items, active } = this.props;

    return (
      <ul className="nav nav-tabs md-tabs">
        {items.map((m, i) => (
          <Tab item={m} active={active} key={i} handleClick={this.handleClick} />
        ))}
        {this.props.children}
      </ul>
    );
  }
}

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  active: PropTypes.number.isRequired,

  handleSelected: PropTypes.func.isRequired,
};
