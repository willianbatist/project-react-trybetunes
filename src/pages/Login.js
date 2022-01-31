import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';
import logo from '../LOGO_POSITIVA 1.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Usuario: '',
      isDesabled: true,
      loading: false,
      enableLoading: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const three = 3;
    if (value.length >= three) {
      this.setState({
        isDesabled: false,
      });
    } else {
      this.setState({
        isDesabled: true,
      });
    }
  };

  // Mensagem de carregando foi feita com ajuda de Alex Turma 17
  handleClick = async (event) => {
    event.preventDefault();
    const { Usuario } = this.state;
    this.setState({
      enableLoading: true,
    });
    await createUser({ name: Usuario });
    this.setState({
      loading: true,
      enableLoading: false,
    });
  };

  render() {
    const { Usuario, isDesabled, loading, enableLoading } = this.state;
    return (
      <div className="container" id="Login" data-testid="page-login">
        <div className="row ">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto cardLogin">
            {enableLoading ? (
              <Loading />
            ) : (
              <form>
                <img className="LogoLogin" src={ logo } alt="Logo do app TrybeTunes" />
                <div className="inputLogin">
                  <input
                    className="form-control"
                    type="text"
                    name="Usuario"
                    value={ Usuario }
                    onChange={ this.handleChange }
                    placeholder="Usuário"
                    data-testid="login-name-input"
                  />
                </div>
                <div className="inputLogin">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Senha"
                  />
                </div>
                <div className="btn">
                  <button
                    disabled={ isDesabled }
                    onClick={ this.handleClick }
                    className="btn
                    btn-primary btn-login text-uppercase fw-bold buttonLogin"
                    type="submit"
                    data-testid="login-submit-button"
                  >
                    ENTRAR
                  </button>
                </div>
              </form>
            )}
            {loading ? <Redirect to="/search" /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

// Login.propTypes = {
//   Usuario: PropTypes.string,
// }.isRequired;

export default Login;
