// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  var str = Object.prototype.toString.call(arr)

  return /Array/.test(str)
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
  var str = Object.prototype.toString.call(fn)

  return /Function/.test(str)
}

// 判断obj是否为一个日期对象，返回一个bool值
function isDate(obj) {
  var str = Object.prototype.toString.call(obj)

  return /Date/.test(str)
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
  var toString = Object.prototype.toString

  if (typeof src === 'object') {

    switch (toString.call(src).slice(8, -1)) {
      case 'Number':
        return new Number(src)
      case 'String':
        return new String(src)
      case 'Boolean':
        return new Boolean(src)
      case 'Date':
        return new Date(src)
      case 'Null':
        return null
      default:
        var obj = Array.isArray(src) ? [] : {}

        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            if (typeof src[key] === 'object') {
              obj[key] = cloneObject(src[key])
            } else {
              obj[key] = src[key]
            }
          }
        }

        return obj
    }
  } else {
    return src
  }
}

// 测试用例：
var srcObj = {
  a: 1,
  b: {
    b1: ["hello", "hi"],
    b2: "JavaScript"
  }
}
var abObj = srcObj
var tarObj = cloneObject(srcObj)
srcObj.a = 2
srcObj.b.b1[0] = "Hello"

console.log(abObj.a)
console.log(abObj.b.b1[0])

console.log(tarObj.a) // 1
console.log(tarObj.b.b1[0]) // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  var newArr = [arr[0]]

  for (var i = 0; i < arr.length; i++) {

    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }

  return newArr
}

// 使用示例
var a = [1, 3, 5, 7, 5, '3']
var b = uniqArray(a)
console.log(b) // [1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
  var arr = str.split('')

  while (arr[0] === ' ' || arr[0] === '\t') {
    arr.shift()
  }

  while (arr[arr.length - 1] === ' ' || arr[arr.length - 1] === '\t') {
    arr.pop()
  }

  return arr.join('')
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, '')
}

// 使用示例
var str = '   hi!  '
str = trim(str)
console.log(str) // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {

  for (var i = 0; i < arr.length; i++) {
    fn(arr[i], i)
  }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html']

function output(item) {
  console.log(item)
}
each(arr, output) // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html']

function output(item, index) {
  console.log(index + ': ' + item)
}
each(arr, output); // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  var count = 0

  for (var key in obj) {

    if (obj.hasOwnProperty(key)) {
      count++
    }
  }

  return count
}

// 使用示例
var obj = {
  a: 1,
  b: 2,
  c: {
    c1: 3,
    c2: 4
  }
}
console.log(getObjectLength(obj)) // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
  return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(emailStr)
}

// 判断是否为手机号
function isMobilePhone(phone) {
  return /^1[34578]\d{9}$/.test(phone)
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
  element.classList.add(newClassName)
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
  element.classList.remove(oldClassName)
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
  if (element.nodeType !== 1) {
    throw new Error('只能判断两个元素节点')
  } else {
    return element.parentNode === siblingNode.parentNode
  }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
  // your implement
}

// 获取cookie值
function getCookie(cookieName) {
  // your implement
}
