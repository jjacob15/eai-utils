import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { handleClick, index } = this.props;
    handleClick(index);
  }
  render() {
    const { index, title, isActive } = this.props;
    return (
      <li className={isActive ? 'current' : 'done'}>
        <a onClick={this.handleClick}>
          <span className="number">{`${index}.`}</span> {title}{' '}
        </a>
      </li>
    );
  }
}
