import React, {Component} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null
    };
  }

  _getOffer() {
    const handler = (e) => {
      const {target} = e;
      this.setState({
        activeOffer: target.dataset.index
      });
    };
    const {offers} = this.props;

    return offers.map((it, i) =>
      <OfferCard
        key={i}
        offer={it}
        mouseOverHandler={handler}
        index={i}
      />);
  }

  render() {

    return (
      <div className="cities__places-list places__list tabs__content">
        {this._getOffer()}
      </div>);
  }
}

OffersList.propTypes = {
  offers: PropTypes.array.isRequired
};

export default OffersList;
