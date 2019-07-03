import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


export default class SortingTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tab = createRef();

  }

  render() {
    const {filterParam, filterIndex} = this.props;

    return (<li ref={this._tab}
      className={`places__option`}
      tabIndex={filterIndex}
    >{filterParam}</li>);
  }
}

SortingTab.propTypes = {
  filterParam: PropTypes.string.isRequired,
  filterIndex: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired
};
