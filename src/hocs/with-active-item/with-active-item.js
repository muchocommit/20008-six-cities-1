import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: props.isActive
      }
    }

    render() {

      return (<Component
        {...this.props}
        reActivate={this.setState({isActive: !this.state.isActive})}
      />)
    }
  }

  WithActiveItem.propTypes = {
    isActive: PropTypes.bool.isRequired
  };
  return WithActiveItem;
};

export default withActiveItem;
