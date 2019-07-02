import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMouseOver = this._handleMouseOver.bind(this);
  }

  _handleMouseOver(e) {
    let {target} = e;
    const {activateItem} = this.props;

    if (target.dataset.index) {
      return activateItem(target.dataset.index);
    }

    while (target !== `ARTICLE`) {
      if (target.parentNode.dataset.index) {

        return activateItem(target.parentNode.dataset.index);
      }

      target = target.parentNode;
    }

    return null;
  }

  _getOffers() {
    const {offers, handleBookMarkClick} = this.props;

    return offers.map((it, i) => {

      return <OfferCard
        key={i}
        offer={it}
        mouseOverHandler={this._handleMouseOver}
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
  activateItem: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  handleBookMarkClick: PropTypes.func.isRequired
};

export default OffersList;
