import * as React from 'react';

import {Offer, CityName} from '../../types';
import OfferCard from '../offer-card/offer-card';

interface Props {
  offers: Offer[] & CityName,
  handleBookMarkClick: () => void
}

class OffersList extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  _getOffers() {
    const {offers, handleBookMarkClick} = this.props;

    return offers.map((it, i) => {

      return <OfferCard
        key={i}
        offer={it}
        index={it.id}
        isFavorite={it[`is_favorite`]}
        bookMarkClickHandler={handleBookMarkClick}
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
