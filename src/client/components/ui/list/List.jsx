import React from 'react';
import PropTypes from 'prop-types';
import { isThisSecond } from 'date-fns';

class ListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onSelected(this.props.item);
  }
  render() {
    const { item, cursor, i } = this.props;
    return (
      <React.Fragment>
        <a className={`dropdown-item list-item ${cursor === i ? 'active' : ''}`} onClick={this.handleClick}>
          <div className={`checkbox-fade fade-in-${cursor === i ? 'white' : 'default'}`} style={{ marginRight: '5px' }}>
            <label style={{ verticalAlign: 'middle' }}>
              <input type="checkbox" checked={item.checked} onClick={this.handleClick} />
              <span className="cr">
                <i className="cr-icon icofont icofont-ui-check txt-primary" />
              </span>
            </label>
          </div>
          {item.name}
        </a>
      </React.Fragment>
    );
  }
}
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      localData: props.data.map(x => {
        x.checked = false;
        return x;
      }),
      show: false,
      cursor: 0,
    };
    this.closeOverlay = this.closeOverlay.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentWillReceiveProps(nxtProps) {
    this.setState({
      localData: nxtProps.data.map(x => {
        x.checked = false;
        return x;
      }),
    });
  }

  handleKeyDown(e) {
    const { cursor, localData } = this.state;
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
    if (e.keyCode === 13 || e.keyCode === 32) {
      const { cursor, localData } = this.state;

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
    const { localData } = this.state;

    var selected = localData
      .filter(x => x.checked === true)
      .map(x => x.name)
      .join(', ');

    this.setState({
      value: selected ? selected : '',
      show: false,
    });
  }

  setSelectedItem(item) {
    const { localData } = this.state;
    let cursorPos = 0;
    //remove if selected
    let updated = localData.map((x, i) => {
      if (x.id === item.id) {
        x.checked = !x.checked;
        cursorPos = i;
        return x;
      }

      return x;
    });

    this.setState(
      {
        localData: updated,
        cursor: cursorPos,
      },
      console.log(this.state.localData)
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
        />
        <div className="dropdown-menu" style={{ display: show ? 'block' : 'none' }}>
          {localData &&
            localData.map((d, i) => <ListItem cursor={cursor} i={i} item={d} onSelected={this.setSelectedItem} />)}
          {localData && localData.length === 0 && <a className="dropdown-item disabled ">No items for this search</a>}
        </div>
        {show && <div onClick={this.closeOverlay} className="overlay" />}
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
