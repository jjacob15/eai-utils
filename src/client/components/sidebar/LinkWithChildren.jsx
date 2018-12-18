import React, { Component, Fragment } from 'react';
import SubMenu from './SubMenu';
import cx from 'classnames';

class LinkWithChildren extends Component {
  constructor() {
    super();
    this.state = {
      expand: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.item);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      expand: nextProps.item.id === nextProps.selectedSubMenuId,
    });
  }
  render() {
    const { item } = this.props;
    const { expand } = this.state;

    const caretStyle = curr =>
      cx({
        mcaret: curr.content,
        'mcaret-plus': curr.content && expand,
        'mcaret-minus': curr.content && expand,
      });

    const subMenuStyle = curr =>
      cx({
        'sub-menu': true,
        'sub-menu-visible': expand,
      });

    return (
      <Fragment>
        <a onClick={this.handleClick}>
          <span className="micron">
            <i className={`ti-${item.icon}`} />
          </span>
          <span className="mtext">{item.label}</span>
          <span className={caretStyle(item)} />
        </a>
        {item.content && (
          <ul className={subMenuStyle(item)}>
            {item.content.map((sub, j) => (
              <SubMenu item={sub} key={j} handleClick={this.handleClick} />
            ))}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default LinkWithChildren;
