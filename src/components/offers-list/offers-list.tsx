import * as React from 'react';

import {Offer} from '../../types';
import OfferCard from './../offer-card/offer-card';

import withActiveOfferCard from './../../hocs/with-active-offer-card/with-active-offer-card';

interface Props {
  // The CityName property is added into offers
  offers: Offer[],
  activateOffer: () => void
}

const OfferCardWrapped = withActiveOfferCard(OfferCard);

class OffersList extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  _getOffers() {
    const {
      offers,
      activateOffer} = this.props;

    return offers.map((it, i) => {

      return <OfferCardWrapped
        key={i}
        offer={it}
        index={it.id}
        isFavorite={it[`is_favorite`]}
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
