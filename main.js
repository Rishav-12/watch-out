// initialize context
kaboom({
  background: [204, 255, 247],
})

// load assets
loadSprite("apple", "sprites/apple.png")
loadSprite("bomb", "sprites/bomb.png")
loadSound("eat", "sounds/powerup.mp3")
loadSound("explode", "sounds/explode.mp3")
loadSound("OtherworldlyFoe", "sounds/OtherworldlyFoe.mp3");

let score_value = 0

function addRandomly() {
  let r = Math.random()
  if (r < 0.55) {
    add([
      sprite("apple"),
      pos(rand(width() - 80), rand(height() - 80)),
      area(),
      "apple",
    ])
  } else {
    add([
      sprite("bomb"),
      pos(rand(width() - 80), rand(height() - 80)),
      area(),
      "bomb",
    ])
  }
}

const music = play("OtherworldlyFoe", {
  volume: 0.5,
  loop: true
})
music.play()

scene("gameOver", () => {
  add([
    pos(24, 24),
    text(`Score: ${score_value}`),
  ])
  add([
    pos(width() / 2 - 220, height() / 2 - 140),
    text("GAME OVER\nPress Space to continue", {
      size: 80,
      width: 520,
    }),
  ])
  // when game is over press space to restart
  onKeyPress("space", () => {
    go("gameRunning")
  })
})

scene("gameRunning", () => {
  score_value = 0
  // add score text
  const score = add([
    text("Score: 0"),
    pos(24, 24),
    { value: score_value },
  ])

  // every 3 seconds spawn either an apple or a bomb
  loop(3, () => {
    destroyAll("apple")
    destroyAll("bomb")
    addRandomly()
  })

  onClick("apple", () => {
    destroyAll("apple")
    score_value += 1 // updates the variable to show on end screen
    score.value += 1 // updates the value property of score
    score.text = "Score: " + score.value
    play("eat")
    shake(80)
    addRandomly()
  })

  onClick("bomb", () => {
    addKaboom(mousePos())
    play("explode")
    shake(120)
    wait(0.5, () => {
      go("gameOver")
    })
  })
})

go("gameRunning")
