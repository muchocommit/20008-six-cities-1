import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withTab = (Component) => {
  class CityTab extends PureComponent {
    constructor(props) {
      super(props);

      this._tabRef = createRef();

      this.state = {
        isActive: props.isActive
      };

      this._onCityTabButtonClick = this._onCityTabButtonClick.bind(this);
    }

    _onCityTabButtonClick() {

      this.props.onCityTabButtonClick();
      this.setState({isActive: !this.state.isActive});
    }

    _activateTab() {
      const tab = this._tabRef.current;

      if (this.props.isActive) {
        tab.className = `locations__item-link tabs__item--active`;
      } else {
        tab.className = `locations__item-link tabs__item`;
      }
    }

    _renderTab(city) {

      return () =>
        (
          <li className="locations__item">
            <a className={`locations__item-link tabs__item`}
              href="#"
              onClick={this._onCityTabButtonClick}
              ref={this._tabRef}
            >
              <span>{city}</span>
            </a>
          </li>);
    }


    render() {
      const {city} = this.props;

      return <Component
        {...this.props}
        renderTab={this._renderTab(city)}/>;

    }

    componentDidMount() {
      this._activateTab();
    }

    componentDidUpdate() {
      this._activateTab();
    }
  }

  CityTab.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onCityTabButtonClick: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired
  };

  return CityTab;
};

export default withTab;
