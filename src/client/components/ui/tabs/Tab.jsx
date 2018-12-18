import React from 'react';
import cx from 'classnames';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleClick, item } = this.props;
    handleClick(item);
  }

  render() {
    const { item, active } = this.props;
    const c = cx({
      'nav-link': true,
      active: active === item.id,
    });
    return (
      <li className="nav-item">
        <a className={c} onClick={this.handleClick} onKeyDown={this.handleClick}>
          {item.name}
        </a>
        <div className="slide" />
      </li>
    );
  }
}
