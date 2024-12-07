const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
let flippedCards = [];
let matchedCards = 0;
let timer;
let time = 0;

// Generate 5,000 pairs of random emojis
const generateEmojis = () => {
  const baseEmojis = [
    '🐱', '🐻', '🐘', '🐅', '🐶',
    '🦁', '🦒', '🐼', '🦊', '🐵',
    '🦓', '🦘', '🐯', '🐧', '🐢',
    '🐬', '🐋', '🦭', '🦩', '🦄',
    '🐿️', '🦔', '🦦', '🦈', '🦚',
    '🦃', '🐨', '🐉', '🐾', '🦢'
  ];

  const emojis = [];
  while (emojis.length < 5000) {
    emojis.push(...baseEmojis.slice(0, Math.min(5000 - emojis.length, baseEmojis.length)));
  }
  return [...emojis, ...emojis]; // Pair them
};

const animalEmojis = generateEmojis();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;

  // Click event listener with animation
  card.addEventListener('click', () => {
    if (
      card.classList.contains('flipped') || 
      card.classList.contains('matched') || 
      flippedCards.length === 2
    ) {
      return; // Ignore if already flipped or matched
    }

    // Flip the card
    card.classList.add('flipped');
    card.textContent = symbol; // Reveal the emoji
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });

  return card;
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    // Matched cards
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;

    // Check if game is won
    if (matchedCards === 10000) {
      stopTimer();
      setTimeout(() => alert(`You won! Time: ${time}s`), 500);
    }
  } else {
    // Not a match, hide cards after a short delay
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }, 1000);
  }

  flippedCards = [];
}

function initializeGame() {
  board.innerHTML = ''; // Clear the board
  flippedCards = [];
  matchedCards = 0;
  time = 0;
  timerDisplay.textContent = 'Time: 0s';

  const shuffledSymbols = [...animalEmojis];
  shuffleArray(shuffledSymbols);

  shuffledSymbols.forEach((symbol) => {
    const card = createCard(symbol);
    board.appendChild(card);
  });

  startTimer();
}

// Start the game immediately
initializeGame();