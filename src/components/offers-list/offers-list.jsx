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

    while (target !== `ARTICLE`) {
      if (target.parentNode.dataset.index) {

        activateItem(target.parentNode.dataset.index);
        return;
      }

      target = target.parentNode;
    }
  }

  _getOffers() {
    const {offers} = this.props;

    return offers.map((it, i) =>
      <OfferCard
        key={i}
        offer={it}
        mouseOverHandler={this._handleMouseOver}
        index={i}
      />);
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
  offers: PropTypes.array.isRequired
};

export default OffersList;
