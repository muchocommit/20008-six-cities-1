import * as React from 'react';

interface Props {
  renderOffer: () => void
}

export default class Offer extends React.PureComponent<Props, null> {

  render() {
    const {renderOffer} = this.props;

    return (
      <>
        {renderOffer()}
      </>
    );
  }
}
