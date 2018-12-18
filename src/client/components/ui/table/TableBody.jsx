import React, { Fragment } from 'react';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import PropTypes from 'prop-types';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setData(props);

    this.setData = this.setData.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);

    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.closeSelectedRow = this.closeSelectedRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data, searchKeyword, pageLimit } = this.props;
    if (data !== nextProps.data || searchKeyword != nextProps.searchKeyword || pageLimit != nextProps.pageLimit) {
      this.setState(this.setData(nextProps));
    }
  }

  setData(props) {
    let state = this.filteredState(props);
    state = this.sortedState(props, state);

    return this.paginateState(props, state);
  }

  onPrevious() {
    const { currentPage } = this.state;
    if (currentPage === 0) return;

    this.handlePageClick(currentPage - 1)();
  }

  onNext() {
    const { currentPage, pageArray } = this.state;
    if (currentPage + 1 === pageArray.length) return;

    this.handlePageClick(currentPage + 1)();
  }

  paginateState(props, state) {
    const { enablePagination, pageLimit } = props;
    if (!enablePagination) return state;

    const { data } = state;
    let dataLength = data.length;
    const defaultPageLimit = pageLimit || dataLength;

    if (defaultPageLimit) {
      if (dataLength < defaultPageLimit) {
        //show all
        return {
          ...state,
          pageLimit: defaultPageLimit,
          pageArray: [dataLength],
          currentPage: 0,
          filteredData: data,
          data,
          previous: false,
          next: false,
          showing: dataLength,
          of: dataLength,
          total: dataLength,
        };
      }

      //resetting when rerendering.
      let pageArray = [];
      while (dataLength > 0) {
        if (dataLength > defaultPageLimit) {
          pageArray.push(defaultPageLimit);
          dataLength -= defaultPageLimit;
        } else {
          pageArray.push(dataLength);
          dataLength -= dataLength;
        }
      }

      return {
        ...state,
        pageLimit: defaultPageLimit,
        pageArray,
        currentPage: 0,
        filteredData: data,
        data: data.length > pageArray[0] ? data.slice(0, pageArray[0]) : data,
        previous: false,
        next: true,
        showing: 1,
        of: pageArray[0],
        total: data.length,
        showRowExpanded: false,
        selectedRowId: -1,
      };
    }
  }

  sortedState(props, state) {
    const { enableSorting } = props;
    if (!enableSorting) return state;

    const { data } = state;
    if (data.length === 0) return state;

    const firstKey = Object.keys(data[0])[0];

    return {
      ...state,
      data: this.sortData(data, firstKey),
      sortKey: firstKey,
      sortDirection: 'asc',
    };
  }

  sortData(data, key, direction = 'asc') {
    return data.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  filteredState(props) {
    const { searchKeyword, data } = props;
    const idLimit = 1000;
    const dataWithId = data.map((x, i) => ({ ...x, _internalId: idLimit - i }));
    if (!searchKeyword) return { ...this.state, data: dataWithId, filteredText: '' };

    //filtering values which has the search keyword in lower case
    var result = dataWithId.filter(
      x =>
        Object.values(x).filter(v => {
          if (v === null) return;
          if (typeof v === 'object' || typeof v === 'function') return;

          const valueLower = v.toString().toLowerCase();
          const searchLower = searchKeyword.toLowerCase();

          return valueLower.indexOf(searchLower) !== -1;
        }).length > 0
    );

    return { ...this.state, data: result, filteredText: `(filtered from ${dataWithId.length} entries)` };
  }

  onRowClick = (row, i) => e => {
    this.setState({
      showRowExpanded: true,
      selectedRowId: i,
    });
    this.props.onRowClick(row);
  };

  closeSelectedRow() {
    this.setState({
      showRowExpanded: false,
      selectedRowId: -1,
    });
  }

  handleOnMouseEnter = row => e => {
    this.setState({
      hoveredRow: row,
    });
  };

  handlePageClick = i => e => {
    const { pageArray, filteredData, pageLimit, currentPage } = this.state;

    if (currentPage === i) return;

    const start = i * pageLimit;
    this.setState({
      previous: i != 0,
      next: i + 1 != pageArray.length,
      currentPage: i,
      data: filteredData.slice(start, start + pageArray[i]),
      showing: start,
      of: start + pageArray[i],
      total: filteredData.length,
      showRowExpanded: false,
      selectedRowId: -1,
    });
  };

  toggleDirection(direction) {
    return direction === 'asc' ? 'desc' : 'asc';
  }

  onHeaderClick(key) {
    const { filteredData, sortDirection, sortKey, pageArray } = this.state;

    const direction = sortKey !== key ? 'asc' : this.toggleDirection(sortDirection);
    this.setState({
      data: this.sortData(filteredData, key, direction).slice(0, pageArray[0]),
      sortKey: key,
      sortDirection: direction,
      currentPage: 0,
      previous: false,
      next: true,
      showing: 1,
      of: pageArray[0],
    });
  }

  render() {
    const { header, showFooter, enableSorting, enablePagination } = this.props;
    const {
      data,
      currentPage,
      pageArray,
      previous,
      next,
      showing,
      of,
      total,
      filteredText,
      sortDirection,
      sortKey,
      showRowExpanded,
      selectedRowId,
    } = this.state;

    let sortedHeader = header;

    if (header[0].hasOwnProperty('ordinal')) {
      sortedHeader = header.sort((a, b) => a.ordinal - b.ordinal);
    }

    const hasRowContent = Boolean(this.props.renderRowContent);
    const hasRowHover = Boolean(this.props.renderRowHover);

    return (
      <div className="dataTables_length">
        <div className="row">
          <div className="col-xs-12 col-sm-12" style={{ overflow: 'auto' }}>
            <table id="simpletable" className="table compact table-bordered table-hover nowrap dataTable">
              <TableHeader
                data={sortedHeader}
                enableSorting={enableSorting}
                sortDirection={sortDirection}
                sortKey={sortKey}
                onHeaderClick={this.onHeaderClick}
              />
              <tbody>
                {data.map((d, i) => (
                  <Fragment>
                    <tr
                      role="row"
                      showcursor={hasRowHover.toString()}
                      key={i}
                      onClick={this.onRowClick(d, d._internalId)}
                      onMouseEnter={this.handleOnMouseEnter(d)}>
                      {sortedHeader.map((h, j) => (
                        <td
                          key={j}
                          style={{ position: 'relative' }}
                          showhovercontent={sortedHeader.length - 1 === j && hasRowHover ? 'true' : 'false'}>
                          {d[h.propName || h.name]}
                          {sortedHeader.length - 1 === j &&
                            hasRowHover && (
                              <div className="hoverContent" key={j + 1}>
                                {this.props.renderRowHover(this.state)}
                              </div>
                            )}
                        </td>
                      ))}
                    </tr>
                    {showRowExpanded &&
                      d._internalId === selectedRowId &&
                      hasRowContent && (
                        <tr nohover="true" key={d._internalId * 100}>
                          <td colSpan={sortedHeader.length} style={{ position: 'relative' }}>
                            {this.props.renderRowContent(this.state)}
                            <i
                              className="fa fa-times m-10"
                              style={{ position: 'absolute', top: '0', right: '0' }}
                              onClick={this.closeSelectedRow}
                            />
                          </td>
                        </tr>
                      )}
                  </Fragment>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td valign="top" colSpan="6" className="dataTables_empty">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
              {showFooter && <TableFooter data={sortedHeader} />}
            </table>
          </div>
        </div>
        {enablePagination && (
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-5">
              <div className="dataTables_info">
                {`Showing ${showing} to ${of} of ${total} entries ${filteredText ? filteredText : ''}`}
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-7">
              <div className="dataTables_paginate paging_simple_numbers">
                <ul className="pagination">
                  <li
                    className={`paginate_button page-item previous ${previous ? '' : 'disabled'}`}
                    onClick={this.onPrevious}>
                    <a tabIndex="0" className="page-link">
                      Previous
                    </a>
                  </li>
                  {pageArray &&
                    pageArray.map((p, i) => (
                      <li className={`paginate_button page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                        <a className="page-link" onClick={this.handlePageClick(i)}>
                          {++i}
                        </a>
                      </li>
                    ))}
                  <li className={`paginate_button page-item next ${next ? '' : 'disabled'}`} onClick={this.onNext}>
                    <a className="page-link">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      propName: PropTypes.string,
      ordinal: PropTypes.number,
    })
  ).isRequired,
  showFooter: PropTypes.bool,
  searchKeyword: PropTypes.string,
  enableSorting: PropTypes.bool,
  enablePagination: PropTypes.bool,
  pageLimit: PropTypes.number,
  rowExpand: PropTypes.node,
  onRowClick: PropTypes.func,
  renderRowContent: PropTypes.func,
  renderRowHover: PropTypes.func,
};

export default TableBody;
