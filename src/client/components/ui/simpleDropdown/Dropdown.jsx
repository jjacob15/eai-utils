import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selected: props.selecteValue,
    // };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    // this.setState(
    //   {
    //     selected: e.target.value,
    //   },
    onChange(e.target.value);
    // );
  }
  render() {
    const { data, placeholder, selectedValue } = this.props;
    // const { selected } = this.state;
    console.log(selectedValue);
    return (
      <select className="form-control" onChange={this.onChange} value={selectedValue}>
        {placeholder && (
          <option value="-1" defaultValue>
            {placeholder}
          </option>
        )}
        {data &&
          data.map((d, i) => (
            <option key={i} value={d.id}>
              {d.name}
            </option>
          ))}
      </select>
    );
  }
}

Dropdown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
