let deckId;
let playerHand = [];
let dealerHand = [];
let gameOver = false;

const startBtn = document.getElementById('startBtn');
const hitBtn = document.getElementById('hitBtn');
const standBtn = document.getElementById('standBtn');
const playerCardsDiv = document.getElementById('playerCards');
const dealerCardsDiv = document.getElementById('dealerCards');
const playerScoreP = document.getElementById('playerScore');
const dealerScoreP = document.getElementById('dealerScore');
const messageP = document.getElementById('message');

startBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', playerHit);
standBtn.addEventListener('click', playerStand);

async function startGame() {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
  const data = await res.json();
  deckId = data.deck_id;
  playerHand = [];
  dealerHand = [];
  gameOver = false;
  messageP.textContent = '';
  playerCardsDiv.innerHTML = '';
  dealerCardsDiv.innerHTML = '';
  playerScoreP.textContent = 'Puntuación: 0';
  dealerScoreP.textContent = 'Puntuación: 0';
  hitBtn.disabled = false;
  standBtn.disabled = false;

  // Repartir dos cartas al jugador y al crupier
  const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
  const drawData = await drawRes.json();
  playerHand.push(drawData.cards[0], drawData.cards[2]);
  dealerHand.push(drawData.cards[1], drawData.cards[3]);

  renderHands();
  checkForBlackjack();
}

function renderHands() {
  playerCardsDiv.innerHTML = '';
  dealerCardsDiv.innerHTML = '';

  playerHand.forEach(card => {
    const img = document.createElement('img');
    img.src = card.image;
    playerCardsDiv.appendChild(img);
  });

  dealerHand.forEach((card, index) => {
    const img = document.createElement('img');
    if (index === 0 && !gameOver) {
      img.src = 'https://deckofcardsapi.com/static/img/back.png';
    } else {
      img.src = card.image;
    }
    dealerCardsDiv.appendChild(img);
  });

  if (gameOver) {
    dealerScoreP.textContent = `Puntuación: ${calculateHandValue(dealerHand)}`;
  } else {
    dealerScoreP.textContent = 'Puntuación: ?';
  }
  playerScoreP.textContent = `Puntuación: ${calculateHandValue(playerHand)}`;
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'ACE') {
      value += 11;
      aces += 1;
    } else {
      value += parseInt(card.value);
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
}

function checkForBlackjack() {
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  if (playerTotal === 21) {
    endGame();
  }
}

async function playerHit() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const data = await res.json();
  playerHand.push(data.cards[0]);
  renderHands();

  const playerTotal = calculateHandValue(playerHand);
  if (playerTotal > 21) {
    endGame();
  }
}

function playerStand() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
  dealerTurn();
}

async function dealerTurn() {
  while (calculateHandValue(dealerHand) < 17) {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();
    dealerHand.push(data.cards[0]);
  }
  endGame();
}

function endGame() {
  gameOver = true;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  renderHands();

  const playerTotal = calculateHandValue(playerHand);
  //const
//::contentReference[oaicite:0]{index=0}
 
}