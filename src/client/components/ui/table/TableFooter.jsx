import React from 'react';

export default class Footer extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <tfoot>
        <tr>
          {data.map((c, i) => (
            <th rowSpan="1" colSpan="1" key={i}>
              {c.name}
            </th>
          ))}
        </tr>
      </tfoot>
    );
  }
}
