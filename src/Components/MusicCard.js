import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      favoriteMusic: [],
      loading: true,
    };
  }

  // logica de addsong, favorite e removeSong feita com ajuda de Jonatas Queiroz Turma 17
  componentDidMount() {
    getFavoriteSongs().then((data) => {
      this.setState({
        loading: false,
        favoriteMusic: data,
      }, this.handleRecoveryFavorite);
    });
  }

  handleRecoveryFavorite = () => {
    const { favoriteMusic } = this.state;
    const { music: { trackId } } = this.props;
    const isFavorite = favoriteMusic.some((music) => music.trackId === trackId);
    if (isFavorite) {
      this.setState({
        loading: false,
        checked: isFavorite,
      });
    }
  }

  handleInputChange = (e) => {
    const { checked } = e.target;
    this.setState({
      checked,
      loading: true,
    }, this.handleFavoriteMusic);
  }

  handleFavoriteMusic = () => {
    const { checked } = this.state;
    const { music } = this.props;
    if (checked) {
      addSong(music).then(() => this.setState({
        loading: false,
      }));
    } else {
      removeSong(music).then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  }

  render() {
    const { checked, loading } = this.state;
    const { music } = this.props;
    return (
      <div>
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="inputChecked">
          Favorita
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            id="inputChecked"
            type="checkbox"
            name="checkedFavorite"
            checked={ checked }
            onChange={ this.handleInputChange }
          />
          { loading && <Loading /> }
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  checked: PropTypes.func,
  trackId: PropTypes.string,
  handleInputChange: PropTypes.func,
}.isRequired;

export default MusicCard;
