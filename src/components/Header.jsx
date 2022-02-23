import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser = async () => {
    getUser().then(({ name }) => {
      this.setState({
        loading: false,
        userName: name,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    const headerDiv = (
      <div>
        <h1 data-testid="header-user-name">{userName}</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Buscar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
        </nav>
      </div>
    );
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : headerDiv}
      </header>
    );
  }
}
