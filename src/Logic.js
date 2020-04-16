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
    afterDealer: 0,
    picker: undefined,
    partner: undefined,
    deck: buildDeck(),
  }
}

/* Filters and checks */

function noCardsLeft(G, ctx) {
  return (
    G.hand[0].length ===
    G.hand[1].length ===
    G.hand[2].length ===
    G.hand[3].length ===
    G.hand[4].length ===
    0
  )
}

function doneBurying(G, ctx) {
  console.log("Checking if done burying")
  return G.hand[ctx.currentPlayer].length === 6
}


/* State changes and "moves" */

function putTheNutOnTheTable(G, ctx) {
  G.factor *= 2;
}

function nextPlayer(i) {
  if (i === 5) {
    return 0
  } else {
    return parseInt(i) + 1
  }
}

function rotateFromPlayerIndex(i) {
  // This is probably a really dumb way to do this, but we need to create a 
  // "round" of turn order based on a given index
  let players = []
  players = [...Array(5).keys()]
  let index = parseInt(i) + 1
  for (i=0; i<index; i++) {
    players.push(players.shift())
  }
  return players
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
  G.dealer = ctx.currentPlayer;
  G.afterDealer = nextPlayer(G.dealer)
  ctx.events.endPhase()
}

function pass(G, ctx) {
  // literally nothing
  ctx.events.endTurn();
}

function pick(G, ctx) {
  G.hand[ctx.currentPlayer].push(G.kitty.pop())
  G.hand[ctx.currentPlayer].push(G.kitty.pop())
  G.picker = ctx.currentPlayer;
  ctx.events.endPhase();
}

function buryCard(G, ctx) {
  // TODO: Let them choose a card??
  G.kitty.push(G.hand[ctx.currentPlayer].pop())
  ctx.events.endTurn({next: G.picker});
}

function callAce(G, ctx) {
  ctx.events.endPhase({turn: {next: G.afterDealer}});
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
  doneBurying,
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

