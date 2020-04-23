// Main logic is in Logic
import {
  initialState,
  noCardsLeft,
  doneBurying,
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
    deal: {
      start: true,
      moves: { 
        dealCards,
        // the traditional nut, not an obscene thing, a piece of hardware used 
        // to signify the "doubling out" of the final hand
        putTheNutOnTheTable,
      },
      next: 'pick',
    },
    pick: {
      turn: {
        order: TurnOrder.CONTINUE,
      },
      moves: {
        pass,
        pick,
      },
      next: 'bury',
      // TODO: What if the dealer passes?
    },
    bury: {
      turn: { order: TurnOrder.CONTINUE },
      moves: { buryCard },
      endIf: doneBurying,
      next: 'call',
    },
    call: {
      turn: { order: TurnOrder.CONTINUE },
      moves: {
        callAce,
      },
      next: 'hand',
    },
    // TODO: Allow crack/recrack before first play
    hand: {
      turn: {
        // TODO: We need to start with the player after the dealer,
        // but this doesn't work for some reason
        // order: TurnOrder.CUSTOM_FROM("afterDealer"),
        first: (G, ctx) => G.afterDealer,
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
      },
      moves: { playCard },
      endIf: noCardsLeft,
      next: 'score',
    },
    score: {
      // back to the start jimbo
      next: 'deal',
    }
  }
};

