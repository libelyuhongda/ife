// 动态数据绑定（二）

class Observer {
  constructor(data) {
    this.subs = {}
    this.data = data
    this.walk(data)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.convert(key, obj[key])
    })
  }

  convert(key, val) {
    observe(val)

    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        console.log('你访问了 ' + key)
        return val
      },
      set: newVal => {
        if (newVal === val) {
          return
        }
        console.log('你设置了 ' + key + '，新的值为 ' + newVal)

        const fns = this.subs[key]

        if (fns) {
          fns.forEach(fn => {
            fn.call(this.data, newVal)
          })
        }
        observe(newVal)
        val = newVal
      }
    })
  }

  $watch(prop, cb) {
    if (!this.subs[prop]) {
      this.subs[prop] = []
    }
    this.subs[prop].push(cb)
  }
}

function observe(val) {
  if (val && typeof val == 'object') {
    new Observer(val)
  }
}

let app = new Observer({
  name: 'youngwind',
  age: 25
})

app.data.name = {
  lastName: 'liang',
  firstName: 'shaofeng'
}

app.data.name.lastName
// 这里还需要输出 '你访问了 lastName'
app.data.name.firstName = 'lalala'
// 这里还需要输出 '你设置了firstName, 新的值为 lalala'

app.$watch('age', function (age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
})

app.data.age = 100 // 输出：'我的年纪变了，现在已经是100岁了'
