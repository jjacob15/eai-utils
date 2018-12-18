import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ styleName, title, isChecked, onChange, style }) => (
  <div className={`checkbox-fade fade-in-${styleName ? styleName : 'default'}`} style={style}>
    <label style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={isChecked} onChange={() => onChange(title)} />
      <span className="cr">
        <i className="cr-icon icofont icofont-ui-check txt-primary" />
      </span>
      <span>{title}</span>
    </label>
  </div>
);

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  styleName: PropTypes.string,
};

export default Checkbox;
