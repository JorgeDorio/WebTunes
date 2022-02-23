import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  ativarLoading = () => {
    this.setState({
      loading: false,
    });
  }

  addToFavorite = async (music) => {
    const { getFavSongs } = this.props;
    this.setState({
      loading: true,
    });
    addSong(music).then(this.ativarLoading);
    getFavSongs();
  };

  rmToFavorite = async (music) => {
    const { getFavSongs } = this.props;
    this.setState({
      loading: true,
    });
    removeSong(music).then(this.ativarLoading);
    getFavSongs();
  };

  render() {
    const { findedMusics, renderMusics, favMusics } = this.props;
    const { loading } = this.state;
    const card = (
      <div>
        {renderMusics && findedMusics.length > 0 ? (
          <div>
            <h2 data-testid="artist-name">{findedMusics[0].artistName}</h2>
            <h3 data-testid="album-name">{findedMusics[0].collectionName}</h3>
            <ul>
              {findedMusics.slice(1).map((music) => (
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
        ) : (
          <p>Não rederizou</p>
        )}
      </div>
    );
    return <div>{loading ? <Loading /> : card}</div>;
  }
}

MusicCard.propTypes = {
  findedMusics: PropTypes.shape({
    length: PropTypes.number,
    slice: PropTypes.func,
  }),
  renderMusics: PropTypes.any,
}.isRequired;
