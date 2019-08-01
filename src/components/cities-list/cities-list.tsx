import * as React from 'react';
import {CityName} from '../../types';

interface Props {
  handleTabClick: () => void,
  cityNames: CityName[],
  renderTabs: (cityNames: CityName[],
               handleTabClick: () => void) => React.ReactElement
}

class CitiesList extends React.PureComponent<Props, null> {

  render() {
    const {renderTabs, cityNames, handleTabClick} = this.props;

    return (
      <ul className="locations__list tabs__list">
        {renderTabs(cityNames, handleTabClick)}
      </ul>);
  }
}

export default CitiesList;
