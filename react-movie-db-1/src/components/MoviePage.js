import React, { Component } from 'react';
import { Button } from './Button';

export class MoviePage extends React.Component {
  youtubeThumbnail(id) {
    return 'http://img.youtube.com/vi/' + id + '/default.jpg'
  }

  printActors(actors) {
    return actors && actors.length ? actors.reduce((a, b) => a + ', ' + b) : ((actors && actors[0]) || '')
  }

  render() {
    return (
      <div className="movie-item">
        <h3 className="movie-title">{this.props.movie.title}</h3>
        <img
          src={this.youtubeThumbnail(this.props.movie.youtubeId)}
          className="movie-thumbnail"
          alt="movie thumbnail" />

        <div className="movie-details">
          <div>{this.props.movie.genre}</div>
          <div>{this.printActors(this.props.movie.actors)}</div>
          <div>{this.props.movie.longDescription}</div>
        </div>
        <div className="movie-buttons">
          <Button text="Back" click={this.props.back} />
          <Button text="Edit" click={() => this.props.edit(this.props.movie)} />
          <Button text="Delete" click={() => this.props.delete(this.props.movie)} />
        </div>
      </div>
    );
  }
}

  // Example usage: <ShoppingList name="Mark" />