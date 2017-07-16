function $(selector) {
  return document.querySelector(selector)
}

class Input {
  constructor(ref, info, success, error, verify) {
    this.ref = ref
    this.info = info
    this.success = success
    this.error = error
    this.verify = verify
  }

  render() {
    let input = this.ref
    let nextEl = input.nextElementSibling
    let [className, text] = this.verify(input.value) ? ['success', this.success] : ['error', this.error]

    if (nextEl && nextEl.nodeName === 'P') {
      input.parentElement.removeChild(nextEl)
    }

    input.classList.add(className)
    input.insertAdjacentHTML('afterend', `<p>${text}</p>`)
  }
}

let text = new Input($('#text'), '必填，长度为4~16个字母、数字和下划线', '名称格式正确', '名称格式错误', (str) => {
  let length = 0

  str = str.trim()

  for (let c of str) {
    c.charCodeAt() > 127 ? length += 2 : length++
  }
  return length >= 4 && length <= 16
})

let password = new Input($('#password'), '必填，长度为6-10个字母、数字和下划线', '密码可用', '密码不可用', (str) => {
  return /^\w{6,10}$/.test(str)
})

let confirm = new Input($('#confirm'), '再次输入相同密码', '密码输入一致', '密码输入不一致', (str) => {
  return $('#password').value === str
})

let email = new Input($('#email'), '请输入有效的邮箱', '邮箱格式正确', '邮箱格式错误', (str) => {
  return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(str)
})

let tel = new Input($('#tel'), '请输入有效的手机号码', '手机号码格式正确', '手机号码格式错误', (str) => {
  return /^1[34578]\d{9}$/.test(str)
})

function check(input) {
  input.ref.addEventListener('blur', input.render.bind(input), false)
}

function checkConfirm() {
  let classList = confirm.ref.classList
  let nextEl = confirm.ref.nextElementSibling

  if (password.verify(password.ref.value)) {
    confirm.ref.disabled = false
    confirm.render()
  } else {
    confirm.ref.disabled = true
    confirm.ref.value = ''

    if (classList.contains('success')) {
      classList.remove('success')
    }

    if (classList.contains('error')) {
      classList.remove('error')
    }

    if (nextEl && nextEl.nodeName === 'P') {
      confirm.ref.parentElement.removeChild(nextEl)
    }
  }
}

password.ref.addEventListener('blur', () => {
  checkConfirm()
}, false)

check(text)
check(password)
check(confirm)
check(email)
check(tel)

function advice(input) {
  input.ref.addEventListener('focus', (e) => {
    let target = e.target
    let nextEl = target.nextElementSibling

    if (nextEl && nextEl.nodeName === 'P') {
      target.parentElement.removeChild(nextEl)
    }

    input.ref.className = ''
    target.insertAdjacentHTML('afterend', `<p class="info">${input.info}</p>`)
  }, false)
}

advice(text)
advice(password)
advice(confirm)
advice(email)
advice(tel)

$('#submit').addEventListener('click', () => {
  let result = [text.verify(text.ref.value), password.verify(password.ref.value), confirm.verify(confirm.ref.value), email.verify(email.ref.value), tel.verify(tel.ref.value)]

  text.render()
  password.render()
  confirm.render()
  checkConfirm()
  email.render()
  tel.render()

  for (val of result) {

    if (!val) {
      setTimeout(function () {
        alert('输入有误！')
      }, 0)
      return
    }
  }
  setTimeout(function () {
    alert('输入正确！')
  }, 0)
})
