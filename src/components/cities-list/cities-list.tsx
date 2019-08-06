import * as React from 'react';
import {CityName} from '../../types';

interface Props {
  deactivateOffer: () => void,
  handleTabClick: () => void,
  cityNames: CityName[],
  renderTabs: (cityNames: CityName[],
               handleTabClick: () => void,
               deactivateOffer: () => void) => React.ReactElement
}

class CitiesList extends React.PureComponent<Props, null> {

  render() {
    const {
      renderTabs,
      cityNames,
      handleTabClick, deactivateOffer} = this.props;

    return (
      <ul className="locations__list tabs__list">
        {renderTabs(cityNames, handleTabClick, deactivateOffer)}
      </ul>);
  }
}

export default CitiesList;
