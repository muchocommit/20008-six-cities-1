import * as React from 'react';
import {Subtract} from 'utility-types';

import withActiveCityTab from './../../hocs/with-active-city-tab/with-active-city-tab';
import CityTab from './../../components/city-tab/city-tab';

const CityTabWrapped = withActiveCityTab(CityTab);

interface InjectedProps {
  renderTabs: (cityNames, handleTabClick) => typeof CityTabWrapped;
}

const withActiveCityTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class ActiveCityTab extends React.PureComponent<T, null> {
    _getTabs(cityNames, handleTabClick) {
      const {
        activateItem,
        isActiveItem} = this.props;

      return cityNames.map((it, i) =>
        <CityTabWrapped
          key={`city-${i}`}
          isActive={isActiveItem(i, true)}

          onCityTabButtonClick={() => {
            handleTabClick(i);
            activateItem(i);
          }}
          city={it}
        />);
    }

    render() {
      return (
        <Component
          {...this.props}
          renderTabs={(cityNames, handleTabClick) => this._getTabs(cityNames,
            handleTabClick)}
      />);
    }
  }

  return ActiveCityTab;
};

export default withActiveCityTabs;
