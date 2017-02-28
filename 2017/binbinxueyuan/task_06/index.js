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
 * 对用户输入的值进行处理
 *
 */
function handleInput(str) {
  var re = /[\s, ，、]+/
  console.log(str.split(re))

  return str.split(re).filter(function (val) {
    return val !== ''
  })
}

/**
 * 判断是否更新
 */
function isUpdate(arr) {

  return arr.every(function (val) {
    return /^[\w\u4E00-\u9FA5]*$/.test(val)
  })
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

/**
 * 模糊匹配查询文本
 *
 */
function renderQueryText() {
  var str = ''

  queue.forEach(function (val) {
    val = val.replace($('query-text').value, '<span style="color: black;">$&</span>')
    str += `<div class="number">${val}</div>`
  })
  $('queue').innerHTML = str
  $('query-text').value = ''
}

$('left-in').addEventListener('click', function () {
  var splits = handleInput($('text').value)

  if (isUpdate(splits)) {
    queue.unshift(...splits)
    update()
  }
})

$('right-in').addEventListener('click', function () {
  var splits = handleInput($('text').value)

  if (isUpdate(splits)) {
    queue.push(...splits)
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

$('query-btn').addEventListener('click', function () {
  renderQueryText()
})
