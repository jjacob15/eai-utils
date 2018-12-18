import React from 'react';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';

class SubMenu extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick();
  }

  render() {
    const { item, location } = this.props;

    const aStyle = curr =>
      cx({
        active: curr.link === location.pathname,
      });

    return (
      <li className={aStyle(item)}>
        <Link to={item.link} onClick={this.handleClick}>
          <span className="mtext">{item.label}</span>
        </Link>
      </li>
    );
  }
}

export default withRouter(SubMenu);
