// 动态数据绑定（四）

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

class Vue {
  constructor(options) {
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    this.render()
  }

  render() {
    const el = document.querySelector(this.$el)
    const childElts = el.children

    for (let i = 0; i < childElts.length; i++) {
      this.compile(childElts[i])
    }
  }

  compile(elt) {
    if (elt.children.length) {
      for (let i = 0; i < elt.children.length; i++) {
        this.compile(elt.children[i])
      }
    }

    elt.textContent = elt.textContent.replace(/{{\s*([\w$]+)\.([\w$]+)\s*}}/, (match, p1, p2) => {
      return this.$data[p1][p2]
    })
  }
}

let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    }
  }
})
