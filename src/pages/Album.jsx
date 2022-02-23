import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumId: window.location.pathname.split('/')[2],
      loading: true,
      findedMusics: [],
      renderMusics: false,
      favMusics: [],
    };
  }

  componentDidMount() {
    this.requestMusics();
    this.getFavSongs();
  }

  requestMusics = async () => {
    const { albumId } = this.state;
    getMusics(albumId).then((music) => {
      this.setState({
        loading: false,
        findedMusics: music,
      });
    });
    this.setState({
      renderMusics: true,
    });
  };

  getFavSongs = async () => {
    getFavoriteSongs().then((music) => {
      this.setState({
        loading: false,
        favMusics: music,
      });
    });
  };

  render() {
    const { loading, findedMusics, renderMusics, favMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {loading ? (
            <Loading />
          ) : (
            <MusicCard
              getFavSongs={ this.getFavSongs }
              renderMusics={ renderMusics }
              findedMusics={ findedMusics }
              favMusics={ favMusics }
            />
          )}
        </div>
      </div>
    );
  }
}
