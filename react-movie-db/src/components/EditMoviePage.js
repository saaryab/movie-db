import React, { Component } from 'react';
import { Button } from './Button';

export class EditMoviePage extends React.Component {

  movie;

  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
  }

  printActors(actors) {
    return actors && actors.length ? actors.reduce((a, b) => a + ', ' + b) : ((actors && actors[0]) || '')
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const movie = this.state.movie;
    if (name == 'actors') {
      movie.actors = value.replace(/\s+/g, '').split(',')
    } else {
      movie[name] = value;
    }
    this.setState({
      movie: movie
    })
  }

  handleKeyPress(event) {
    if (event.key == 'Backspace' && event.target.name == 'actors') {
      event.preventDefault();
      const movie = this.state.movie;
      movie.actors = event.target.value.replace(/\s+/g, '').split(',')
      movie.actors.pop()
      this.setState({
        movie: movie
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie || {
        title: '',
        description: '',
        youtubeId: '',
        genre: '',
        actors: [],
        longDescription: '',
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // console.log(this.state.movie)
  }

  render() {
    return (
      <div className="movie-item">
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
          <input type="text" name="title" value={this.state.movie.title} onChange={this.handleInputChange} />
          </label>
          <label>
            Description:
          <input type="text" name="description" value={this.state.movie.description} onChange={this.handleInputChange} />
          </label>
          <label>
            Youtube Video ID:
          <input type="text" name="youtubeId" value={this.state.movie.youtubeId} onChange={this.handleInputChange} />
          </label>
          <label>
            Genre:
          <input type="text" name="genre" value={this.state.movie.genre} onChange={this.handleInputChange} />
          </label>
          <label>
            Actors:
          <input type="text" name="actors" value={this.printActors(this.state.movie.actors)} onKeyDown={this.handleKeyPress} onChange={this.handleInputChange} />
          </label>
          <label>
            Long description:
          <input type="text" name="longDescription" value={this.state.movie.longDescription} onChange={this.handleInputChange} />
          </label>
        </form>


        <div className="movie-buttons">
          <Button text="Cancel" click={() => this.props.cancel(this.state.movie)} />
          <Button text="Save" click={() => this.props.save(this.state.movie)} />
        </div>
      </div>
    );
  }
}

  // Example usage: <ShoppingList name="Mark" />