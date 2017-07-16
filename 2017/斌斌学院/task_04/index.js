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
function update() {
  var str = ''

  queue.forEach(function (val) {
    str += `<div class="number">${val}</div>`
  })
  $('queue').innerHTML = str
  $('text').value = ''
}

/**
 * 对输入值进行去空白符处理
 * 根据 input 输入框的值是否为整数和空字符串
 * 来判断是否更新队列
 */
function isUpdate() {
  var value = $('text').value

  if (!Number.isInteger(+value) || value.trim() === '') {
    alert('请输入整数！')
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

  if (isUpdate()) {
    queue.unshift(+$('text').value)
    update()
  }
})

$('right-in').addEventListener('click', function () {

  if (isUpdate()) {
    queue.push(+$('text').value)
    update()
  }
})

$('left-out').addEventListener('click', function () {

  // 如果 queue 为空数组则不执行删除操作
  if (queue.length !== 0) {
    alert(queue.shift())
    update()
  }
})

$('right-out').addEventListener('click', function () {

  if (queue.length !== 0) {
    alert(queue.pop())
    update()
  }
})

$('queue').addEventListener('click', function (e) {
  var target = e.target

  if (target.className === 'number') {
    queue.splice(getIndex(target), 1)
  }
  update()
})
