import React, { Component } from 'react';
import { MoviePreview } from './MoviePreview';


export class ListMoviesPage extends React.Component {

  mapMovies(movies) {
    return movies.map(movie => <MoviePreview
      key={movie._id}
      movie={movie}
      click={() => this.props.select(movie)} />
    )
  }

  filterMovies(genre) {
    this.setState({
      movieList: this.mapMovies(!genre ? this.props.movies :
        this.props.movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase()))
    });
  }

  getGenres(movies) {
    if (!movies) return []
    const genreMap = {}
    movies.forEach(m => genreMap[m.genre] = true)
    return Object.keys(genreMap)
  }

  getMovieList(movies) {
    switch (true) {
      case (movies == null):
        return <div className="loader"> Loading movies... </div>
      case (movies.length == undefined):
        return <div className="no-movies"> Error loading movies :-( </div>
      case (movies.length == 0):
        return <div className="no-movies"> No movies to display :-( </div>
      case (movies.length > 0):
        return this.mapMovies(movies)
      default:
        return <div className="no-movies"> Error loading movies :-( </div>

    }
  }

  constructor(props) {
    super(props);

    this.state = {
      movieList: this.getMovieList(this.props.movies)
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieList: this.getMovieList(nextProps.movies)
    })
  }

  render() {
    const genreList = [<option key="none" value=""> Fliter by genre </option>].concat(
      this.getGenres(this.props.movies).map((genre, i) =>
        <option key={i} value={genre}> {genre} </option>
      ))

    return (
      <div className="list-page">
        <select className="genre-filter" onChange={x => this.filterMovies(x.target.value)}>
          {genreList}
        </select >
        <div className="movie-list">
          {this.state.movieList}
        </div>
      </div>
    );
  }
}