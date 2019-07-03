import React, {PureComponent, createRef} from 'react';
import SortingTab from './../sorting-tab/sorting-tab.jsx';

import PropTypes from 'prop-types';

import {SortingParams} from '../../data';

export default class SortingList extends PureComponent {
  constructor(props) {
    super(props);


    this._formRef = createRef();
    this._toggleListVisibility = this._toggleListVisibility.bind(this);
    this._handleFilter = this._handleFilter.bind(this);
  }

  _handleFilter() {


  }

  _toggleListVisibility() {
    const form = this._formRef.current;
    const list = form.querySelector(`.places__options--custom`);

    if (list.classList.contains(`places__options--opened`)) {

      list.className = `places__options places__options--custom`;
    } else {
      list.className = `places__options places__options--custom places__options--opened`;
    }
  }

  render() {

    return (<form className="places__sorting" action="#" method="get" ref={this._formRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={this._toggleListVisibility}>
                        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.keys(SortingParams).map((it, key) =>

          <SortingTab
            key={`filterParam-${key}`}
            filterParam={SortingParams[it]}
            filterIndex={key}
            clickHandler={
              () => this._handleFilter(SortingParams[it])
            }></SortingTab>)}
      </ul>
    </form>);
  }
}

SortingList.propTypes = {
  offers: PropTypes.array
};
