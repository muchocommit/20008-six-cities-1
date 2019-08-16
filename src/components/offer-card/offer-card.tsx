import * as React from 'react';

interface Props {
  renderOfferCard: () => void
}

export default class Offer extends React.PureComponent<Props, null> {

  render() {
    const {renderOfferCard} = this.props;

    return (
      <>
        {renderOfferCard()}
      </>
    );
  }
}
