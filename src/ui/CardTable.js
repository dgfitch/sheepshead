import React from 'react';
import { Card } from './Card';

export class CardTable extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id)
      this.props.events.endTurn()
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false
    return true
  }

  render() {
    let hands = []
    for (let i = 0; i < 5; i++) {
      let cells = []
      let name = this.props.G.name[i]
      let hand = this.props.G.hand[i]
      cells.push(<span key='name'>{name}</span>)
      hand.forEach(function (card) {
        let cardKey = i.toString() + card.suit + card.name
        cells.push(
          <Card key={cardKey} value={card} onClick={() => this.onClick(card)}/>
        )
      })
      hands.push(<div key={i}>{cells}</div>)
    }

    let extra = <h1>Sheepshead</h1>

    return (
      <div id="table">
        {extra}
        <div id="hands">
          {hands}
        </div>
      </div>
    )
  }
}
