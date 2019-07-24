import * as React from 'react';

import withActiveCityTab from './../../hocs/with-active-city-tab/with-active-city-tab';
import CityTab from './../city-tab/city-tab';

const CityTabWrapped = withActiveCityTab(CityTab);

interface Props {
  cityNames: string[],
  handleTabClick: (index: number) => void,
  activateItem: (index: number) => void,
  isActiveItem: (index: number, isCityTab: boolean) => boolean
}

class CitiesList extends React.PureComponent<Props, null> {
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

export default CitiesList;
