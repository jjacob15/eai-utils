import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const { onChange } = this.props;
    this.setState(
      prev => {
        return {
          selected: !prev.selected,
        };
      },
      () => onChange(this.state.selected)
    );
  }
  render() {
    const { styleName, title } = this.props;
    return (
      <div className={`checkbox-color fade-in-${styleName ? styleName : 'default'}`}>
        <label>
          <input type="checkbox" value={this.state.selected} onChange={this.onChange} />
          <span className="cr">
            <i className="cr-icon icofont icofont-ui-check txt-primary" />
          </span>
          <span>{title}</span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  styleName: PropTypes.string,
};

export default Checkbox;
