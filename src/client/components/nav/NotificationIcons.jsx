import React from 'react';
import Tooltip from '../ui/tooltip';
export default () => (
  <span>
    <li className="">
      <Tooltip title="Notification">
        <a>
          <i className="ti-bell" />
          <span className="badge bg-c-pink" />
        </a>
      </Tooltip>
    </li>
    <li className="">
      <Tooltip title="Chat">
        <a className="displayChatbox">
          <i className="ti-comments" />
          <span className="badge bg-c-green" />
        </a>
      </Tooltip>
    </li>
  </span>
);
