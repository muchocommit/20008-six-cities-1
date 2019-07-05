import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {SortingParams} from "../../data";

import * as DataAction from '../../reducers/data/data';
import * as UserAction from '../../reducers/user/user';

import Header from './../../components/header/header.jsx';
import CitiesList from './../../components/cities-list/cities-list.jsx';
import OffersList from './../../components/offers-list/offers-list.jsx';
import Map from './../../components/map/map.jsx';
import {OffersEmpty} from './../../components/offers-empty/offers-empty.jsx';
import SignInScreen from './../../components/sign-in/sign-in.jsx';
import Offer from './../../components/offer/offer.jsx';

import FavoritesList from './../../components/favorites-list/favorites-list.jsx';
import SortingList from './../../components/sorting-list/sorting-list.jsx';

import {
  getCity,
  getCities,
  combineOffers,
  combineCurrentOffers, combineCityNames} from '../../reducers/data/selectors';

import {
  getAuthorizationAttempt,
  getCredentials,
  getAuthorizationStatus,
  getComments,
  getCommentsDeployAttempt} from '../../reducers/user/selectors';

import PropTypes from 'prop-types';
import withActiveItem from './../../hocs/with-active-item/with-active-item';

const CitiesListWrapped = withActiveItem(CitiesList);
const OffersListWrapped = withActiveItem(OffersList);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getHeader = this._getHeader.bind(this);
      this._getScreen = this._getScreen.bind(this);
      this._sortOffers = this._sortOffers.bind(this);
    }

    _sortOffers(citesToSort, filterParam) {


    }

    _getContainer({offers, cityName}) {
      if (offers && offers.length === 0) {
        return (<OffersEmpty />);
      }

      const {cities, onFilterCities} = this.props;

      return (<div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{`${offers ? `${offers.length} places to stay in ${cityName}` : ``}`}</b>


          {/*<SortingList cities={cities} filterHandler={(citiesToSort, filterParam) =>*/}
          {/*  this._sortOffers(citiesToSort, filterParam)}></SortingList>*/}

          {this._getComponent({key: `OFFERS`, offers})}

        </section>
        <div className="cities__right-section">

          <section className="cities__map map">
            {this._getComponent({key: `LOCATIONS`, offers})}
          </section>
        </div>
      </div>);
    }
    _getComponent({key,
      offers = [],
      cityNames}) {

      const {onHandleTabClick, onBookMarkButtonClick} = this.props;

      switch (key) {
        case `LOCATIONS`:

          if (offers.length !== 0) {
            const locations = DataAction.getLocations(offers);

            return (
              <Map
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
            <OffersListWrapped
              offers={offers}
              handleBookMarkClick={({bookMarkIndex, isFavorite}) =>
                onBookMarkButtonClick({bookMarkIndex, isFavorite})}
            />);
      }

      return null;
    }

    _getHeader(credentials) {
      return <Header
        credentials={credentials}
      />;
    }

    _getScreen({credentials, isAuthorizationRequired, offers, cityNames}) {
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
              {this._getContainer({offers, cityName: cityNames[city]})}
            </div>
          </>);
    }

    _getMainScreen({credentials, isAuthorizationRequired, offers, cityNames}) {
      return (<Component
        {...this.props}
        renderScreen={() => this._getScreen({
          credentials, isAuthorizationRequired, offers, cityNames})}
        renderHeader={() => this._getHeader(credentials, isAuthorizationRequired)}
      />);
    }

    _getSignInScreen(
        {onAuthorizationScreenSubmit, bodyElement, credentials}) {

      return (<SignInScreen
        handleSubmit={(submitData) => onAuthorizationScreenSubmit(submitData)}
        bodyElement={bodyElement}
        credentials={credentials} />);
    }

    _getFavoritesScreen({credentials, bodyElement, offers}) {
      if (credentials.id === null) {
        return <Redirect to="/login"/>;
      }

      return <FavoritesList
        bodyElement={bodyElement}
        offers={offers}
        credentials={credentials}/>;
    }

    render() {

      const {
        onAuthorizationScreenSubmit,
        bodyElement,
        credentials,
        cities,
        city,
        offers,
        currentOffers,
        cityNames,
        isAuthorizationRequired,
        getCommentsOnComponentMount,
        comments,
        onCommentsSubmit,
        isCommentsDeployFailed,
        onBookMarkButtonClick} = this.props;

      const storedCredentials = UserAction.getCredentials(credentials);

      return <BrowserRouter>
        <Switch>
          <Route path={`/([0-9][0-9]?[0-9]?)`} render={({match}) => <Offer
            city={city}
            match={match}
            credentials={credentials}
            bodyElement={bodyElement}
            offers={offers}
            getComments={getCommentsOnComponentMount}
            comments={comments}
            commentsSubmitHandler={onCommentsSubmit}
            isCommentsDeployFailed={isCommentsDeployFailed}
            bookMarkClickHandler={onBookMarkButtonClick}/>} />

          <Route path="/favorites" render={() => this._getFavoritesScreen({
            credentials: storedCredentials, bodyElement, offers: currentOffers})}/>
          <Route path="/" exact render={() => this._getMainScreen({
            credentials: storedCredentials, isAuthorizationRequired, offers: currentOffers, cityNames})} />

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

  WithScreenSwitch.propTypes = {
    city: PropTypes.number.isRequired,
    cities: PropTypes.array.isRequired,
    offers: PropTypes.array.isRequired,
    currentOffers: PropTypes.array.isRequired,
    cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,

    onAuthorizationScreenSubmit: PropTypes.func.isRequired,
    onHandleTabClick: PropTypes.func.isRequired,
    bodyElement: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    onBookMarkButtonClick: PropTypes.func.isRequired,

    isAuthorizationFailed: PropTypes.bool.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    isCommentsDeployFailed: PropTypes.bool.isRequired,

    checkAuthOnComponentMount: PropTypes.func.isRequired,
    getCommentsOnComponentMount: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    onCommentsSubmit: PropTypes.func.isRequired,
    onFilterCities: PropTypes.func.isRequired
  };

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
      comments: getComments(state),
      isCommentsDeployFailed: getCommentsDeployAttempt(state)
    });

const mapDispatchToProps = (dispatch) => ({

  onFilterCities: (cities, filterParam) => {

    console.log(cities, filterParam);
  },

  onCommentsSubmit: ({submitData, hotelId}) => {

    dispatch(UserAction.Operation.postComments({submitData, hotelId}))
      .then(() => dispatch(UserAction.Operation.getComments(hotelId)))
        .then((result) => {

          dispatch(UserAction.ActionCreator.getComments(result));
          dispatch(UserAction.ActionCreator.resetCommentsDeploy());
        })
      .catch(() => {
          dispatch(UserAction.ActionCreator.isCommentsDeployFailed(true));
        });
  },

  getCommentsOnComponentMount: (hotelId) => {

    dispatch(UserAction.Operation.getComments(hotelId))
      .then((result) => {

        dispatch(UserAction.ActionCreator.getComments(result));
      }).catch(() => {});
  },

  onBookMarkButtonClick: ({bookMarkIndex, isFavorite}) => {

    dispatch(DataAction.Operation.addBookMark({bookMarkIndex, isFavorite}))
      .then(() => {

        dispatch(DataAction.Operation.loadCities());
      })
      .catch(() => {
        dispatch(UserAction.Operation.checkAuth());
      });
  },

  onHandleTabClick: (activeCity) => {
    dispatch(DataAction.ActionCreator.changeCity(activeCity));
  },

  onAuthorizationScreenSubmit: (submitData) => {
    dispatch(UserAction.Operation.sendCredentials(submitData))
      .then((result) => {

        dispatch(UserAction.ActionCreator.isAuthorizationRequired(false));
        dispatch(UserAction.ActionCreator.sendCredentials(result));
      }).catch(() => {
        // If user is not Authorized, then redirect
        dispatch(UserAction.ActionCreator.isAuthorizationFailed(true));
      });
  },

  checkAuthOnComponentMount: () => {
    dispatch(UserAction.Operation.checkAuth()).then(
        () => {
          dispatch(UserAction.ActionCreator.isAuthorizationRequired(false));
        })
        .catch(() => dispatch(UserAction.ActionCreator.isAuthorizationRequired(true)));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);


