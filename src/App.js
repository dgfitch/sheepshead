import React from 'react';

import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer'
import { Sheepshead } from './Sheepshead';
import { CardTable } from './ui/CardTable';

const SheepsheadClient = Client({
  game: Sheepshead,
  numPlayers: 5,
  board: CardTable,
  // debug: false,
  multiplayer: SocketIO({ server: "localhost:8000" })
});


class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 1
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 2
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Player 3
          </button>
          <button onClick={() => this.setState({ playerID: "3" })}>
            Player 4
          </button>
          <button onClick={() => this.setState({ playerID: "4" })}>
            Player 5
          </button>
        </div>
      );
    }
    return (
      <div>
        <SheepsheadClient playerID={this.state.playerID} />
      </div>
    );
  }
}


export default App;

