import * as React from 'react';

import {Offer} from '../../types';
import OfferCard from '../offer-card/offer-card';

interface Props {
  // The actual CityName property is present in offers
  offers: Offer[],
  handleBookMarkClick: ({bookMarkIndex, isFavorite}) => void,
  activateOffer: () => void
}

class OffersList extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  _getOffers() {
    const {offers, handleBookMarkClick, activateOffer} = this.props;

    return offers.map((it, i) => {

      return <OfferCard
        key={i}
        offer={it}
        index={it.id}
        isFavorite={it[`is_favorite`]}
        bookMarkClickHandler={handleBookMarkClick}
        activateOffer={activateOffer}
      />;
    });
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this._getOffers()}
      </div>);
  }
}

export default OffersList;
