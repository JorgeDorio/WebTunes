import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const minLengthName = 3;

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      btnIsDisabled: true,
      loading: false,
      isRedirect: false,
      loginEmail: '',
      loginImage: '',
      loginDescription: '',
    };
  }

  checkInput = () => {
    const { loginName } = this.state;

    if (loginName.length >= minLengthName) {
      this.setState({
        btnIsDisabled: false,
      });
    } else {
      this.setState({
        btnIsDisabled: true,
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.checkInput,
    );
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { loginName, loginEmail, loginImage, loginDescription } = this.state;
    await createUser({
      name: loginName,
      email: loginEmail,
      image: loginImage,
      description: loginDescription,
    });
    this.setState({
      isRedirect: true,
    });
  };

  render() {
    const {
      loading,
      isRedirect,
      loginName,
      btnIsDisabled,
      loginEmail,
      loginDescription,
      loginImage,
    } = this.state;
    const loginDiv = (
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
            value={ loginName }
            name="loginName"
            placeholder="Insira seu nome"
          />
          <input
            type="email"
            onChange={ this.handleChange }
            value={ loginEmail }
            name="loginEmail"
            placeholder="Insira seu email"
          />
          <textarea
            onChange={ this.handleChange }
            value={ loginDescription }
            name="loginDescription"
            placeholder="Insira sua descrição"
          />
          <input
            type="text"
            onChange={ this.handleChange }
            value={ loginImage }
            name="loginImage"
            placeholder="Src da imagem"
          />
          <button
            disabled={ btnIsDisabled }
            type="submit"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
    return (
      <div>
        {loading ? <Loading /> : loginDiv}
        {isRedirect && <Redirect to="/search" />}
      </div>
    );
  }
}
