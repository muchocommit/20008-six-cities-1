import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Header from './../../components/header/header.jsx';

import {
  getFavoriteOffers,
  groupFavoriteOffersByCityName} from '../../reducers/data/data';

import OfferCard from './../../components/offer-card/offer-card.jsx';

export default class FavoritesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {bodyElement, offers, credentials} = this.props;
    bodyElement.className = `page`;

    // offers[0][0][`is_favorite`] = true;
    // offers[0][1][`is_favorite`] = true;
    // offers[1][0][`is_favorite`] = true;
    // offers[1][1][`is_favorite`] = true;

    const favoriteOffers = getFavoriteOffers(offers);

    if (favoriteOffers.length > 0) {
      const offersGroupedByCityNames = groupFavoriteOffersByCityName(favoriteOffers);

      return (<>
        <Header credentials={credentials} />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {Object.keys(offersGroupedByCityNames).map((cityName, cityKey) => {
                  return <li className="favorites__locations-items" key={`favorite-city-${cityKey}`}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offersGroupedByCityNames[cityName].map((offer, key) => {

                        return <OfferCard
                          key={`favorite-${key}`}
                          isFavorite={offer[`is_favorite`]}
                          offer={offer}/>;
                      })}
                    </div>
                  </li>;
                })}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </>);
    }

    return (<main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan yor future
              trips.</p>
          </div>
        </section>
      </div>
    </main>);
  }
}

FavoritesList.propTypes = {
  bodyElement: PropTypes.object.isRequired,
  offers: PropTypes.array.isRequired,
  credentials: PropTypes.object.isRequired
};
