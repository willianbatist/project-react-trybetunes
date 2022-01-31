import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      artist: '',
      urlAbum: '',
      nameAlbum: '',
    };
  }

  componentDidMount() {
    this.handleAppiGetMusics();
  }

  // data.filter feito com a explicação do Felipe Castanheira turma 17 OBS: MINHA LOGICA NÃO PASSAVA NO TEST

  handleAppiGetMusics = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    getMusics(id).then((data) => {
      this.setState({
        listMusic: data.filter((music) => music.kind === 'song'),
        artist: data[0].artistName,
        urlAbum: data[0].artworkUrl100,
        nameAlbum: data[0].collectionName,
      });
    });
  };

  render() {
    const { artist, urlAbum, nameAlbum, listMusic } = this.state;
    return (
      <div>
        <Header />
        <div className="containerAlbum" data-testid="page-album">
          <div className="albumCapName">
            <img
              className="imgAlbum"
              src={ urlAbum }
              alt={ nameAlbum }
            />
            <h5 className="albumName" data-testid="album-name">{ nameAlbum }</h5>
            <p className="nameArtistAlbum" data-testid="artist-name">{ artist }</p>
          </div>
          <div className="listAudio">
            { listMusic.map((music) => (
              <div className="audio" key={ music.trackId }>
                <MusicCard
                  music={ music }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
