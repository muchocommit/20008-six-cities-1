import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null
    };

    this._handleMouseOver = this._handleMouseOver.bind(this);
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this._getOffer()}
      </div>);
  }

  _handleMouseOver(e) {
    const {target} = e;

    this.setState({
      activeOffer: target.dataset.index
    });
  }

  _getOffer() {
    const {offers} = this.props;

    return offers[0].map((it, i) =>
      <OfferCard
        key={i}
        offer={it}
        mouseOverHandler={this._handleMouseOver}
        index={i}
      />);
  }
}

OffersList.propTypes = {
  offers: PropTypes.array.isRequired
};

export default OffersList;
