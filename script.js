const images = [
  'IMG_1954.JPG',
  'IMG_1955.PNG',
  'IMG_1956.JPG',
  'IMG_1957.JPG',
  'IMG_1959.JPG',
  'IMG_1960.JPG',
  'IMG_1961.JPG',
  'IMG_1962.JPG',
];

const cardsArray = [...images, ...images]; // duplica


cardsArray.sort(() => 0.5 - Math.random()); // embaralha


const gameBoard = document.getElementById('gameBoard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cardsArray.forEach((img) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = `images/${img}`;

  card.appendChild(image);
  gameBoard.appendChild(card);

  card.addEventListener('click', () => flipCard(card));
});


function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  const isMatch =
    firstCard.querySelector('img').src ===
    secondCard.querySelector('img').src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard(); 
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}


