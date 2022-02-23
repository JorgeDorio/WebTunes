import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      loginDescription: '',
      loginImage: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser = async () => {
    getUser().then(({ name, email, description, image }) => {
      this.setState({
        loading: false,
        userName: name,
        userEmail: email,
        loginImage: image,
        loginDescription: description,
      });
    });
  };

  render() {
    const { loading, userName, userEmail, loginDescription, loginImage } = this.state;
    const profileDiv = (
      <div>
        <p>{userName}</p>
        <p>{userEmail}</p>
        <p>{loginDescription}</p>
        <img
          src={ loginImage }
          alt="Profile"
          data-testid="profile-image"
        />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : profileDiv}
      </div>
    );
  }
}
