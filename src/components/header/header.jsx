import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


export default class Header extends PureComponent {
  constructor(props) {
    super(props);

    this._getUser = this._getUser.bind(this);
  }

  _getUser() {
    const {credentials} = this.props;

    if (credentials.id) {
      return (<Link className="header__nav-link header__nav-link--profile" to="/favorites">
        <span className="header__user-name user__name">{credentials.email}</span>
      </Link>);
    }

    return (

      <button className="login__submit form__submit button"
        type="submit">Sign in</button>
    );
  }

  render() {
    return (<header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
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

Header.propTypes = {
  credentials: PropTypes.object.isRequired
};
