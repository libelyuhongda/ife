// 动态数据绑定（一）

class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.convert(key, obj[key])
    })
  }

  convert(key, val) {
    if (val && typeof val == 'object') {
      new Observer(val)
    }

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
        val = newVal
      }
    })
  }
}

let app1 = new Observer({
  name: 'youngwind',
  age: 25
})

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
})

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100  // 你设置了 age，新的值为 100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science
