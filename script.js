'use strict'

const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const player0NameEl = document.getElementById('name--0')
const player1NameEl = document.getElementById('name--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, playing, currentScore, activePlayer

const init = function () {
  scores = [0, 0]
  playing = true
  currentScore = 0
  activePlayer = 0

  score0El.textContent = 0
  score1El.textContent = 0
  current1El.textContent = 0
  current0El.textContent = 0

  diceEl.classList.add('hidden')
  player0.classList.remove('player--winner')
  player1.classList.remove('player--winner')
  player0.classList.add('player--active')
  player1.classList.remove('player--active')
  player0NameEl.textContent = 'Player 1'
  player1NameEl.textContent = 'Player 2'
}
init()

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1

    // 2. Display dice roll
    diceEl.src = `images/dice-${dice}.png`
    diceEl.classList.remove('hidden')

    // 3. Check if rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      // Switch player
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    if (scores[activePlayer] >= 10) {
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
        document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} wins`
    } else {
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
