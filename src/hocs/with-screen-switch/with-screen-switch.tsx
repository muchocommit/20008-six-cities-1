import * as React from 'react';
import {compose} from 'recompose';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as DataAction from '../../reducers/data/data';
import * as UserAction from '../../reducers/user/user';

import Header from './../../components/header/header';
import CitiesList from './../../components/cities-list/cities-list';
import OffersList from './../../components/offers-list/offers-list';
import Map from './../../components/map/map';
import {OffersEmpty} from '../../components/offers-empty/offers-empty';
import SignInScreen from './../../components/sign-in/sign-in';

import Offer from './../../components/offer/offer';
import FavoritesList from './../../components/favorites-list/favorites-list';
import SortingList from './../../components/sorting-list/sorting-list';

import {
  getCity,
  getCities,
  combineOffers,
  combineCurrentOffers,
  combineCityNames} from '../../reducers/data/selectors';

import {
  getAuthorizationFailed,
  getCredentials,
  getAuthorizationRequired
} from '../../reducers/user/selectors';

import withActiveItem from './../../hocs/with-active-item/with-active-item';
import withActiveCityTabs from './../../hocs/with-active-city-tabs/with-active-city-tabs';

import withActiveOffer from './../../hocs/with-active-offer/with-active-offer';
import withActiveSortingList from './../../hocs/with-active-sorting-list/with-active-sorting-list';

const CitiesListWrapped = withActiveItem(withActiveCityTabs(CitiesList));
const SortingListWrapped = withActiveItem(withActiveSortingList(SortingList));

const OfferWrapped = withActiveOffer(Offer);

import {
  Offer as OfferProp,
  SignIn, Credentials, CityName
} from './../../types';

interface Props {
  city: number,
  cities: OfferProp[]
  offers: OfferProp[] & CityName,
  currentOffers: OfferProp[] & CityName,
  cityNames: CityName[],

  onAuthorizationScreenSubmit:(submitData: SignIn) => void
  onHandleTabClick: (cityIndex: number) => void,
  bodyElement: HTMLBodyElement,
  credentials: Credentials,
  onBookMarkButtonClick: (bookMarkObject: {
    bookMarkIndex: number,
    isFavorite: boolean,
    isAuthorizationRequired: boolean}) => void,

  getActiveOffer: () => number,
  activateOffer: () => void,
  deactivateOffer: () => void,
  isActiveOffer:(i: number, isCityTab: boolean) => void,

  isAuthorizationFailed: boolean,
  isAuthorizationRequired: boolean,
  checkAuthOnComponentMount: () => void,
}

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent<Props, null> {
    constructor(props) {
      super(props);

      this._getHeader = this._getHeader.bind(this);
      this._getScreen = this._getScreen.bind(this);
      this._getFavoritesScreen = this._getFavoritesScreen.bind(this);
    }

    _getContainer({currentOffers, cityName, activateOffer}) {
      if (currentOffers.length === 0) {
        return (<OffersEmpty />);
      }

      return (<div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{`${currentOffers ? `${currentOffers.length}
           places to stay in ${cityName}` : ``}`}</b>


          <SortingListWrapped />

          {this._getComponent({key: `OFFERS`, currentOffers, activateOffer})}

        </section>
        <div className="cities__right-section">

          <section className="cities__map map">
            {this._getComponent({key: `LOCATIONS`, currentOffers})}
          </section>
        </div>
      </div>);
    }
    _getComponent({key, currentOffers = [],
                    cityNames = [], activateOffer = () => {}}) {

      const {onHandleTabClick,
        onBookMarkButtonClick,
        getActiveOffer, deactivateOffer, isAuthorizationRequired} = this.props;

      switch (key) {
        case `LOCATIONS`:
          if (currentOffers.length !== 0) {
            const locations = DataAction.getLocations(currentOffers);

            return (
              <Map
                getActiveOffer={getActiveOffer}
                locations={locations}
                mapId={`map`}
              />);
          }
          break;

        case `CITY_NAMES`:
          return (
            <CitiesListWrapped
              deactivateOffer={deactivateOffer}
              cityNames={cityNames}
              handleTabClick={(activeCity) => onHandleTabClick(activeCity)}
            />);

        default:

          return (
            <OffersList
              activateOffer={activateOffer}
              offers={currentOffers}
              isAuthorizationRequired={isAuthorizationRequired}
              handleBookMarkClick={({bookMarkIndex, isFavorite, isAuthorizationRequired}) =>
                onBookMarkButtonClick({bookMarkIndex, isFavorite, isAuthorizationRequired})}
            />);
      }
    }

    _getHeader({credentials, isAuthorizationRequired}) {
      return <Header
        credentials={credentials}
        isAuthorizationRequired={isAuthorizationRequired}
      />;
    }

    _getScreen({isAuthorizationRequired,
      currentOffers, cityNames, activateOffer}) {

      const {
        city,
        bodyElement} = this.props;

      if (isAuthorizationRequired) {
        return <Redirect to="/login"/>;
      }

      bodyElement.className = `page page--gray page--main`;
      return (
          <>
            <h1 className="visually-hidden">Cities</h1>
            <div className="cities tabs">
              <section className="locations container">
                {this._getComponent({key: `CITY_NAMES`, cityNames})}
              </section>
            </div>
            <div className="cities__places-wrapper">
              {this._getContainer({currentOffers, cityName: cityNames[city],
                activateOffer})}
            </div>
          </>);
    }

    _getMainScreen({credentials,
      isAuthorizationRequired,
      currentOffers, cityNames, activateOffer}) {

      return (<Component
        {...this.props}
        renderScreen={() => this._getScreen({
          isAuthorizationRequired, currentOffers,
          cityNames, activateOffer})}

        renderHeader={() => this._getHeader({
          credentials, isAuthorizationRequired})}
      />);
    }

    _getSignInScreen(
        {onAuthorizationScreenSubmit, bodyElement}) {

      return (<SignInScreen
        handleSubmit={(submitData) => onAuthorizationScreenSubmit(submitData)}
        bodyElement={bodyElement}
      />);
    }

    _getFavoritesScreen({credentials, bodyElement, offers,
                          activateOffer, onBookMarkButtonClick,
                          isAuthorizationRequired}) {

      if (isAuthorizationRequired) {
        return <Redirect to="/login"/>;
      }

      return <FavoritesList
        bodyElement={bodyElement}
        offers={offers}
        credentials={credentials}
        activateOffer={activateOffer}
        handleBookMarkClick={({bookMarkIndex, isFavorite, isAuthorizationRequired}) =>
          onBookMarkButtonClick({bookMarkIndex, isFavorite, isAuthorizationRequired})}
        isAuthorizationRequired={isAuthorizationRequired}/>;
    }

    render() {
      const {
        credentials,
        city,
        offers,
        currentOffers,
        cityNames,

        getActiveOffer,
        isActiveOffer,
        activateOffer,

        onAuthorizationScreenSubmit,
        isAuthorizationRequired,
        onBookMarkButtonClick,
        bodyElement
      } = this.props;

      const storedCredentials = UserAction.getCredentials(credentials);

      return <BrowserRouter>
        <Switch>
          <Route path={`/([0-9]+)`} exact render={({match}) => <OfferWrapped
            city={city}
            match={match}
            credentials={credentials}
            bodyElement={bodyElement}
            offers={offers}
            isAuthorizationRequired={isAuthorizationRequired}


            getActiveOffer={getActiveOffer}
            isActiveOffer={isActiveOffer}
            bookMarkClickHandler={onBookMarkButtonClick}
            activateOffer={activateOffer} />} />

          <Route path="/favorites/" exact render={() => this._getFavoritesScreen({
            credentials: storedCredentials, bodyElement,
            offers, activateOffer, onBookMarkButtonClick, isAuthorizationRequired})}/>

          <Route path="/" exact render={() => this._getMainScreen({
            credentials: storedCredentials, isAuthorizationRequired,
            currentOffers, cityNames, activateOffer})} />

          <Route path="/login" exact render={() => this._getSignInScreen(
              {onAuthorizationScreenSubmit, bodyElement})} />
        </Switch>
      </BrowserRouter>;
    }

    componentDidMount() {
      const {checkAuthOnComponentMount} = this.props;
      checkAuthOnComponentMount();
    }
  }

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {
      city: getCity(state),
      cities: getCities(state),
      offers: combineOffers(state),
      currentOffers: combineCurrentOffers(state),

      cityNames: combineCityNames(state),
      isAuthorizationFailed: getAuthorizationFailed(state),
      isAuthorizationRequired: getAuthorizationRequired(state),
      credentials: getCredentials(state),
});

const mapDispatchToProps = (dispatch) => ({

  onBookMarkButtonClick: ({bookMarkIndex, isFavorite, isAuthorizationRequired}) => {

    if (isAuthorizationRequired) {

      dispatch(UserAction.ActionCreator.setAuthorizationRequired(true));
      return;
    }
    dispatch(DataAction.Operation.addBookMark({bookMarkIndex, isFavorite}))
      .then(() => {
        dispatch(DataAction.Operation.loadCities());
      })
      .catch(() => {

        dispatch(UserAction.ActionCreator.setAuthorizationRequired(true));
      });
  },

  onHandleTabClick: (activeCity) => {
    return new Promise((resolve) =>
      resolve(dispatch(DataAction.ActionCreator.changeCity(activeCity))));
  },

  onAuthorizationScreenSubmit: (submitData) => {
    dispatch(UserAction.Operation.postCredentials(submitData))
      .then((result) => {

        dispatch(UserAction.ActionCreator.setAuthorizationRequired(false));
        dispatch(UserAction.ActionCreator.setCredentials(result));
      }).catch(() => {

        // If user is not Authorized, then redirect
        dispatch(UserAction.ActionCreator.setAuthorizationFailed(true));
      });
  },

  checkAuthOnComponentMount: () => {
    dispatch(UserAction.Operation.checkAuth()).then(
        (result) => {

          dispatch(UserAction.ActionCreator.setCredentials(result));
          dispatch(UserAction.ActionCreator.setAuthorizationRequired(false));
        })
        .catch(() => {
          dispatch(UserAction.ActionCreator.setAuthorizationRequired(true));
        });
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps),
  withScreenSwitch);


