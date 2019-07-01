import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as DataAction from '../../reducers/data/data';
import * as UserAction from '../../reducers/user/user';

import Header from './../../components/header/header.jsx';
import CitiesList from './../../components/cities-list/cities-list.jsx';
import OffersList from './../../components/offers-list/offers-list.jsx';
import Map from './../../components/map/map.jsx';
import {OffersEmpty} from './../../components/offers-empty/offers-empty.jsx';
import SignInScreen from './../../components/sign-in/sign-in.jsx';

import FavoritesList from './../../components/favorites-list/favorites-list.jsx';

import {getCity, combineCities} from '../../reducers/data/selectors';
import {getAuthorizationStatus, getCredentials} from '../../reducers/user/selectors';
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
    }

    _getContainer({offers = void (0), cityName}) {
      if (offers && offers.length === 0) {
        return (<OffersEmpty />);
      }

      return (<div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{`${offers ? `${offers.length} places to stay in ${cityName}` : ``}`}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
                        Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex="0">Popular</li>
              <li className="places__option" tabIndex="0">Price: low to high</li>
              <li className="places__option" tabIndex="0">Price: high to low</li>
              <li className="places__option" tabIndex="0">Top rated first</li>
            </ul>
          </form>

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
      cityNames = []}) {

      const {onHandleTabClick} = this.props;

      switch (key) {
        case `LOCATIONS`:

          if (offers.length !== 0) {
            const locations = DataAction.getLocations(offers);
            const locationsCoordinates = DataAction.getLocationsCoordinates(locations);

            return (
              <Map
                locations={locationsCoordinates}
                id={`map`}
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
            <OffersListWrapped offers={offers}
            />);
      }

      return null;
    }

    _getHeader(credentials) {
      return <Header
        credentials={credentials}
      />;
    }

    _getScreen(credentials) {
      const {
        cities,
        city,
        bodyElement} = this.props;

      const {cityNames, offers} = cities;

      if (credentials.id === null) {
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
              {this._getContainer({offers: offers[city], cityName: cityNames[city]})}
            </div>
          </>);
    }

    _getMainScreen({credentials}) {
      return (<Component
        {...this.props}
        renderScreen={() => this._getScreen(credentials)}
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

    _getFavoritesScreen({credentials, bodyElement, offers}) {
      if (credentials.id === null) {
        return <Redirect to="/login"/>;
      }

      return <FavoritesList
        bodyElement={bodyElement}
        offers={offers}/>;
    }

    render() {
      const {
        onAuthorizationScreenSubmit,
        bodyElement,
        credentials,
        cities} = this.props;

      const {offers} = cities;

      return <BrowserRouter>
        <Switch>
          <Route path="/favorites" render={() => this._getFavoritesScreen({credentials, bodyElement, offers})}/>
          <Route path="/" exact render={() => this._getMainScreen({credentials})} />

          <Route path="/login" render={() => this._getSignInScreen(
              {onAuthorizationScreenSubmit, bodyElement, credentials})} />
        </Switch>
      </BrowserRouter>;
    }

    componentDidMount() {
      const {credentials,
        hydrateStateOnComponentMount} = this.props;

      hydrateStateOnComponentMount(
          UserAction.hydrateStateWithLocalStorage(credentials));
    }
  }

  WithScreenSwitch.propTypes = {
    city: PropTypes.number.isRequired,
    cities: PropTypes.shape({
      cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
      offers: PropTypes.array
    }),
    authorizationRequired: PropTypes.bool.isRequired,
    onAuthorizationScreenSubmit: PropTypes.func.isRequired,
    onHandleTabClick: PropTypes.func.isRequired,
    bodyElement: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    hydrateStateOnComponentMount: PropTypes.func.isRequired
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {
      city: getCity(state),
      cities: combineCities(state),
      authorizationRequired: getAuthorizationStatus(state),
      credentials: getCredentials(state),
    });

const mapDispatchToProps = (dispatch) => ({
  onHandleTabClick: (activeCity) => {
    dispatch(DataAction.ActionCreator.changeCity(activeCity));
  },

  onAuthorizationScreenSubmit: (submitData) => {
    dispatch(UserAction.Operation.sendCredentials(submitData))
      .then((result) => {
          dispatch(UserAction.ActionCreator.sendCredentials(result));
      }).catch(() => {
      dispatch(UserAction.ActionCreator.requireAuthorization(true));
    })
  },

  hydrateStateOnComponentMount: (credentials) => {
    dispatch(UserAction.ActionCreator.sendCredentials(credentials));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);


