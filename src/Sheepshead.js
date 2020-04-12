// Main logic is in Logic
import {
  initialState,
  noCardsLeft,
  putTheNutOnTheTable,
  dealCards,
  pass,
  pick,
  buryCard,
  crack,
  recrack,
  callAce,
  playCard,
} from './Logic';

export const Sheepshead = {
  name: 'sheepshead',
  setup: () => initialState(),
  numPlayers: 5,
  phases: {
    beginHand: {
      moves: { 
        putTheNutOnTheTable,
        dealCards,
      },
    },
    pick: {
      moves: {
        pass,
        pick,
      },
    },
    bury: {
      buryCard,
      callAce,
    },
    lead: {
      moves: {
        playCard,
        crack,
        recrack,
      },
    },
    play: {
      moves: { playCard },
      endIf: noCardsLeft,
    },
    score: {
      // back to the start jimbo
    }
  }
};

