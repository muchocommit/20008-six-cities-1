import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class CityTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tabRef = createRef();

    this.state = {
      isActive: props.isActive
    };

    this._onCityTabClick = this._onCityTabClick.bind(this);
  }

  _onCityTabClick() {

    this.props.onCityTabClick();
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

  render() {
    const {city} = this.props;

    return (
      <li className="locations__item">
        <a className={`locations__item-link tabs__item`}
          href="#"
          onClick={this._onCityTabClick}
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
  isActive: PropTypes.bool.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};
