import React, { Component } from 'react';


export class Button extends React.Component {


  render() {
    return (
      <div className="button-wrapper" onClick={this.props.click}>
        <div className="button-text">{this.props.text}</div>
      </div>
    );
  }
}

  // Example usage: <ShoppingList name="Mark" />