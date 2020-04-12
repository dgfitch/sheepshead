import {initialState, buildDeck} from './Logic';

test('make a deck', () => {
  let deck = buildDeck();
  expect(deck.length).toEqual(32);
});

test('initialState has empty hands and kitty', () => {
  let state = initialState()
  expect(state.players[0].hand.length).toEqual(0);
  expect(state.kitty.length).toEqual(0);
});

test('deal cards to initial state gives each player 6 cards and 2 in kitty', () => {
  let state = initialState()
  state.players.forEach(function(p) {
    expect(p.hand.length).toEqual(6);
  })
  expect(state.kitty.length).toEqual(2);
});

