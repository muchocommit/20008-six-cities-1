import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


export default class SortingTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tab = createRef();

    this.state = {
      isActive: props.isActive
    };
  }

  _activateTab() {
    const tab = this._tab.current;

    if (this.props.isActive) {
      tab.style.backgroundColor = `#f2f2f2`;
    }
  }

  _onSortingTabMouseOver() {

    this.props.activateItem();
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    const {
      filterParam,
      filterIndex,
      clickHandler,
      sortingListHandler,
      isActiveItem} = this.props;

    console.log(isActiveItem);

    return (<li ref={this._tab}
      className={`places__option`}
      tabIndex={filterIndex}
      onClick={() => {
        clickHandler(filterParam);
        sortingListHandler(filterParam);
      }}
      onMouseEnter={() => this._onSortingTabMouseOver}
    >{filterParam}</li>);
  }

  componentDidMount() {
    this._activateTab();
  }
}

SortingTab.propTypes = {
  filterParam: PropTypes.string.isRequired,
  filterIndex: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  sortingListHandler: PropTypes.func.isRequired,
  isActiveItem: PropTypes.bool.isRequired
};
