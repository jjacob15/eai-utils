import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../radioButton';
import classname from 'classnames';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onSelected = this.onSelected.bind(this);
  }
  onSelected(id) {
    this.props.onChange(id);
  }

  render() {
    const { data, height, name, isInvalid } = this.props;
    let useHeight = height ? `${height}px` : `100px`;
    const formClass = classname({
      'form-control': true,
      'form-radio': true,
      'radio-primary': true,
      'is-invalid': isInvalid,
    });
    return (
      <div>
        <div className={formClass} style={{ overflow: 'auto', height: useHeight }}>
          {data &&
            data.map(d => (
              <RadioButton
                key={d.id}
                id={d.id}
                name={d.name}
                radioName={name}
                isChecked={d.checked}
                onClicked={this.onSelected}
              />
            ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default List;
