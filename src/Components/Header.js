import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Logo from '../LOGO_POSITIVA 1.png';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({ user: data }));
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        {!user.name ? (
          <Loading />
        ) : (
          <>
            <header className="header" data-testid="header-component">
              <img className="img" src={ Logo } alt="Logo" />
              <div className="hardername">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle svg" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
                <h1 className="UserN" data-testid="header-user-name">{`${user.name}`}</h1>
              </div>
            </header>
            <div className="navContainer">
              <nav className="nav">
                <Link className="link" to="/search" data-testid="link-to-search">
                  Pesquisa
                </Link>
                <Link
                  className="link"
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favoritas
                </Link>
                <Link
                  className="link"
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Perfil
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Header;
