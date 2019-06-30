import React, {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';

const withRedirect = (Component) => {
  class WithRedirect extends PureComponent {
    constructor(props) {
      super(props);
    }

    _getRoute(route) {
      switch (route) {

        case `/`:
          return <Redirect to="/"/>;

        case `/login`:
          return <Redirect to="/login"/>;
      }

      return null;
    }

    render() {

      return <Component
        {...this.props}
        route={this._getRoute} />;
    }
  }

  WithRedirect.propTypes = {

  };

  return WithRedirect;
};

export default withRedirect;
