import * as React from 'react';
import {Link} from 'react-router-dom';

import {Offer} from '../../types';
import {getRating} from '../../assets/handler';

interface Props {
  isFavorite: boolean,
  offer: Offer,
  bookMarkClickHandler?: (bookMarkObject: {
    bookMarkIndex: number, isFavorite: boolean}) => void,
  index?: number,
  activateOffer: (i: number) => void
}

export default class OfferCard extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._activateOffer = this._activateOffer.bind(this);
    this._getCardScreen = this._getCardScreen.bind(this);
  }

  static _getPropertyMark(isPremium) {
    return isPremium ? `Premium` : `Mid-price`;
  }

  _activateOffer(index) {
    this.props.activateOffer(index);
  }

  _getCardScreen() {
    const {isFavorite, offer, bookMarkClickHandler, index} = this.props;

      return (<article className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>{OfferCard._getPropertyMark(offer[`is_premium`])}</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper" onClick={() => this._activateOffer(offer.id)}>
            <img className="place-card__image" src={offer[`preview_image`]} width="260" height="200"
              alt="Place image"/>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={isFavorite ? `place-card__bookmark-button--active button` : `place-card__bookmark-button button`}
              type="button" onClick={() => bookMarkClickHandler({bookMarkIndex: index, isFavorite})}>

              <svg className="place-card__bookmark-icon" width="17" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
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
            <Link className="place-card__link" to={`/${offer.id}`}>{offer.title}</Link>
          </h2>
          <p className="place-card__type">{offer.type}</p>
        </div>
      </article>);
  }

  render() {
    return (
      <>{this._getCardScreen()}</>
    );
  }
}


