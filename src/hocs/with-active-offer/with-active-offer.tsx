import * as React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import * as UserAction from '../../reducers/user/user';
import * as DataAction from '../../reducers/data/data';

import {
  getOfferById,
  getLocations,
  getOffersByCityName, getMapPointsDistance} from '../../reducers/data/data';
import {getRating} from '../../assets/handler';

import {getDateFromUTCString,
  getMonthYearFromUTCString} from '../../reducers/user/user';

import Header from './../../components/header/header';
import OfferCard from './../../components/offer-card/offer-card';
import Map from './../../components/map/map';

import {
  Offer as OfferProp, CityName,
  Credentials, Match, Comment, SubmitData as SubmitDataType} from '../../types';

import {getComments, getCommentsDeployAttempt, getBookMarkAdditionAttempt} from '../../reducers/user/selectors';

interface Props {
  city: number,
  offers: OfferProp[] & CityName,
  bodyElement: HTMLBodyElement,
  credentials: Credentials,
  match: Match,
  getCommentsOnComponentMount: (hotelId: number) => void,
  comments: Comment[],

  commentsSubmitHandler: (submitDataObject: {submitData:
      SubmitDataType, hotelId: number}) => void
  isCommentsDeployFailed: boolean,

  bookMarkClickHandler: (bookMarkObject: {
    bookMarkIndex: number, isFavorite: boolean}) => void,

  // Need to handle the case with unauthorized user
  onBookMarkButtonClick: (bookMarkObject: {
    bookMarkIndex: number, isFavorite: boolean}) => void,

  getActiveOffer: () => number,
  activateOffer: () => void,


  isBookMarkAdditionFailed: boolean
}

const withActiveOffer = (Component) => {

  class Offer extends React.PureComponent<Props, null> {
    private _formRef: React.RefObject<HTMLFormElement>;

    constructor(props) {
      super(props);


      this._formRef = React.createRef();
      this._submitForm = this._submitForm.bind(this);
      this._getScreen = this._getScreen.bind(this);
    }

    static _getPropertyMark(isPremium) {
      return isPremium ? `Premium` : `Mid-price`;
    }

    static formMapper(target) {
      return {
        rating: (value) => {
          target.rating = value;
          return target;
        },
        review: (value) => {
          target.comment = value;
          return target;
        }
      };
    }

    static _processForm(formData) {
      const entry = {
        'rating': null,
        'comment': ``
      };

      const FormMapper = Offer.formMapper(entry);
      for (const pair of formData.entries()) {

        const [property, value] = pair;
        if (FormMapper[property]) {

          value.trim();
          FormMapper[property](value);
        }
      }

      return entry;
    }

    _renderForm() {
      return (<form className="reviews__form form" action="#" method="post" ref={this._formRef}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
                 type="radio" />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
                 type="radio" />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
                 type="radio" />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
                 type="radio" />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
                 type="radio" />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
                 title="terribly">
            <svg className="form__star-image" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
                  placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" onClick={this._submitForm}>Submit</button>
        </div>
        <span className="login__error" style={{display: `none`, textAlign: `center`, paddingTop: `10px`}}>Вы забыли поставить оценку или оставить комментарий</span>
      </form>);
    }


    _submitForm(e) {
      e.preventDefault();

      const {commentsSubmitHandler, match} = this.props;
      const offerId = +match.url.slice(1);

      const form = this._formRef.current;

      const submitButton = form.querySelector<HTMLButtonElement>(`.form__submit`);
      submitButton.disabled = true;

      const formData = new FormData(this._formRef.current);

      commentsSubmitHandler({
        submitData: Offer._processForm(formData), hotelId: offerId});
    }

    _deleteCurrentOffer(offers, offerId) {
      for (let i=0; i < offers.length; i++) {

        if (offers[i].id === offerId) {

          offers.splice(i, 1);
        }
      }

      return offers;
    }

    _getClosestOffers(offers, offerLatLng) {
      return offers.sort((a, b) => {

        const aLatLng = Object.assign({lat: null, lng: null},
          {lat: a.location.latitude, lng: a.location.longitude});

        const bLatLng = Object.assign({lat: null, lng: null},
          {lat: b.location.latitude, lng: b.location.longitude});

        const distanceA = getMapPointsDistance(aLatLng, offerLatLng);
        const distanceB = getMapPointsDistance(bLatLng, offerLatLng);


        return distanceA - distanceB;
      })
    }

    _getScreen() {
      const {
        offers,
        credentials,
        bodyElement,
        comments,
        match,
        activateOffer,

        getActiveOffer,
        isBookMarkAdditionFailed,

        bookMarkClickHandler,
        onBookMarkButtonClick
      } = this.props;


      console.log(`offerScreen`)
      if (isBookMarkAdditionFailed) {

        return <Redirect to={`/login`}/>;
      }

      const offerId = +match.url.slice(1);
      bodyElement.className = `page`;

      if (offers && offers.length > 0) {

        const currentOffer = getOfferById([...offers], offerId)[0];


        if (currentOffer) {
          const {images} = currentOffer;
          const isFavorite = currentOffer[`is_favorite`];

          const currentOfferLocation = {lat: null, lng: null};

          currentOfferLocation.lat = currentOffer.location.latitude;
          currentOfferLocation.lng = currentOffer.location.longitude;

          const currentOffers = getOffersByCityName([...offers], currentOffer.city.name);

          const currentOffersGrained = this._deleteCurrentOffer([...currentOffers], offerId);
          const nearestOffers = this._getClosestOffers(
            [...currentOffersGrained], currentOfferLocation).slice(0, 3);

          const currentLocations = getLocations(
            [...nearestOffers]);

          const headerImages = images.slice(0, 6);

          return (<>
            <Header credentials={credentials} />


            <main className="page__main page__main--property">
              <section className="property">
                <div className="property__gallery-container container">

                  <div className="property__gallery">
                    {headerImages.slice(0, 6).map((it, key) =>
                      <div className="property__image-wrapper" key={`currentOffer-${key}`}>
                        <img className="property__image" src={it} alt="Photo studio" />
                      </div>)}
                  </div>

                </div>
                <div className="property__container container">
                  <div className="property__wrapper">
                    <div className="property__mark">
                      <span>{Offer._getPropertyMark(currentOffer[`is_premium`])}</span>
                    </div>
                    <div className="property__name-wrapper">
                      <h1 className="property__name">{currentOffer.title}</h1>
                      <button className={isFavorite ? `place-card__bookmark-button--active button` : `place-card__bookmark-button button`}
                              type="button" onClick={() => {

                        onBookMarkButtonClick({bookMarkIndex: offerId, isFavorite});
                      }}>

                        <svg className="place-card__bookmark-icon" width="17" height="18" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div className="property__rating rating">
                      <div className="property__stars rating__stars">
                        <span style={{width: `${getRating(currentOffer.rating)}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                      <span className="property__rating-value rating__value">{currentOffer.rating}</span>
                    </div>
                    <ul className="property__features">
                      <li className="property__feature property__feature--entire">
                        {currentOffer.type}
                      </li>
                      <li className="property__feature property__feature--bedrooms">
                        {currentOffer.bedrooms} Bedrooms
                      </li>
                      <li className="property__feature property__feature--adults">
                        Max {currentOffer[`max_adults`]} adults
                      </li>
                    </ul>
                    <div className="property__price">
                      <b className="property__price-value">&euro;{currentOffer.price}</b>
                      <span className="property__price-text">&nbsp;night</span>
                    </div>
                    <div className="property__inside">
                      <h2 className="property__inside-title">What&apos;s inside</h2>
                      <ul className="property__inside-list">

                        {currentOffer.goods.map((it, key) =>
                          <li className="property__inside-item" key={`property-item-${key}`}>{it}</li>)}

                      </ul>
                    </div>
                    <div className="property__host">
                      <h2 className="property__host-title">Meet the host</h2>
                      <div className="property__host-user user">
                        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                          <img className="property__avatar user__avatar" src={currentOffer.host[`avatar_url`]} width="74" height="74"
                               alt="Host avatar" />
                        </div>
                        <span className="property__user-name">{currentOffer.host.name}</span>
                        <span className="property__user-status">{currentOffer.host[`is_pro`] ? `Pro` : ``}</span>
                      </div>
                      <div className="property__description">
                        <p className="property__text">{currentOffer.description}</p>
                      </div>
                    </div>
                    <section className="property__reviews reviews">
                      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length > 0 ? comments.length : ``}</span></h2>
                      <ul className="reviews__list">
                        {comments.length > 0 ? comments.map((it, key) =>
                          <li className="reviews__item" key={`comment-${key}`}>
                            <div className="reviews__user user">
                              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                <img className="reviews__avatar user__avatar" src={it.user[`avatar_url`]} width="54" height="54"
                                     alt="Reviews avatar" />
                              </div>
                              <span className="reviews__user-name">{it.user.name}</span>
                            </div>
                            <div className="reviews__info">
                              <div className="reviews__rating rating">
                                <div className="reviews__stars rating__stars">
                                  <span style={{width: `${getRating(it.rating)}%`}}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <p className="reviews__text">{it.comment}</p>
                              <time className="reviews__time" dateTime={getDateFromUTCString(it.date)}>{getMonthYearFromUTCString(it.date)}</time>
                            </div>
                          </li>) : ``}
                      </ul>

                      {credentials.id ? this._renderForm() : ``}

                    </section>
                  </div>
                </div>
                <section className="property__map map">
                  <Map mapId={`offerMap`} locations={currentLocations} getActiveOffer={getActiveOffer}/>
                </section>

              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">Other places in the neighbourhood</h2>
                  <div className="near-places__list places__list">

                    {nearestOffers.slice(0, 3).map((nearestOffer, i) =>
                      <OfferCard key={`nearestOffer-${i}`}
                                 offer={nearestOffer}
                                 index={nearestOffer.id}
                                 isFavorite={nearestOffer[`is_favorite`]}
                                 bookMarkClickHandler={bookMarkClickHandler}
                                 activateOffer={activateOffer}/>
                    )}

                  </div>
                </section>
              </div>
            </main>
          </>);

        }

        return <Redirect to={`/`}/>

      }

      return null;
    }

    render() {

      return (<Component
        {...this.props}
        renderOffer={this._getScreen}/>);
    }

    componentDidMount() {
      const {match, getCommentsOnComponentMount} = this.props;
      const offerId = +match.url.slice(1);

      getCommentsOnComponentMount(offerId);
    }

    componentDidUpdate() {
      const {credentials, isCommentsDeployFailed} = this.props;

      if (this._formRef.current) {

        if (credentials.id && isCommentsDeployFailed) {
          const form = this._formRef.current;
          const submitButton = form.querySelector<HTMLButtonElement>(`.form__submit`);
          const commentsError = form.querySelector<HTMLSpanElement>(`.login__error`);

          commentsError.style.display = `block`;
          submitButton.disabled = false;
        }

        if (credentials.id && !isCommentsDeployFailed) {

          const form = this._formRef.current;
          const submitButton = form.querySelector<HTMLButtonElement>(`.form__submit`);
          const commentsError = form.querySelector<HTMLSpanElement>(`.login__error`);

          commentsError.style.display = `none`;
          submitButton.disabled = false;

          form.querySelector<HTMLTextAreaElement>(`#review`).value = ``;
        }
      }
    }
  }

  return Offer;
};


const mapStateToProps = (state, ownProps) => Object.assign(
  {}, ownProps, {
    comments: getComments(state),
    isCommentsDeployFailed: getCommentsDeployAttempt(state),
    isBookMarkAdditionFailed: getBookMarkAdditionAttempt(state)
  });

const mapDispatchToProps = (dispatch) => ({

  onBookMarkButtonClick: ({bookMarkIndex, isFavorite}) => {
    dispatch(DataAction.Operation.addBookMark({bookMarkIndex, isFavorite}))
      .then(() => {

        dispatch(DataAction.Operation.loadCities());
      })
      .catch(() => {

        console.log(`bookmarkFailed`);
        dispatch(UserAction.ActionCreator.setBookMarkAdditionFailure(true));
      });
  },

  getCommentsOnComponentMount: (hotelId) => {

    dispatch(UserAction.Operation.getComments(hotelId))
      .then((result) => {

        dispatch(UserAction.ActionCreator.getComments(result));
      }).catch(() => {});
  },

  commentsSubmitHandler: ({submitData, hotelId}) => {

    dispatch(UserAction.Operation.postComments({submitData, hotelId}))
      .then(() => dispatch(UserAction.Operation.getComments(hotelId)))
      .then((result) => {

        dispatch(UserAction.ActionCreator.getComments(result));
        dispatch(UserAction.ActionCreator.resetCommentsDeploy());
      })
      .catch(() => {
        dispatch(UserAction.ActionCreator.getCommentsDeployAttempt(true));
      });
  },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withActiveOffer);
