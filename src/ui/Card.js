import React from 'react';

export class Card extends React.Component {
  render() {
    const cardStyle = {
      border: '1px solid #555',
      width: '100px',
      height: '150px',
      lineHeight: '75px',
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <span style={cardStyle}>
        <span>{this.props.value.suit}</span>
        <span>{this.props.value.name}</span>
      </span>
    );
  }
}

