import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favMusics: [],
    };
  }

  componentDidMount() {
    this.getFavSongs();
  }

  getFavSongs = async () => {
    getFavoriteSongs().then((music) => {
      this.setState({
        loading: false,
        favMusics: music,
      });
    });
  };

  rmToFavorite = async (music) => {
    this.setState({
      loading: true,
    });
    removeSong(music).then(this.ativarLoading);
    this.getFavSongs();
  };

  render() {
    const { loading, favMusics } = this.state;
    const favSongsList = (
      <div>
        <div>
          <ul>
            {favMusics.map((music) => (
              <li key={ music.trackId }>
                <div>
                  {music.trackName}
                  <audio
                    data-testid="audio-component"
                    src={ music.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o
                    elemento
                    {' '}
                    <code>audio</code>
                  </audio>
                  <label
                    htmlFor={ music.trackId }
                    data-testid={ `checkbox-music-${music.trackId}` }
                  >
                    {' '}
                    <input
                      type="checkbox"
                      name={ music.trackId }
                      id={ music.trackId }
                      onChange={ (event) => {
                        const teste = event.target.checked === true
                          ? this.addToFavorite(music)
                          : this.rmToFavorite(music);
                        return teste;
                      } }
                      checked={
                        favMusics.filter(
                          (filtermusic) => filtermusic.trackId === music.trackId,
                        ).length > 0
                      }
                    />
                    {' '}
                    Favorita
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        ;

      </div>
    );
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>{loading ? <Loading /> : favSongsList}</div>
      </div>
    );
  }
}
