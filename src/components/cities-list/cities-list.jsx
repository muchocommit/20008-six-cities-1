import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import CityTab from './../city-tab/city-tab.jsx';

export default class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    };
  }

  _getTabs() {
    const {
      cityNames,
      handleTabClick,
      activateItem,
      isActive} = this.props;

    return cityNames.map((it, i) =>
      <CityTab
        key={`city-${i}`}
        isActive={isActive(i)}

        onCityTabButtonClick={() => {
          handleTabClick(i);

          activateItem(i);
        }}
        city={it}
      />);
  }

  render() {

    return (
      <ul className="locations__list tabs__list">
        {this._getTabs()}
      </ul>);
  }
}

CitiesList.propTypes = {
  activateItem: PropTypes.func.isRequired,
  isActive: PropTypes.func.isRequired,
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTabClick: PropTypes.func.isRequired
};
