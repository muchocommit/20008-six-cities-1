import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import withActiveCityTab from './../../hocs/with-active-city-tab/with-active-city-tab';
import CityTab from './../city-tab/city-tab.jsx';


const CityTabWrapped = withActiveCityTab(CityTab);

export default class CitiesList extends PureComponent {
  _getTabs() {
    const {
      cityNames,
      handleTabClick,
      activateItem,
      isActiveItem} = this.props;


    return cityNames.map((it, i) =>
      <CityTabWrapped
        key={`city-${i}`}
        isActive={isActiveItem(i, false)}

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
  isActiveItem: PropTypes.func.isRequired,
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTabClick: PropTypes.func.isRequired
};
