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
    // TODO: component that can take a list of cards
    let hands = []
    for (let i = 0; i < 5; i++) {
      let cells = []
      let name = this.props.G.name[i]
      let hand = this.props.G.hand[i]
      let points = this.props.G.points[i]
      cells.push(<span key='name'>{name} ({points} points)</span>)
      hand.forEach(function (card) {
        let cardKey = i.toString() + card.suit + card.name
        cells.push(
          <Card key={cardKey} value={card} onClick={() => this.onClick(card)}/>
        )
      })
      hands.push(<div key={i}>{cells}</div>)
    }

    let kitty1 = this.props.G.kitty[0]
    let kitty2 = this.props.G.kitty[1]
    let kitty
    if (kitty1 && kitty2) {
      kitty =
        <div id="kitty">
          Kitty:
          <Card value={kitty1} />
          <Card value={kitty2} />
        </div>
    }

    let tablecards = this.props.G.table
    let tablemarkup
    var cards = []
    tablecards.forEach(function (card) {
      let cardKey = card.suit + card.name
      cards.push(
        <Card key={cardKey} value={card} onClick={() => this.onClick(card)}/>
      )
    })
    tablemarkup =
      <div id="table">
        Table: {cards}
      </div>

    let extra = <h1>Sheepshead</h1>

    return (
      <div id="view">
        <div id="debug">
          <div>Player count: {this.props.ctx.numPlayers}</div>
          <div>Phase: {this.props.ctx.phase}</div>
          <div>Current player: {this.props.ctx.currentPlayer}</div>
          <div>Game state turn order: {this.props.G.turnOrder}</div>
          <div>Doubling factor: {this.props.ctx.factor}</div>
          <div>Dealer: {this.props.G.dealer}</div>
          <div>After dealer: {this.props.G.afterDealer}</div>
          <div>Picker: {this.props.G.picker}</div>
          <div>Partner: {this.props.G.partner}</div>
          <div>Tricks: {this.props.G.tricks}</div>
        </div>
        {extra}
        {tablemarkup}
        {kitty}
        <div id="hands">
          {hands}
        </div>
      </div>
    )
  }
}
