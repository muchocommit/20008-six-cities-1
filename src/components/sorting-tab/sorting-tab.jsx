import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


export default class SortingTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tab = createRef();

    this.state = {
      isActive: props.isActiveItem
    };

    this._onSortingTabMouseEnter = this._onSortingTabMouseEnter.bind(this);
    this._onSortingTabMouseOut = this._onSortingTabMouseOut.bind(this);
  }

  _activateTab() {
    const tab = this._tab.current;

    if (this.props.isActiveItem) {
      tab.style.backgroundColor = `#f2f2f2`;
    }
  }

  _deactivateTab() {
    const tab = this._tab.current;

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


    return (<li ref={this._tab}
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

SortingTab.propTypes = {
  filterParam: PropTypes.string.isRequired,
  filterIndex: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  sortingListHandler: PropTypes.func.isRequired,
  isActiveItem: PropTypes.bool.isRequired,
  activateItem: PropTypes.func.isRequired,
  deactivateItem: PropTypes.func.isRequired
};
