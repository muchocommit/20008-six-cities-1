import * as React from 'react';

interface Props {
  renderSortingList: () => void
}

export default class SortingList extends React.PureComponent<Props, null> {
  render() {
    const {renderSortingList} = this.props;

    return (
      <>
        {renderSortingList()}
      </>
    );
  }
}
