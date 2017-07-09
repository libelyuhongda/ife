const grid = document.getElementById('grid')

// 绘制网格
if (grid.getContext) {
  const context = grid.getContext('2d')

  context.beginPath()

  for (var i = 1; i < 10; i++) {
    context.moveTo(0, i * 50)
    context.lineTo(500, i * 50)

    context.moveTo(i * 50, 0)
    context.lineTo(i * 50, 500)
  }

  context.stroke()
}

const square = document.getElementById('square')

// 绘制小方块
if (square.getContext) {
  const context = square.getContext('2d')

  context.fillStyle = 'blue'

  context.fillRect(0, 0, 50, 15)

  context.fillStyle = 'red'

  context.fillRect(0, 15, 50, 35)
}

const text = document.getElementById('text')

// 绘制坐标
if (text.getContext) {
  const context = text.getContext('2d')

  context.font = '24px serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  for (var i = 1; i <= 10; i++) {
    context.fillText(i, 25 + i * 50, 25)
    context.fillText(i, 25, 25 + i * 50)
  }
}

let deg = 0 // 存储当前旋转的角度

/**
 * 获取方块的方向
 * up: deg % 360 = 0
 * down: deg % 360 = 180 | -180
 * left: deg % 360 = 270 | -90
 * right: deg % 360 = 90 | -270
 */
function getDirection() {
  switch (deg % 360) {
    case 0:
      return 'up'
    case 180:
    case -180:
      return 'down'
    case 270:
    case -90:
      return 'left'
    case 90:
    case -270:
      return 'right'
  }
}

let x = 0
let y = 0
let offsetX = 0
let offsetY = 0

/**
 * 使方块向蓝色边所面向的方向前进一格
 */
function go() {
  console.log(getDirection());
  switch (getDirection()) {
    case 'up':
      offsetX = 0
      offsetY = -50
      break
    case 'down':
      offsetX = 0
      offsetY = 50
      break
    case 'left':
      offsetX = -50
      offsetY = 0
      break
    case 'right':
      offsetX = 50
      offsetY = 0
      break
  }

  if (x + offsetX > 450 || x + offsetX < 0 || y + offsetY > 450 || y + offsetY < 0) {
    return
  }

  const squareGo = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`
    },
    {
      transform: `translate(${x += offsetX}px, ${y += offsetY}px) rotate(${deg}deg)`
    }
  ]

  square.animate(squareGo, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向左转
 */
function turnLeft() {

  const squareTurnLeft = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`
    },
    {
      transform: `translate(${x}px, ${y}px) rotate(${deg = deg - 90}deg)`
    }
  ]

  square.animate(squareTurnLeft, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向右转
 */
function turnRight() {
  const squareTurnRight = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`
    },
    {
      transform: `translate(${x}px, ${y}px) rotate(${deg = deg + 90}deg)`
    }
  ]

  square.animate(squareTurnRight, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向后转（顺时针）
 */
function turnBack() {
  const squareTurnBack = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`
    },
    {
      transform: `translate(${x}px, ${y}px) rotate(${deg = deg + 180}deg)`
    }
  ]

  square.animate(squareTurnBack, {
    fill: 'forwards',
    duration: 1000
  })
}

/**
 * 使方块向左平移
 */
function translateLeft() {
  if (x - 50 < 0) {
    return
  }

  const squareTranslateLeft = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg`
    },
    {
      transform: `translate(${x-=50}px, ${y}px) rotate(${deg}deg`
    }
  ]

  square.animate(squareTranslateLeft, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向上平移
 */
function translateTop() {
  if (y - 50 < 0) {
    return
  }

  const squareTranslateTop = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg`
    },
    {
      transform: `translate(${x}px, ${y-=50}px) rotate(${deg}deg`
    }
  ]

  square.animate(squareTranslateTop, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向右平移
 */
function translateRight() {
  if (x + 50 > 450) {
    return
  }
  const squareTranslateRight = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg`
    },
    {
      transform: `translate(${x+=50}px, ${y}px) rotate(${deg}deg`
    }
  ]

  square.animate(squareTranslateRight, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块向下平移
 */
function translateBottom() {
  if (y + 50 > 450) {
    return
  }
  const squareTranslateBottom = [{
      transform: `translate(${x}px, ${y}px) rotate(${deg}deg`
    },
    {
      transform: `translate(${x}px, ${y+=50}px) rotate(${deg}deg`
    }
  ]

  square.animate(squareTranslateBottom, {
    fill: 'forwards',
    duration: 500
  })
}

/**
 * 使方块方向向左并前进一格
 */
function moveLeft() {
  switch (getDirection()) {
    case 'up':
      turnLeft()
      go()
      break
    case 'down':
      turnRight()
      go()
      break
    case 'left':
      go()
      break
    case 'right':
      turnBack()
      go()
      break
  }
}

/**
 * 使方块方向向上并前进一格
 */
function moveTop() {
  switch (getDirection()) {
    case 'up':
      go()
      break
    case 'down':
      turnBack()
      go()
      break
    case 'left':
      turnRight()
      go()
      break
    case 'right':
      turnLeft()
      go()
      break
  }
}

/**
 * 使方块方向向右并前进一格
 */
function moveRight() {
  switch (getDirection()) {
    case 'up':
      turnRight()
      go()
      break
    case 'down':
      turnLeft()
      go()
      break
    case 'left':
      turnBack()
      go()
      break
    case 'right':
      go()
      break
  }
}

/**
 * 使方块方向向下并前进一格
 */
function moveBottom() {
  switch (getDirection()) {
    case 'up':
      turnBack()
      go()
      break
    case 'down':
      go()
      break
    case 'left':
      turnLeft()
      go()
      break
    case 'right':
      turnRight()
      go()
      break
  }
}

const perform = document.getElementById('perform')
const instruction = document.getElementById('instruction')

instruction.onchange = () => {
  switch (instruction.value) {
    case 'go':
      perform.onclick = go
      break
    case 'turn-left':
      perform.onclick = turnLeft
      break
    case 'turn-right':
      perform.onclick = turnRight
      break
    case 'turn-back':
      perform.onclick = turnBack
      break
    case 'tra-left':
      perform.onclick = translateLeft
      break
    case 'tra-top':
      perform.onclick = translateTop
      break
    case 'tra-right':
      perform.onclick = translateRight
      break
    case 'tra-bottom':
      perform.onclick = translateBottom
      break
    case 'move-left':
      perform.onclick = moveLeft
      break
    case 'move-top':
      perform.onclick = moveTop
      break
    case 'move-right':
      perform.onclick = moveRight
      break
    case 'move-bottom':
      perform.onclick = moveBottom
      break
  }
}
