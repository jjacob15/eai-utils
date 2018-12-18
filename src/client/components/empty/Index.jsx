import React from 'react';
import { withRouter } from 'react-router-dom';

const EmptyComponent = ({ location }) => {
  return <h3>{location.pathname.replace('/', '')}</h3>;
};
export default withRouter(EmptyComponent);
