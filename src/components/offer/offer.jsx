import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

import {getOfferById} from '../../reducers/data/data';
import {getRating} from '../../assets/handler';

import {getDateFromUTCString,
  getMonthYearFromUTCString} from '../../reducers/user/user';

import Header from './../../components/header/header.jsx';

export default class Offer extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();
    this._submitForm = this._submitForm.bind(this);
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

  _getCurrentOffer(offers = void (0)) {
    const {match} = this.props;
    const offerId = +match.url.slice(1);

    if (offers && offers.length > 0) {
      return getOfferById(offers, offerId);
    }

    return null;
  }

  _submitForm(e) {
    // Add another state for comments post result
    e.preventDefault();

    const {commentsSubmitHandler, match} = this.props;
    const offerId = +match.url.slice(1);

    const form = this._formRef.current;
    const submitButton = form.querySelector(`.form__submit`);
    submitButton.disabled = true;

    const formData = new FormData(this._formRef.current);

    commentsSubmitHandler({
      submitData: Offer._processForm(formData), hotelId: offerId});
  }

  render() {
    const {
      city,
      offers,
      credentials,
      bodyElement,
      comments,
      isCommentsDeployFailed
    } = this.props;

    bodyElement.className = `page`;

    if (offers && offers.length > 0) {

      const offer = this._getCurrentOffer(offers[city]);
      const {images} = offer;

      return (<>
        <Header credentials={credentials} />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">

              <div className="property__gallery">
                {images.slice(0, 6).map((it, key) =>
                  <div className="property__image-wrapper" key={`offer-${key}`}>
                    <img className="property__image" src={it} alt="Photo studio" />
                  </div>)}
              </div>

            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__mark">
                  <span>{Offer._getPropertyMark(offer[`is_premium`])}</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">{offer.title}</h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${getRating(offer.rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer[`max_adults`]} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">

                    {offer.goods.map((it, key) =>
                      <li className="property__inside-item" key={`property-item-${key}`}>{it}</li>)}

                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={offer.host[`avatar_url`]} width="74" height="74"
                        alt="Host avatar" />
                    </div>
                    <span className="property__user-name">{offer.host.name}</span>
                    <span className="property__user-status">{offer.host[`is_pro`] ? `Pro` : ``}</span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{offer.description}</p>
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

                  {credentials.id ? <form className="reviews__form form" action="#" method="post" ref={this._formRef}>
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
                      <button className="reviews__submit form__submit button" type="submit" disabled="" onClick={this._submitForm}>Submit</button>
                    </div>
                    <span className="login__error" style={{display: `none`, textAlign: `center`, paddingTop: `10px`}}>Вы забыли поставить оценку или оставить комментарий</span>
                  </form> : ``}


                </section>
              </div>
            </div>
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;80</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button className="place-card__bookmark-button place-card__bookmark-button--active button"
                        type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: `80%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Wood and stone place</a>
                    </h2>
                    <p className="place-card__type">Private room</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200"
                        alt="Place image" />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;132</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button className="place-card__bookmark-button button" type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: `80%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Canal View Prinsengracht</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200"
                        alt="Place image" />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;180</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button className="place-card__bookmark-button button" type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: `100%`}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <a href="#">Nice, cozy, warm big bed apartment</a>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      </>);
    }

    return <></>;

  }

  componentDidMount() {
    const {
      getComments, match} = this.props;
    const offerId = +match.url.slice(1);

    getComments(offerId);
  }

  componentDidUpdate() {
    const {credentials, isCommentsDeployFailed, resetCommentsDeploy} = this.props;

    if (credentials.id && isCommentsDeployFailed && this._formRef.current) {
      const form = this._formRef.current;
      const submitButton = form.querySelector(`.form__submit`);
      const commentsError = form.querySelector(`.login__error`);

      commentsError.style.display = `block`;
      submitButton.disabled = false;

      resetCommentsDeploy();
    }

    if (credentials.id && !isCommentsDeployFailed && this._formRef.current) {
      const form = this._formRef.current;
      const submitButton = form.querySelector(`.form__submit`);
      const commentsError = form.querySelector(`.login__error`);

      commentsError.style.display = `none`;
      submitButton.disabled = false;

      // console.log(form.querySelector('#review'))
      form.querySelector('#review').value = ``;
    }
  }
}

Offer.propTypes = {
  city: PropTypes.number.isRequired,
  offers: PropTypes.array,
  bodyElement: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  commentsSubmitHandler: PropTypes.func.isRequired,
  isCommentsDeployFailed: PropTypes.bool.isRequired,
  resetCommentsDeploy: PropTypes.func.isRequired
};
