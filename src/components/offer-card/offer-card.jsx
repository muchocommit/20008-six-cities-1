import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {getRating} from '../../assets/handler';

export default class OfferCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      offer,
      mouseOverHandler,
      index
    } = this.props;

    return (
      <article className="cities__place-card place-card" onMouseEnter={mouseOverHandler} data-index={index}>
        <div className="place-card__mark">
          <span>{offer.mark}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={offer.src} width="260" height="200"
              alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price.value}</b>
              <span className="place-card__price-text">&#47;&nbsp;{offer.price.period}</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${getRating(offer.rating)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a className="place-card__link" href="#">{offer.name}</a>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  offer: PropTypes.shape({
    mark: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ratings: PropTypes.arrayOf(PropTypes.oneOf([1, 2, 3, 4, 5])).isRequired,
    price: PropTypes.shape({
      period: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  }),
  mouseOverHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
