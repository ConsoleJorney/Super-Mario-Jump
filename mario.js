const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gumba = document.querySelector('.gumba');
const ball = document.querySelector('.ball');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const koopa = document.querySelector('.koopa');
const king = document.querySelector('.king'); 
const mushroom = document.querySelector('.mushroom'); 

const audioStart = new Audio('./som/start.mp3');
audioStart.loop = true;
const audioGameOver = new Audio('./som/gameover.mp3');

let marioHealth = 3;
let pontuacao = 0;
let estaPulando = false; 
let loop; 

const startGame = () => {
  pipe.classList.add('pipe-animation');
  gumba.classList.add('gumba-animation');
  ball.classList.add('ball-animation');
  koopa.classList.add('koopa-animation');
  king.classList.add('king-animation'); 
  mushroom.classList.add('mushroom-animation'); 
  start.style.display = 'none';

  audioStart.play();
  loop = setInterval(checkCollision, 10);
  setInterval(atualizarPontuacao, 1000); // Atualiza a cada segundo
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  gumba.style.left = '';
  ball.style.left = '';
  koopa.style.left = '';
  king.style.left = ''; 
  mushroom.style.left = ''; 
  mario.src = './imagem/mario.gif';
  mario.style.width = '150px';
  mario.style.bottom = '0';
  marioHealth = 3;

  start.style.display = 'none';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

  pipe.classList.add('pipe-animation');
  gumba.classList.add('gumba-animation');
  ball.classList.add('ball-animation');
  koopa.classList.add('koopa-animation');
  king.classList.add('king-animation'); 
  mushroom.classList.add('mushroom-animation');
  
  loop = setInterval(checkCollision, 10);
  setInterval(atualizarPontuacao, 1000); 
  reiniciarJogo(); 
};

const jump = () => {
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    mario.style.animation = 'jump 800ms ease-out';
    estaPulando = true;

    setTimeout(() => {
      mario.classList.remove('jump');
      mario.style.animation = '';
      estaPulando = false;
    }, 800);
  }
};

const duck = () => {
  mario.classList.add('duck');
};

const standUp = () => {
  mario.classList.remove('duck');
};

function checkCollision() {
  const pipePosition = pipe.offsetLeft;
  const gumbaPosition = gumba.offsetLeft;
  const ballPosition = ball.offsetLeft;
  const koopaPosition = koopa.offsetLeft;
  const kingPosition = king.offsetLeft;
  const mushroomPosition = mushroom.offsetLeft; 
  
  const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

  if ((pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) ||
      (gumbaPosition <= 120 && gumbaPosition > 0 && marioPosition < 80) ||
      (koopaPosition <= 120 && koopaPosition > 0 && marioPosition < 80) ||
      (kingPosition <= 120 && kingPosition > 0 && marioPosition < 80) ||
      (mushroomPosition <= 120 && mushroomPosition > 0 && marioPosition < 80)) { 
    endGame();
  } else if (ballPosition <= 120 && ballPosition > 0 && marioPosition < 150) {
    takeDamage();
  }
}

function takeDamage() {
  marioHealth--;
  if (marioHealth > 0) {
    mario.classList.add('damage');
    setTimeout(() => {
      mario.classList.remove('damage');
    }, 500);
  } else {
    endGame();
  }
}

function endGame() {
  pipe.classList.remove('pipe-animation');
  gumba.classList.remove('gumba-animation');
  ball.classList.remove('ball-animation');
  koopa.classList.remove('koopa-animation');
  king.classList.remove('king-animation'); 
  mushroom.classList.remove('mushroom-animation'); // Parar animação do Mushroom

  pipe.style.left = `${pipe.offsetLeft}px`;
  gumba.style.left = `${gumba.offsetLeft}px`;
  ball.style.left = `${ball.offsetLeft}px`;
  koopa.style.left = `${koopa.offsetLeft}px`;
  king.style.left = `${king.offsetLeft}px`; 
  mushroom.style.left = `${mushroom.offsetLeft}px`; // Parar Mushroom

  mario.classList.remove('jump');
  mario.style.bottom = `${parseInt(window.getComputedStyle(mario).bottom.replace('px', ''))}px`;

  mario.src = './imagem/game-over.png';
  mario.style.width = '80px';
  mario.style.marginLeft = '50px';

  audioStart.pause();
  audioGameOver.play();

  setTimeout(() => {
    audioGameOver.pause();
  }, 7000);

  gameOver.style.display = 'flex';

  clearInterval(loop);
  jogadorMorreu();
}

document.addEventListener('keydown', e => {
  const key = e.key;
  if (key === ' ') {
    jump();
  } else if (key === 'Enter') {
    startGame();
  } else if (key === 'ArrowDown') {
    duck();
  }
});

document.addEventListener('keyup', e => {
  if (e.key === 'ArrowDown') {
    standUp();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});

function atualizarPontuacao() {
  if (estaPulando) {
    pontuacao++;
    document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
  }
}

function reiniciarJogo() {
  pontuacao = 0;
  document.getElementById('pontuacao').textContent = 'Pontuação: 0';
}


function jogadorMorreu() {
  estaPulando = false; 
  reiniciarJogo();
}


function simularPulo() {
  estaPulando = true;
  
}
setInterval(atualizarPontuacao, 1000); 



