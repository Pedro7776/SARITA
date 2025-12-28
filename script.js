const images = [
  'IMG_1954.JPG',
  'IMG_1955.PNG',
  'IMG_1956.JPG',
  'IMG_1957.JPG',
  'IMG_1959.JPG',
  'IMG_1960.JPG',
  'IMG_1961.JPG',
  'IMG_1962.JPG'
];

// duplica para formar os pares
const cardsArray = [...images, ...images];

// embaralha
cardsArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cardsArray.forEach((img) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = img; // 🔥 CORRETO: imagens estão na mesma pasta
  image.alt = 'carta';

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
  const img1 = firstCard.querySelector('img').src;
  const img2 = secondCard.querySelector('img').src;

  if (img1 === img2) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.style.pointerEvents = 'none';
  secondCard.style.pointerEvents = 'none';
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
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
