import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MoviesApi } from './api/moviesApi';
import { ListMoviesPage } from './components/ListMoviesPage';
import { MoviePage } from './components/MoviePage';
import { EditMoviePage } from './components/EditMoviePage';
import { Button } from './components/Button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: null,
      editMovie: false,
      movies: null,
    }

    MoviesApi.getMovies().then(movies => {
      this.setState({
        movies: movies || []
      })
    })
  }

  pageBody(selectedMovie, edit = false) {
    if (selectedMovie && !edit) {
      return (
        <MoviePage movie={selectedMovie} back={this.clearMovie} edit={this.openEditMovie} delete={this.deleteMovie} />
      )
    } else if (edit) {
      return (
        <EditMoviePage movie={selectedMovie} save={this.editMovie} cancel={this.clearEdit} />
      )
    } else {
      return (
        <div className="app-body">
          <ListMoviesPage movies={this.state.movies} select={this.selectMovie} />
          <Button text="Add movie" click={() => this.openEditMovie(undefined)} />
        </div>
      )
    }
  }

  selectMovie = movie => this.setState({
    selectedMovie: movie,
  })

  clearMovie = () => this.selectMovie(undefined)

  openEditMovie = movie => this.setState({
    selectedMovie: movie,
    edit: true,
  })

  clearEdit = () => this.setState({
    edit: false,
  })


  editMovie = movie => {
    if (movie._id) {
      MoviesApi.updateMovie(movie)
        .then(res =>
          this.setState({
            movies: this.state.movies.map(m => m._id == movie._id ? movie : m),
            edit: false,
          }))
    } else {
      MoviesApi.addMovie(movie)
        .then(res => {
          let movies = this.state.movies
          movies.push(res.movie)
          movies = movies.sort((a, b) => a.title.localeCompare(b.title))
          this.setState({
            movies: movies,
            edit: false,
          })
        })
    }
  }

  deleteMovie = movie => {
    MoviesApi.deleteMovie(movie).then(res => this.setState({
      movies: this.state.movies.filter(m => m != movie),
      selectedMovie: null,
    }))
  }

  render() {
    return (
      <div className="app-root">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" onClick={this.clearMovie} />
          <h1 className="app-title">The Web Movie DB</h1>
        </header>
        {this.pageBody(this.state.selectedMovie, this.state.edit)}
      </div>
    );
  }
}

export default App;

