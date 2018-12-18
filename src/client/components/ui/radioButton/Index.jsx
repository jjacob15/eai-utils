import React from 'react';

const RadioButton = ({ name, isChecked, radioName, onClicked, id }) => {
  return (
    <div className="radio">
      <label>
        <input type="radio" name={radioName} checked={isChecked} onClick={() => onClicked(id)} />
        <i className="helper" />
        {name}
      </label>
    </div>
  );
};

export default RadioButton;
