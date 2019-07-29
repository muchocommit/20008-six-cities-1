import * as React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

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

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
  handleBookMarkClick: PropTypes.func.isRequired
};

export default OffersList;
