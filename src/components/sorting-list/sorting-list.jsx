import React, {PureComponent, createRef} from 'react';

import SortingTab from './../sorting-tab/sorting-tab.jsx';
import PropTypes from 'prop-types';

import {SortingParams} from '../../data';


export default class SortingList extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();
    this._toggleListVisibility = this._toggleListVisibility.bind(this);
  }

  _sortingListHandler(filterParam) {
    const form = this._formRef.current;

    const span = form.querySelector(`.places__sorting-type`);
    span.firstChild.data = `\xa0${filterParam}`;
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

    const {filterHandler, isActiveItem,
      activateItem} = this.props;


    return (<form className="places__sorting" action="#" method="get" ref={this._formRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={this._toggleListVisibility}>
                        &nbsp;Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom">
        {Object.keys(SortingParams).map((it, key) => {


          return (<SortingTab
            key={`filterParam-${key}`}
            filterParam={SortingParams[it]}
            filterIndex={key}
            sortingListHandler={(filterParam) => this._sortingListHandler(filterParam)}
            clickHandler={filterHandler}
            isActiveItem={isActiveItem(key)}
            activateItem={() => activateItem(key)}></SortingTab>);
        })}
      </ul>
    </form>);
  }
}

SortingList.propTypes = {
  filterHandler: PropTypes.func.isRequired,
  isActiveItem: PropTypes.func.isRequired,
  activateItem: PropTypes.func.isRequired
};
