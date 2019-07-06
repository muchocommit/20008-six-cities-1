import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


export default class SortingTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tab = createRef();

    this.state = {
      isActive: props.isActiveItem
    };

    this._onSortingTabMouseOver = this._onSortingTabMouseOver.bind(this);
  }

  _activateTab() {
    const tab = this._tab.current;

    if (this.props.isActiveItem) {
      tab.style.backgroundColor = `#f2f2f2`;
    } else {
      tab.style.backgroundColor = `#ffffff`;
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
      sortingListHandler
    } = this.props;


    return (<li ref={this._tab}
      className={`places__option`}
      tabIndex={filterIndex}
      onClick={() => {
        clickHandler(filterParam);
        sortingListHandler(filterParam);
      }}
      onMouseEnter={this._onSortingTabMouseOver}
    >{filterParam}</li>);
  }

  componentDidMount() {
    this._activateTab();
  }

  componentDidUpdate() {
    this._activateTab();
  }
}

SortingTab.propTypes = {
  filterParam: PropTypes.string.isRequired,
  filterIndex: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  sortingListHandler: PropTypes.func.isRequired,
  isActiveItem: PropTypes.bool.isRequired,
  activateItem: PropTypes.func.isRequired
};
