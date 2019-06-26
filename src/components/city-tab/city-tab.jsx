import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class CityTab extends PureComponent {

  render() {
    const {renderTab} = this.props;

    return (
      <>
        {renderTab()}
      </>
    );
  }
}

CityTab.propTypes = {
  renderTab: PropTypes.func.isRequired
};
