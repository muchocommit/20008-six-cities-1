import * as React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import SortingTab from './../../components/sorting-tab/sorting-tab';
import {SortingParams} from '../../data';

import {getFilterParam} from '../../reducers/data/selectors';
import * as DataAction from '../../reducers/data/data';

interface Props {
  onFilterCities: (filterParam: {filterParam: string}) => void
  isActiveItem: (index: number, isCityTab: boolean) => boolean,
  activateItem: (index: number) => void,
  deactivateItem: () => void
}

const withActiveSortingList = (Component) => {
  class SortingList extends React.PureComponent<Props, null> {
    private _formRef: React.RefObject<HTMLFormElement>;

    constructor(props) {
      super(props);

      this._formRef = React.createRef();
      this._toggleListVisibility = this._toggleListVisibility.bind(this);
      this._getScreen = this._getScreen.bind(this);
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

    _getScreen() {
      const {onFilterCities, isActiveItem,
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

              clickHandler={(filterParam) => onFilterCities({filterParam})}
              isActiveItem={isActiveItem(key, true)}
              activateItem={() => activateItem(key)}
              deactivateItem={() => deactivateItem()}></SortingTab>);
          })}
        </ul>
      </form>);
    }

    render() {
      return <Component
        {...this.props}

        renderSortingList={this._getScreen}
      />
    }
  }

  return SortingList;
};

const mapStateToProps = (state, ownProps) => Object.assign(
  {}, ownProps, {
    filterParam: getFilterParam(state)
});

const mapDispatchToProps = (dispatch) => ({

  onFilterCities: ({filterParam}) => {
    switch (filterParam) {

      case SortingParams.LOW_TO_HIGH:
        dispatch(DataAction.ActionCreator.getFilterParam(SortingParams.LOW_TO_HIGH));
        break;

      case SortingParams.HIGH_TO_LOW:
        dispatch(DataAction.ActionCreator.getFilterParam(SortingParams.HIGH_TO_LOW));
        break;

      case SortingParams.TOP_RATED:
        dispatch(DataAction.ActionCreator.getFilterParam(SortingParams.TOP_RATED));
        break;

      default:
        dispatch(DataAction.ActionCreator.getFilterParam(SortingParams.POPULAR));
        break;
    }
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withActiveSortingList);

