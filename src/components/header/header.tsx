import * as React from 'react';
import {Link} from 'react-router-dom';

import {Credentials} from '../../types';
import {ApiParams} from './../../data';

interface Props {
  credentials: Credentials,
  isAuthorizationRequired: boolean
}

export default class Header extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._getUser = this._getUser.bind(this);
  }

  _getUser() {
    const {credentials, isAuthorizationRequired} = this.props;

    if (credentials.id && !isAuthorizationRequired) {
      return (<Link className="header__nav-link header__nav-link--profile" to="/favorites">
        <div className="header__avatar-wrapper user__avatar-wrapper">
          <img className="header__avatar" src={ApiParams.BASE_URL + credentials[`avatar_url`]} alt={""}/>
        </div>
        <span className="header__user-name user__name">{credentials.email}</span>
      </Link>);
    }

    return (
      <Link className="login__submit form__submit button"
        to={`/login`}>Sign in</Link>
    );
  }

  render() {
    return (<header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {this._getUser()}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>);
  }
}
