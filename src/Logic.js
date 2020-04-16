const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

function cardsInSuit(suit) {
  var cards = ['7', '8', '9', '10', 'A', 'K', 'Q', 'J']
  return cards.map(function(x) { return { suit: suit, name: x } } )
}

function buildDeck() {
  var suits = ['hearts', 'spades', 'clubs', 'diamonds']
  return flatMap(cardsInSuit, suits)
}

function initialState(ctx) {
  return {
    kitty: [],
    table: [],
    name: [...Array(5).keys()].map(x => "Player " + (x+1)),
    hand: Array(ctx.numPlayers).fill([]),
    tricks: Array(ctx.numPlayers).fill([]),
    points: Array(ctx.numPlayers).fill(0),
    factor: 1,
    dealer: 0,
    // because TurnOrder.CUSTOM_FROM requires a field
    after_dealer: 0,
    picker: undefined,
    partner: undefined,
    deck: buildDeck(),
  }
}

/* Filters and checks */

function noCardsLeft(G) {
  return (
    G.hand[0].length ===
    G.hand[1].length ===
    G.hand[2].length ===
    G.hand[3].length ===
    G.hand[4].length ===
    0
  )
}


/* State changes and "moves" */

function putTheNutOnTheTable(G, ctx) {
  G.factor *= 2;
}

function dealCards(G, ctx) {
  G.deck = ctx.random.Shuffle(G.deck)
  function deal() {
    return G.deck.pop()
  }
  function getHand() {
    return [deal(), deal(), deal(), deal(), deal(), deal()]
  }

  // I know this isn't legal Sheboygan-style dealing the kitty first, SHH don't tell anyone
  G.kitty = [deal(), deal()]
  G.hand = [...Array(5).keys()].map(() => getHand())
  console.log("Current player", ctx.currentPlayer);
  G.dealer = ctx.currentPlayer;
  ctx.events.endPhase();
}

function pass(G, ctx) {
  // literally nothing
}

function pick(G, ctx) {
  G.hand[ctx.currentPlayer].push(G.kitty.pop())
  G.hand[ctx.currentPlayer].push(G.kitty.pop())
  G.picker = ctx.currentPlayer;
  ctx.events.endPhase();
}

function buryCard(G, ctx) {
  // TODO
}

function callAce(G, ctx) {
  // TODO
  ctx.events.endPhase()
}

function playCard(G, ctx) {
  ctx.events.endPhase()
  // TODO
  // how does player select a card?
  // G.table.append(card)
  // remove from hand
  // G.hand[ctx.currentPlayer].slice();
}

function crack(G, ctx) {
  // TODO
}

function recrack(G, ctx) {
  // TODO
}


export { 
  initialState,
  buildDeck,
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
}

