import React from 'react';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import moment from 'moment';

class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.initialDate ? new Date(props.initialDate) : new Date(),
    };

    this.setDate = this.setDate.bind(this);
    this.dateField = React.createRef();
  }

  componentWillUnmount() {
    this._picker.destroy();
  }

  setDate(date) {
    const { onChange } = this.props;
    this.setState(
      {
        selectedDate: new Date(date),
      },
      onChange(date)
    );
  }

  componentDidMount() {
    const pObj = {
      field: this.dateField.current,
      firstDay: 1,
      format: 'MMM Do[,] YY',
      maxDate: new Date(2050, 12, 31),
      yearRange: [2000, 2050],
      onSelect: date => {
        this.setDate(date);
      },
      onOpen: () => {
        this._picker.setDate(this.state.selectedDate);
      },
    };

    const { minDate, maxDate } = this.props;

    if (minDate) {
      pObj.minDate = new Date(minDate);
    }

    if (maxDate) {
      pObj.maxDate = new Date(maxDate);
    }

    this._picker = new Pikaday(pObj);
  }
  render() {
    return (
      <input
        className="form-control"
        value={moment(this.state.selectedDate).format('MMM Do[,] YY')}
        ref={this.dateField}
      />
    );
  }
}

Datepicker.propTypes = {
  initialDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default Datepicker;
