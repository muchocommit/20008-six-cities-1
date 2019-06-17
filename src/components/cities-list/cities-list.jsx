import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import CityTab from './../city-tab/city-tab.jsx';

import withActiveItem from './../../hocs/with-active-item/with-active-item';

// const CityTabWrapped = withActiveItem(CityTab);

export default class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: null
    };
  }

  _getTabs() {
    const {cityNames, handleTabClick} = this.props;

    return cityNames.map((it, i) =>
      <CityTab
        key={`city-${i}`}
        isActive={i === this.state.activeTab ||
        (i === 0 && this.state.activeTab === null)}

        onCityTabButtonClick={() => {
          handleTabClick(i);

          this.setState({
            activeTab: i
          });
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
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTabClick: PropTypes.func.isRequired
};
