import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../simpleCheckbox';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onSelected = this.onSelected.bind(this);
    this.onTitleSelected = this.onTitleSelected.bind(this);
  }
  onSelected(item) {
    this.props.onChange({ key: this.props.data.id, values: [item] });
  }
  onTitleSelected() {
    const { checked } = this.props.data;
    this.props.onChange({
      key: this.props.data.id,
      values: this.props.data.value.map(x => x.name),
      forceStatus: !checked,
    });
  }

  render() {
    const { data, height } = this.props;
    let useHeight = height ? `${height}px` : `100px`;
    return (
      <div style={{ border: '1px solid #cccccc' }}>
        <div className="form-control" style={{ border: '0', paddingBottom: '0' }}>
          <Checkbox
            title={data.name}
            isChecked={data.checked}
            onChange={this.onTitleSelected}
            styleName="primary"
            style={{ display: 'block' }}
          />
        </div>
        <hr style={{ width: '80%', marginTop: '0', marginBottom: '0.25rem' }} />
        <div
          className="form-control"
          style={{ overflow: 'auto', height: useHeight, border: '0', paddingTop: '0.25rem' }}>
          {data.value &&
            data.value.map((d, i) => (
              <Checkbox
                key={i}
                title={d.name}
                isChecked={d.checked}
                onChange={this.onSelected}
                styleName="primary"
                style={{ display: 'block' }}
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
