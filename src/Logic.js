const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

function cardsInSuit(suit) {
  var cards = ['7', '8', '9', '10', 'A', 'K', 'Q', 'J'];
  return cards.map(function(x) { return { suit: suit, name: x } } );
}

function buildDeck() {
  var suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  return flatMap(cardsInSuit, suits);
}

function createPlayer(index) {
  return {
    name: 'Player ' + (index + 1),
    points: 0,
    hand: [],
  }
}

function initialState() {
  return {
    kitty: [],
    players: [0,1,2,3,4].map(createPlayer),
  };
}

function dealCards(state) {
  var cards = buildDeck()
  function deal() {
    return cards.splice(Math.floor(Math.random()*cards.length), 1);
  }
  function getHand() {
    return [deal(), deal(), deal(), deal(), deal(), deal()]
  }

  return Object.assign(state, {
    // I know this isn't legal Sheboygan-style dealing the kitty first, SHH don't tell anyone
    kitty: [deal(), deal()],
    players: state.players.map(p => Object.assign(p, {hand: getHand()})),
  });
}

export { buildDeck, dealCards, initialState };
