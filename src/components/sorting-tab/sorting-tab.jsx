import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


export default class SortingTab extends PureComponent {
  constructor(props) {
    super(props);

    this._tab = createRef();
    this._clickHandler = this._clickHandler.bind(this);

    this.state = {
      activeItem: null
    };
  }

  _clickHandler(i) {

    this.setState({activeItem: i});
    this.props.clickHandler();
  }

  render() {
    const {filterParam, filterIndex} = this.props;

    return (<li ref={this._tab}
                className={this.state.activeItem ? `places__option` :
                  `places__option places__option--active`}
                tabIndex={filterIndex}
                onClick={this._clickHandler(filterIndex)}>{filterParam}</li>);
  }
}

SortingTab.propTypes = {
  filterParam: PropTypes.string.isRequired,
  filterIndex: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired
};
