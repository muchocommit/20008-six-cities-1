import React from 'react';

import PropTypes from 'prop-types';
import * as router from 'react-router-dom';

router.BrowserRouter = ({children}) => <div>{children}</div>;

router.BrowserRouter.propTypes = {
  children: PropTypes.object.isRequired
};

export default router;
