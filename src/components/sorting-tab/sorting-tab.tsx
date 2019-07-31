import * as React from 'react';

interface Props {
  filterParam: string,
  filterIndex: number,
  clickHandler: (filterParam: string) => void,
  sortingListHandler: (filterParam: string) => void,
  isActiveItem: boolean,
  activateItem: () => void,
  deactivateItem: () => void
}

interface State {
  isActive: boolean
}

export default class SortingTab extends React.PureComponent<Props, State> {
  private _tabRef: React.RefObject<HTMLLIElement>;

  constructor(props) {
    super(props);

    this._tabRef = React.createRef();

    this.state = {
      isActive: props.isActiveItem
    };

    this._onSortingTabMouseEnter = this._onSortingTabMouseEnter.bind(this);
    this._onSortingTabMouseOut = this._onSortingTabMouseOut.bind(this);
  }

  _activateTab() {
    const tab = this._tabRef.current;

    if (this.props.isActiveItem) {
      tab.style.backgroundColor = `#f2f2f2`;
    }
  }

  _deactivateTab() {
    const tab = this._tabRef.current;

    if (!this.props.isActiveItem) {
      tab.style.backgroundColor = `#ffffff`;
    }
  }

  _onSortingTabMouseEnter() {

    this.props.activateItem();
    this.setState({isActive: !this.state.isActive});
  }

  _onSortingTabMouseOut() {

    this.props.deactivateItem();
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    const {
      filterParam,
      filterIndex,
      clickHandler,
      sortingListHandler
    } = this.props;


    return (<li ref={this._tabRef}
      className={`places__option`}
      tabIndex={filterIndex}
      onClick={() => {

        clickHandler(filterParam);
        sortingListHandler(filterParam);
      }}
      onMouseEnter={this._onSortingTabMouseEnter}
      onMouseOut={this._onSortingTabMouseOut}
    >{filterParam}</li>);
  }

  componentDidMount() {
    this._activateTab();
    this._deactivateTab();
  }

  componentDidUpdate() {
    this._activateTab();
    this._deactivateTab();
  }
}
