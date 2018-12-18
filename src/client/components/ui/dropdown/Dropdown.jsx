import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      localData: props.data,
      show: false,
      cursor: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillReceiveProps(nxtProps) {
    this.setState({
      localData: nxtProps.data,
    });
  }

  handleKeyDown(e) {
    const { cursor, localData } = this.state;
    const { onChange } = this.props;
    // arrow up/down button should select next/previous list element
    //up key
    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1,
      }));
    }

    //down key
    if (e.keyCode === 40 && cursor < localData.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1,
      }));
    }

    //enter to select
    if (e.keyCode === 13) {
      const { cursor, value, localData } = this.state;

      if (localData[cursor].name === value) return;

      this.setSelectedItem(localData[cursor]);
    }
  }
  inputChange(e) {
    const value = e.target.value;
    const { data } = this.props;
    this.setState(prev => {
      return {
        value: value,
        localData: data.filter(x => x.name.toLowerCase().indexOf(value.toLowerCase()) !== -1),
      };
    });
  }
  showDropDown() {
    this.setState({
      show: true,
    });
  }
  closeOverlay() {
    const { value } = this.state;
    const { data } = this.props;
    let clearVal = false;

    var found = data.find(x => x.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    if (!found) {
      clearVal = true;
    }

    this.setState(prev => {
      return {
        value: clearVal ? '' : prev.value,
        localData: clearVal ? data : prev.localData,
        show: false,
      };
    });
  }
  onChange(d) {
    this.setSelectedItem(d);
  }

  setSelectedItem(item) {
    const { onChange } = this.props;
    this.setState(
      {
        value: item.name,
        show: false,
      },
      onChange(item)
    );
  }

  render() {
    const { placeholder } = this.props;
    const { value, show, localData, cursor } = this.state;

    return (
      <div className="dropdown">
        <input
          className="form-control"
          placeholder={placeholder ? placeholder : ''}
          onKeyDown={this.handleKeyDown}
          value={value}
          onClick={this.showDropDown}
          onChange={this.inputChange}
        />
        <div className="dropdown-menu" style={{ display: show ? 'block' : 'none' }}>
          {localData &&
            localData.map((d, i) => (
              <a className={`dropdown-item ${cursor === i ? 'active' : ''}`} key={i} onClick={() => this.onChange(d)}>
                {d.name}
              </a>
            ))}
          {localData && localData.length === 0 && <a className="dropdown-item disabled ">No items for this search</a>}
        </div>
        {show && <div onClick={this.closeOverlay} className="overlay" />}
      </div>
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
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
