// Main logic is in Logic
import {
  initialState,
  noCardsLeft,
  putTheNutOnTheTable,
  dealCards,
  pass,
  pick,
  buryCard,
  // crack,
  // recrack,
  callAce,
  playCard,
} from './Logic';

import { TurnOrder } from 'boardgame.io/core';
import { ActivePlayers } from 'boardgame.io/core';

export const Sheepshead = {
  name: 'sheepshead',
  setup: (ctx) => initialState(ctx),
  numPlayers: 5,
  turn: { moveLimit: 1 },
  phases: {
    beginHand: {
      start: true,
      moves: { 
        dealCards,
        putTheNutOnTheTable,
      },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      next: 'pick',
    },
    pick: {
      turn: {
        order: TurnOrder.CUSTOM_FROM('after_dealer'),
      },
      moves: {
        pass,
        pick,
      },
      next: 'bury',
    },
    bury: {
      turn: {
        order: TurnOrder.CUSTOM_FROM('picker'),
      },
      moves: {
        buryCard,
      },
      next: 'callAce',
    },
    call: {
      moves: {
        callAce,
      },
      next: 'play',
    },
    // TODO: Allow crack/recrack before first play
    play: {
      moves: { playCard },
      endIf: noCardsLeft,
      next: 'score',
    },
    score: {
      // back to the start jimbo
    }
  }
};

