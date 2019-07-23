import * as React from 'react';

interface Props {
  renderTab: () => void
}

export default class CityTab extends React.PureComponent<Props, null> {

  render() {
    const {renderTab} = this.props;

    return (
      <>
        {renderTab()}
      </>
    );
  }
}
