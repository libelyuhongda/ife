// 动态数据绑定（三）

class Observer {
  constructor(data, vm) {
    this.subs = {}
    this.data = data
    this.vm = vm
    this.walk(data)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.convert(key, obj[key])
    })
  }

  convert(key, val) {
    observe(this, val)

    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return val
      },
      set: newVal => {
        if (newVal === val) {
          return
        }
        this.publish(newVal)
        observe(this, newVal)
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

  publish(newVal) {
    for (var key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        const fns = this.subs[key]

        fns && fns.forEach(fn => {
          fn.call(this.data, newVal)
        })
      }
    }
    this.vm && this.vm.publish(this.data)
  }
}

function observe(vm, val) {
  if (val && typeof val == 'object') {
    new Observer(val, vm)
  }
}

let app = new Observer({
  name: {
    firstName: 'shaofeng',
    lastName: 'liang'
  },
  age: 25
})

app.$watch('name', function (newName) {
  console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
})

app.data.name.firstName = 'hahaha'
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app.data.name.lastName = 'blablabla'
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
