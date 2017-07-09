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
 * down: deg % 360 = 180
 * left: deg % 360 = 270
 * right: deg % 360 = 90
 */
function getDirection() {
  switch (Math.abs(deg % 360)) {
    case 0:
      return 'up'
    case 180:
      return 'down'
    case 270:
      return 'left'
    case 90:
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
  }
}
