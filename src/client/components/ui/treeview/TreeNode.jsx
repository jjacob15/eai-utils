import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class TreeNode extends Component {
  constructor() {
    super();
    this.state = {
      selected: {},
    };
  }

  toggleDisplay(item) {
    this.props.toggleDisplay(item);
  }
  toggleSelection(item) {
    this.props.toggleSelection(item);
  }
  render() {
    const item = this.props.item;
    var cn = 'nodedivhide';
    var spnStyle = 'nodespan';
    var treebuttonclass = 'jstree-treebutton-invisible';
    var checkboxclass = '';
    var anchorclass = 'jstree-anchor';

    if (item.isopen) {
      cn = 'nodediv';
    }

    if (item.isselected) {
      checkboxclass = 'jstree-checkbox-selected';
      spnStyle = ' jstree-clicked';
    } else {
      if (item.isselected === null) checkboxclass = 'jstree-checkbox-null';
      else checkboxclass = 'jstree-checkbox-unselected';
    }

    if (item.isbranchopen) {
      if (item.children !== undefined) treebuttonclass = 'jstree-treebutton-open';
    } else {
      if (item.children !== undefined) treebuttonclass = 'jstree-treebutton-close';
    }

    if (!this.props.lastLevel && item.children === undefined) treebuttonclass = 'jstree-treebutton-invisible-leaf';

    const _marginLeft = 25 * (this.props.level - 1);
    const bars = [];
    var i = 0;
    for (i = 0; i < this.props.level - 1; i++) {
      bars.push(<span key={i} className="jstree-treevertical" />);
    }
    const content = (
      <div className={cn}>
        {bars}
        <span className={treebuttonclass} onClick={this.toggleDisplay.bind(this, item)} />
        <span className={spnStyle} onClick={this.toggleSelection.bind(this, item)}>
          <span className={checkboxclass} />
          <span className={anchorclass}>{item.text}</span>
        </span>
      </div>
    );
    return <div className="treedivheight">{content}</div>;
  }
}
