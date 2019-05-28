import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as Action from '../../reducers/reducer';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from './../map/map.jsx';

class App extends Component {
  _getComponent(key) {
    const city = this.props.city || 0;
    const {cities, onHandleTabClick} = this.props;

    switch (key) {
      case `LOCATIONS`:

        return (
          <Map
            locations={Action.getLocationsByCity(cities, city)}
            id={`map`}
          />);

      case `CITY_NAMES`:
        const cityNames = cities.map((it) => it.city);

        return (
          <CitiesList
            cityNames={cityNames}
            handleTabClick={(activeCity) => onHandleTabClick(activeCity)}
          />);

      case `OFFERS`:
        return (
          <OffersList offers={Action.getOffersByCity(cities, city)}
          />);
    }

    return cities;
  }

  _getScreen() {

    return (<Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          {this._getComponent(`CITY_NAMES`)}
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                    Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
            </form>

            {this._getComponent(`OFFERS`)}

          </section>
          <div className="cities__right-section">

            <section className="cities__map map">
              {this._getComponent(`LOCATIONS`)}
            </section>
          </div>
        </div>
      </div>
    </Fragment>);
  }

  render() {

    return (
      <div>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-arrow-select" viewBox="0 0 7 4">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
            </symbol>
            <symbol id="icon-bookmark" viewBox="0 0 17 18">
              <path
                d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
            </symbol>
            <symbol id="icon-star" viewBox="0 0 13 12">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
            </symbol>
          </svg>
        </div>

        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          {this._getScreen()}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  cities: PropTypes.array.isRequired,
  city: PropTypes.number.isRequired,
  onHandleTabClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {city: state.city});

const mapDispatchToProps = (dispatch) => ({

  onHandleTabClick: (activeCity) => {
    dispatch(Action.ActionCreator.changeCity(activeCity));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
