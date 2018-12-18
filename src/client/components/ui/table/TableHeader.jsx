import React from 'react';
import classnames from 'classnames';

export default class Header extends React.Component {
  handleClick = name => e => {
    const { enableSorting } = this.props;
    if (!enableSorting) return;

    this.props.onHeaderClick(name);
  };
  getClass(name) {
    const { enableSorting, sortKey, sortDirection } = this.props;
    return classnames({
      sorting: enableSorting && name !== sortKey,
      sorting_asc: enableSorting && name === sortKey && sortDirection === 'asc',
      sorting_desc: enableSorting && name === sortKey && sortDirection === 'desc',
    });
  }
  render() {
    const { data } = this.props;
    return (
      <thead>
        <tr>
          {data.map((c, i) => (
            <th
              className={this.getClass(c.propName)}
              rowSpan="1"
              colSpan="1"
              key={i}
              onClick={this.handleClick(c.propName)}>
              {c.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
