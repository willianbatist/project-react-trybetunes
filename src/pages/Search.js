import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      isDisabled: true,
      listArtist: [],
      loading: '',
      nameArtist: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      nameArtist: value,
    });
    if (value.length >= 2) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    const { artista } = this.state;
    this.setState({ loading: false });
    searchAlbumsAPI(artista).then((data) => {
      this.setState({
        listArtist: data,
        loading: true,
        artista: '',
      });
    });
  };

  render() {
    const {
      artista,
      isDisabled,
      loading,
      listArtist,
      nameArtist,
    } = this.state;
    // eslint-disable-next-line no-return-assign
    return (
      <>
        <Header />
        <form>
          <div data-testid="page-search">
            {loading === false ? (
              <Loading />
            ) : (
              <>
                <input
                  className="inputSearch form-control"
                  name="artista"
                  value={ artista }
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                  type="text"
                  placeholder="Nome do Artista"
                />
                <button
                  className="btnSearch btn btn-primary"
                  onClick={ this.handleClick }
                  disabled={ isDisabled }
                  data-testid="search-artist-button"
                  type="submit"
                >
                  Pesquisar
                </button>
              </>
            )}
            { loading && listArtist.length === 0
              ? <p>Nenhum álbum foi encontrado</p> : '' }
            {listArtist.length > 0 ? (
              <section>
                {<p className="resultAlbum">{`Resultado de álbuns de: ${nameArtist}`}</p>}
                {listArtist.map(
                  ({
                    artworkUrl100,
                    collectionName,
                    artistName,
                    collectionId,
                  }) => (
                    <div className="contoneirMusicCard" key={ collectionId }>
                      <div className="cardMusic">
                        <Link
                          className="linkAlbuns"
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/album/${collectionId}` }
                        >
                          <img
                            className="imgCardMusic"
                            src={ artworkUrl100 }
                            alt={ collectionName }
                          />
                          <p className="nameAlbum">{collectionName}</p>
                          <p className="artistName">{artistName}</p>
                        </Link>
                      </div>
                    </div>
                  ),
                )}
              </section>
            ) : (
              ''
            )}
          </div>
        </form>
      </>
    );
  }
}

export default Search;
