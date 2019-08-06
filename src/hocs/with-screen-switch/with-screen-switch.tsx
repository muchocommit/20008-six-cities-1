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
  getAuthorizationAttempt,
  getCredentials,
  getAuthorizationStatus
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
    bookMarkIndex: number, isFavorite: boolean}) => void,

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
          <b className="places__found">{`${currentOffers ? `${currentOffers.length} places to stay in ${cityName}` : ``}`}</b>


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
        getActiveOffer} = this.props;

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
              cityNames={cityNames}
              handleTabClick={(activeCity) => onHandleTabClick(activeCity)}
            />);

        default:

          return (
            <OffersList

              activateOffer={activateOffer}
              offers={currentOffers}
              handleBookMarkClick={({bookMarkIndex, isFavorite}) =>
                onBookMarkButtonClick({bookMarkIndex, isFavorite})}
            />);
      }
    }

    _getHeader(credentials) {
      return <Header
        credentials={credentials}
      />;
    }

    _getScreen({credentials,
      isAuthorizationRequired,
      currentOffers, cityNames, activateOffer}) {

      const {
        city,
        bodyElement} = this.props;

      if (isAuthorizationRequired || credentials.id === null) {
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
          credentials, isAuthorizationRequired,
          currentOffers, cityNames, activateOffer})}

        renderHeader={() => this._getHeader(credentials)}
      />);
    }

    _getSignInScreen(
        {onAuthorizationScreenSubmit, bodyElement, credentials}) {

      return (<SignInScreen
        handleSubmit={(submitData) => onAuthorizationScreenSubmit(submitData)}
        bodyElement={bodyElement}
        credentials={credentials} />);
    }

    _getFavoritesScreen({credentials, bodyElement, offers, activateOffer}) {

      if (credentials.id === null) {
        return <Redirect to="/login"/>;
      }

      return <FavoritesList
        bodyElement={bodyElement}
        offers={offers}
        credentials={credentials}
        activateOffer={activateOffer}/>;
    }

    render() {
      const {
        credentials,
        cities,
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

      /** TODO: Later add pushState for history manipulation and correct GET url without offer */

      return <BrowserRouter>
        <Switch>
          <Route path={`/([0-9][0-9]?[0-9]?)`} render={({match}) => <OfferWrapped
            city={city}
            match={match}
            credentials={credentials}
            bodyElement={bodyElement}
            offers={offers}

            getActiveOffer={getActiveOffer}
            isActiveOffer={isActiveOffer}
            bookMarkClickHandler={onBookMarkButtonClick}/>} />

          <Route path="/favorites" render={() => this._getFavoritesScreen({
            credentials: storedCredentials, bodyElement, offers, activateOffer})}/>
          <Route path="/" exact render={() => this._getMainScreen({
            credentials: storedCredentials, isAuthorizationRequired,
            currentOffers, cityNames, activateOffer})} />

          <Route path="/login" exact render={() => this._getSignInScreen(
              {onAuthorizationScreenSubmit, bodyElement, credentials: storedCredentials})} />
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
      isAuthorizationFailed: getAuthorizationAttempt(state),
      isAuthorizationRequired: getAuthorizationStatus(state),
      credentials: getCredentials(state),
});

const mapDispatchToProps = (dispatch) => ({

  onBookMarkButtonClick: ({bookMarkIndex, isFavorite}) => {
    dispatch(DataAction.Operation.addBookMark({bookMarkIndex, isFavorite}))
      .then(() => {

        dispatch(DataAction.Operation.loadCities());
      })
      .catch(() => {
        dispatch(UserAction.Operation.checkAuth());
      });
  },

  // Here dispatch change to currentOffersDefault
  onHandleTabClick: (activeCity) => {
    return new Promise((resolve) =>
      resolve(dispatch(DataAction.ActionCreator.changeCity(activeCity))));
  },

  onAuthorizationScreenSubmit: (submitData) => {
    dispatch(UserAction.Operation.sendCredentials(submitData))
      .then((result) => {

        dispatch(UserAction.ActionCreator.getAuthorizationStatus(false));
        dispatch(UserAction.ActionCreator.sendCredentials(result));
      }).catch(() => {
        // If user is not Authorized, then redirect
        dispatch(UserAction.ActionCreator.getAuthorizationAttempt(true));
      });
  },

  checkAuthOnComponentMount: () => {
    dispatch(UserAction.Operation.checkAuth()).then(
        () => {
          dispatch(UserAction.ActionCreator.getAuthorizationStatus(false));
        })
        .catch(() => dispatch(UserAction.ActionCreator.getAuthorizationStatus(true)));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps),
  withScreenSwitch);


