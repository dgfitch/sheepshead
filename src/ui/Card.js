import React from 'react';

import './card.css';

// TODO: Import something like https://donpark.github.io/scalable-css-playing-cards/

export class Card extends React.Component {
  render() {
    return (
      <span className="card">
        <span className="suit">
          <span className={this.props.value.suit} />
        </span>
        <span>{this.props.value.name}</span>
      </span>
    );
  }
}

