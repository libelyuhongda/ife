function $(selector) {
  return document.querySelector(selector)
}

let text = $('.text')
let main = $('main')

function verify(str) {
  let length = 0
  let content = ''

  str = str.trim()

  for (let c of str) {
    c.charCodeAt() > 127 ? length += 2 : length++
  }

  if (str === '') {
    content = '<p class="red">姓名不能为空</p>'
    text.style.borderColor = '#acacac'
  } else if (length < 4 || length > 16) {
    content = '<p class="gray">必填，长度为4~16个字符</p>'
    text.style.borderColor = '#e31930'
  } else {
    content = '<p class="green">名称格式正确</p>'
    text.style.borderColor = '#61b947'
  }

  $('.alert').innerHTML = content
}

$('.btn').addEventListener('click', () => verify(text.value), false)
