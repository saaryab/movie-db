import React, {Component} from 'react';
import {Button} from './Button';

export class MoviePage extends React.Component {
  youtubeThumbnail(id) {
    return 'http://img.youtube.com/vi/' + id + '/default.jpg'
  }

  printActors(actors) {
    return actors && actors.length
      ? actors.reduce((a, b) => a + ', ' + b)
      : ((actors && actors[0]) || '')
  }

  render() {
    return (
      <div className="movie-page">
        <h3 className="movie-title">{this.props.movie.title}</h3>

        <iframe
          width="560"
          height="315"
          frameborder="0"
          allowfullscreen
          src={"https://www.youtube.com/embed/" + this.props.movie.youtubeId}></iframe>

        <ul className="movie-details">
          <li><b>Genre: </b>{this.props.movie.genre}</li>
          <li><b>Actors: </b>{this.printActors(this.props.movie.actors)}</li>
          <li><b>Long Description: </b>{this.props.movie.longDescription}</li>
        </ul>
        <div className="movie-buttons">
          <Button text="Back" click={this.props.back}/>
          <Button text="Edit" click={() => this.props.edit(this.props.movie)}/>
          <Button text="Delete" click={() => this.props.delete(this.props.movie)}/>
        </div>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />