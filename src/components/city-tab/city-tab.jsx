import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class CityTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tabRef = createRef();

    this._onCityTabButtonClick = this._onCityTabButtonClick.bind(this);
  }

  _onCityTabButtonClick() {

    this.props.onCityTabButtonClick();
    this.props.reActivate();
  }

  _activateTab() {
    const tab = this._tabRef.current;

    if (this.props.isActive) {
      tab.className = `locations__item-link tabs__item--active`;
    } else {
      tab.className = `locations__item-link tabs__item`;
    }
  }

  render() {
    const {city} = this.props;

    return (
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

  componentDidMount() {
    this._activateTab();
  }

  componentDidUpdate() {
    this._activateTab();
  }
}

CityTab.propTypes = {
  reActivate: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCityTabButtonClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};
