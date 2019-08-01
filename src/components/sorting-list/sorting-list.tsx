import * as React from 'react';

import SortingTab from './../sorting-tab/sorting-tab';
import {SortingParams} from '../../data';

interface Props {
  filterHandler: () => void,
  isActiveItem: (index: number, isCityTab: boolean) => boolean,
  activateItem: (index: number) => void,
  deactivateItem: () => void
}

export default class SortingList extends React.PureComponent<Props, null> {
  private _formRef: React.RefObject<HTMLFormElement>;

  constructor(props) {
    super(props);

    this._formRef = React.createRef();
    this._toggleListVisibility = this._toggleListVisibility.bind(this);
  }

  _sortingListHandler(filterParam) {
    const form = this._formRef.current;

    const span = form.querySelector<HTMLSpanElement>(`.places__sorting-type`);
    span.firstChild.nodeValue = `\xa0${filterParam}`;
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
      activateItem, deactivateItem} = this.props;

    return (<form className="places__sorting" action="#" method="get" ref={this._formRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={this._toggleListVisibility}>
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
            isActiveItem={isActiveItem(key, true)}
            activateItem={() => activateItem(key)}
            deactivateItem={() => deactivateItem()}></SortingTab>);
        })}
      </ul>
    </form>);
  }
}
