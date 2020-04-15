import React from 'react';

import { Client } from 'boardgame.io/react';
import { Sheepshead } from './Sheepshead';
import { CardTable } from './ui/CardTable';

const SheepsheadClient = Client({
  game: Sheepshead,
  numPlayers: 5,
  board: CardTable,
  debug: true,
});


export class SinglePlayer extends React.Component {
  render() {
    return (
      <SheepsheadClient />
    )
  }
}

