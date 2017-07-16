var queue = [] // 存储队列的值

/**
 * 封装 document.getElementById 方法
 *
 */
function $(id) {
  return document.getElementById(id)
}

/**
 * 根据当前 queue 数组的元素来更新队列
 *
 */
function update(queue) {
  var str = ''

  queue.forEach(function (val) {
    str += `<div class="number" style="height: ${val}px; top: ${100 - val}px"></div>`
  })
  $('queue').innerHTML = str
  $('text').value = ''
}

/**
 * 对输入值进行去空白符处理
 * 根据 input 输入框的值是否为整数和空字符串
 * 输入值是否为 10 - 100 之间
 * queue 的长度是否超过 60
 * 来判断是否更新队列
 */
function isUpdate(queue) {
  var value = $('text').value

  if (queue.length >= 60) {
    alert('队列元素的数量不能超过 60个！')
    return false
  }

  if ((!Number.isInteger(+value) || value.trim() === '') || (+value < 10 || +value > 100)) {
    alert('请输入 10 - 100 之间的整数！')
    return false
  }
  return true
}

/**
 * 获取子元素 (.number) 在父元素 (#queue) 中的下标
 *
 */
function getIndex(elt) {
  var number = $('queue').children

  for (var i = 0, len = number.length; i < len; i++) {

    if (number[i] === elt) {
      return i
    }
  }
}

$('left-in').addEventListener('click', function () {

  if (isUpdate(queue)) {
    queue.unshift(+$('text').value)
    update(queue)
  }
})

$('right-in').addEventListener('click', function () {

  if (isUpdate(queue)) {
    queue.push(+$('text').value)
    update(queue)
  }
})

$('left-out').addEventListener('click', function () {

  // 如果 queue 为空数组则不执行删除操作
  if (queue.length !== 0) {
    alert(queue.shift())
    update(queue)
  }
})

$('right-out').addEventListener('click', function () {

  if (queue.length !== 0) {
    alert(queue.pop())
    update(queue)
  }
})

$('queue').addEventListener('click', function (e) {
  var target = e.target

  if (target.className === 'number') {
    queue.splice(getIndex(target), 1)
  }
  update(queue)
})

var snapshots = [] // 存储冒泡排序快照
$('sort').addEventListener('click', function () {
  if (queue.length === 0) {
    return null
  }

  $('left-in').disabled = true
  $('right-in').disabled = true
  $('left-out').disabled = true
  $('right-out').disabled = true
  $('sort').disabled = true
  $('text').disabled = true

  // 冒泡排序
  for (var i = 0; i < queue.length - 1; i++) {

    for (var j = 0; j < queue.length - 1 - i; j++) {

      if (queue[j] > queue[j + 1]) {
        queue[j] = queue[j] + queue[j + 1]
        queue[j + 1] = queue[j] - queue[j + 1]
        queue[j] = queue[j] - queue[j + 1]
      }
      snapshots.push(JSON.parse(JSON.stringify(queue)))
    }
  }
  bubbleSort()
})

/**
 * 冒泡排序可视化
 *
 */
function bubbleSort() {
  var index = 0
  var timer = setInterval(function () {
    update(snapshots[index++])

    if (index >= snapshots.length) {
      clearInterval(timer)
      $('left-in').disabled = false
      $('right-in').disabled = false
      $('left-out').disabled = false
      $('right-out').disabled = false
      $('sort').disabled = false
      $('text').disabled = false
      snapshots = []
    }
  }, 100)
}
