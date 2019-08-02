import * as React from 'react';

interface Props {
  renderScreen: () => void
}

export default class Offer extends React.PureComponent<Props, null> {

  render() {
    const {renderScreen} = this.props;

    return (
      <>
        {renderScreen()}
      </>
    );
  }
}
