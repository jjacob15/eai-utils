import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

class RegularLink extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.item);
  }
  render() {
    const { item } = this.props;
    const caretStyle = curr =>
      cx({
        mcaret: curr.content,
        'mcaret-plus': curr.content && !curr.expand,
        'mcaret-minus': curr.content && curr.expand,
      });

    return (
      <Link to={{ pathname: item.link }} onClick={this.handleClick}>
        <span className="micron">
          <i className={`ti-${item.icon}`} />
        </span>
        <span className="mtext">{item.label}</span>
        <span className={caretStyle(item)} />
      </Link>
    );
  }
}

export default RegularLink;
