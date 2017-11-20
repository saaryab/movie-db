import React, { Component } from 'react';


export class MoviePreview extends React.Component {
    youtubeThumbnail(id) {
      return 'http://img.youtube.com/vi/' + id + '/default.jpg'
  
    }
  
    render() {
      return (
        <div className="movie-item" onClick={this.props.click}>
          <h3 className="movie-title">{this.props.movie.title}</h3>
          <img
            src={this.youtubeThumbnail(this.props.movie.youtubeId)}
            className="movie-thumbnail"
            alt="movie thumbnail" />
  
          <div className="movie-details">
            <div><b>Genre: </b>{this.props.movie.genre}</div>
            <div><b>Description: </b>{this.props.movie.description}</div>
          </div>
        </div>
      );
    }
  }
  
  // Example usage: <ShoppingList name="Mark" />