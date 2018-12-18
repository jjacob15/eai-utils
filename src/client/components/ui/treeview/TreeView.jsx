import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import TreeNode from './TreeNode';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      treedata: [],
      maxTreeLevel: 0,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }
  componentDidMount() {
    var flatData = this.generateFlatData(this.props.treedata);
    var allKeyLengths = flatData.map(a => a.key.split('_').length - 1);
    var maxTreeLevel = Math.max(...allKeyLengths);
    this.setState({ treedata: this.props.treedata, maxTreeLevel: maxTreeLevel });
  }

  //=====================================================================
  // Create flat and nested data structures
  //=====================================================================
  generateFlatData(nestedData) {
    var ret = [];
    for (var i = 0; i < nestedData.length; i++) {
      ret.push(nestedData[i]);
      if (Array.isArray(nestedData[i].children)) {
        ret = ret.concat(this.generateFlatData(nestedData[i].children));
      }
    }

    return ret;
  }
  generateNestedData(flatData) {
    var ret = [];
    var allKeyLengths = flatData.map(a => a.key.split('_').length - 1);
    var maxTreeLevel = Math.max(...allKeyLengths);
    var i = 0;
    var rootElements = flatData.filter(a => a.key.indexOf('_') === -1);
    var level = maxTreeLevel;

    level = 0;

    var ret = rootElements.map(r => {
      var childElements = flatData.filter(a => a.key.startsWith(r.key + '_'));
      var tmp = this.getNestedData(flatData, r, childElements, level + 1);
      return tmp;
    });

    return ret;
  }
  getNestedData(flatData, parent, children, level) {
    if (children !== undefined) {
      if (children.length !== 0) {
        var parentElements = children.filter(a => a.key.split('_').length - 1 === level);
        var i = 0;
        for (i = 0; i < parentElements.length; i++) {
          var childElements = children.filter(
            a => a.key.startsWith(parentElements[i].key + '_') && a.key.split('_').length - 1 === level + 1
          );
          var tmp = this.getNestedData(flatData, parentElements[i], childElements, level + 1);
          parentElements[i] = tmp;
        }
        parent.children = parentElements;
      }
    }
    return parent;
  }

  //=====================================================================
  // Selection functions
  //=====================================================================
  toggleSelection(item) {
    var leveltocheck = item.key.split('_').length - 1;
    var checkFlag = !item.isselected;
    var flatData = this.generateFlatData(this.state.treedata);
    flatData = flatData.map(a => {
      if (a.key.startsWith(item.key + '_') || a.key === item.key) {
        if (a.isselected === null) a.isselected = true;
        else a.isselected = checkFlag;
      }
      return a;
    });
    var flatDataTemp = flatData;
    flatData = flatData.sort(function(a, b) {
      return b.key.split('_').length - a.key.split('_').length;
    });
    flatData = flatData.map(a => {
      if (item.key.startsWith(a.key + '_')) {
        var count = flatDataTemp.filter(x => x.key.startsWith(a.key + '_') && x.key != a.key).length;
        if (count > 0) {
          var trueCount = flatDataTemp.filter(
            x => x.key.startsWith(a.key + '_') && x.key != a.key && x.isselected === true
          ).length;
          if (trueCount === count) a.isselected = true;
          else {
            if (trueCount === 0) a.isselected = false;
            else a.isselected = null;
          }
        }
      }
      return a;
    });
    var _treedata = this.generateNestedData(flatData);

    this.setState({ treedata: _treedata });
  }

  updateSelection(children, parentSelection, alreadeyFound, item) {
    if (children !== undefined) {
      children.forEach(a => {
        if (!alreadeyFound) {
          if (a.key === item.key) {
            a.isselected = !a.isselected;
            alreadeyFound = true;
          }
        } else a.isselected = parentSelection;
        this.updateSelection(a.children, a.isselected, alreadeyFound, item);
      });
    }
  }

  //=====================================================================
  // Expand/Collapse functions
  //=====================================================================
  toggleDisplay(item) {
    var leveltocheck = item.key.split('_').length - 1;
    var rootKey = item.key.split('_')[leveltocheck === 0 ? 0 : leveltocheck - 1];
    var checkFlag = !item.isbranchopen;
    var flatData = this.generateFlatData(this.state.treedata);
    flatData = flatData.map(a => {
      var currlevel = a.key.split('_').length - 1;
      var currRootKey = a.key.split('_')[leveltocheck === 0 ? 0 : leveltocheck - 1];
      if (a.key.startsWith(item.key)) {
        a.isbranchopen = false;
        if (a.key === item.key) a.isbranchopen = checkFlag;
        else if (a.key !== item.key) {
          if (currlevel === leveltocheck + 1) a.isopen = checkFlag;
          else a.isopen = false;
        }
      } else {
        if (rootKey !== currRootKey) a.isbranchopen = false;
        else if (rootKey === currRootKey) {
          if (a.key !== item.key && leveltocheck === currlevel) a.isbranchopen = false;
        }
        if (leveltocheck < currlevel) a.isopen = false;
      }

      return a;
    });

    var _treedata = this.generateNestedData(flatData);
    this.setState({ treedata: _treedata });
  }

  toggleDisplay2(item) {
    var leveltocheck = item.key.split('_').length - 1;
    var currentlevel = 0;
    var _treedata = this.state.treedata.map(a => {
      if (a.key === item.key && leveltocheck === currentlevel) {
        a.isbranchopen = !a.isbranchopen;
      }
      this.updateOpenFlag(a.children, currentlevel + 1, leveltocheck, item);
      return a;
    });
    this.setState({ treedata: _treedata });
  }
  updateOpenFlag(children, currentlevel, leveltocheck, item) {
    if (children !== undefined) {
      children.forEach(a => {
        if (a.key === item.key && leveltocheck === currentlevel) a.isbranchopen = !a.isbranchopen;
        if (a.key.startsWith(item.key) && leveltocheck < currentlevel) {
          a.isopen = !a.isopen;
        }
        this.updateOpenFlag(a.children, currentlevel + 1, leveltocheck, item);
      });
    }
  }

  //=====================================================================
  // Calling this function recursively while populating the tree nodes.
  //=====================================================================
  renderTree(treeview, parent, level, children, lastLevel) {
    return (
      <div>
        {children && children.length
          ? children.map(function(child, index) {
              var lastLevel = index === children.length - 1 ? true : false;
              let treeItem = (
                <TreeNode
                  treeview={treeview}
                  level={level}
                  lastLevel={lastLevel}
                  key={child.key}
                  item={child}
                  toggleDisplay={treeview.toggleDisplay}
                  toggleSelection={treeview.toggleSelection}
                />
              );

              return (
                <div key={child.key}>
                  {treeItem}
                  {treeview.renderTree(treeview, treeItem, level + 1, child.children, lastLevel)}
                </div>
              );
            })
          : undefined}
      </div>
    );
  }
  render() {
    let self = this;
    const treedata = this.state.treedata;
    const maxTreeLevel = this.state.maxTreeLevel;
    const lastLevel = false;
    var rootItem = { key: '#', text: 'root', children: treedata };
    let treeItem = (
      <TreeNode
        treeview={self}
        key={rootItem.key}
        level={1}
        lastLevel={lastLevel}
        item={rootItem}
        toggleDisplay={this.toggleDisplay}
        toggleSelection={this.toggleSelection}
      />
    );
    var treeUI = [];
    if (treedata !== undefined) {
      if (treedata.length > 0) treeUI = this.renderTree(self, treeItem, 1, treedata, lastLevel);
    }
    return <div className="m-l-20 m-t-10">{treeUI}</div>;
  }
}
