// initialize context
kaboom({
  background: [204, 255, 247],
})

// load assets
loadSprite("apple", "sprites/apple.png")
loadSprite("bomb", "sprites/bomb.png")
loadSound("eat", "sounds/powerup.mp3")
loadSound("explode", "sounds/explode.mp3")

scene("gameOver", () => {
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
  // add score text
  const score = add([
    text("Score: 0"),
    pos(24, 24),
    { value: 0 },
  ])

  add([
    sprite("apple"),
    pos(rand(width() - 80), rand(height() - 80)),
    area(),
    "apple",
  ])
  // every 3 seconds spawn either an apple or a bomb
  loop(3, () => {
    destroyAll("apple")
    destroyAll("bomb")
    let r = Math.random()
    if (r < 0.7) {
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
  })

  onClick("apple", () => {
    destroyAll("apple")
    addKaboom(mousePos())
    score.value += 1
    score.text = "Score: " + score.value
    play("eat")
    add([
      sprite("apple"),
      pos(rand(width() - 80), rand(height() - 80)),
      area(),
      "apple",
    ])
  })

  onClick("bomb", () => {
    play("explode")
    shake(120)
    go("gameOver")
  })
})

go("gameRunning")

// burp on "b"
onKeyPress("b", burp)