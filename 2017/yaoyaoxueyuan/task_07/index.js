// 封装表格组件类
class Table {
  constructor({
    data, // 表格行数据
    columns // 表格列数据
  }) {
    this.data = data
    this.columns = columns
  }

  // 渲染表格组件
  render() {
    // 创建表格头
    const table = document.createElement('table')
    const tr = document.createElement('tr')

    this.columns.forEach(column => {
      const th = document.createElement('th')

      th.textContent = column.label

      if (column.sortable) {
        th.dataset.key = column.key

        if (column.sortFunction) {
          th.addEventListener('click', e => {
            this.data.sort((a, b) => {
              return column.sortFunction(a[th.dataset.key], b[th.dataset.key])
            })
            table.replaceWith(this.render())
          }, false)
        } else {
          th.innerHTML += `<span class="caret-wrapper">
                            <i class="sort-caret ascending"></i>
                            <i class="sort-caret descending"></i>
                        </span>`

          th.addEventListener('click', e => {
            if (e.target.classList.contains('ascending')) {
              this.data.sort((a, b) => {
                return a[th.dataset.key] - b[th.dataset.key]
              })
            }

            if (e.target.classList.contains('descending')) {
              this.data.sort((a, b) => {
                return b[th.dataset.key] - a[th.dataset.key]
              })
            }
            table.replaceWith(this.render())
          })
        }
      }
      tr.appendChild(th)
    })
    table.appendChild(tr)

    // 创建表格行
    this.data.forEach(row => {
      const tr = document.createElement('tr')

      Object.values(row).forEach(rowData => {
        tr.innerHTML += `<td>${rowData}</td>`
      })
      table.appendChild(tr)
    })

    return table
  }
}



const props = {
  data: [{
    name: '小明',
    Chinese: 80,
    Math: 90,
    English: 70,
    total: 240
  }, {
    name: '小红',
    Chinese: 90,
    Math: 60,
    English: 90,
    total: 240
  }, {
    name: '小亮',
    Chinese: 60,
    Math: 100,
    English: 70,
    total: 230
  }],

  // 如果 sortable 为 true，则 key 必须要设置，且为 data 对象中响应的键
  columns: [{
    label: '姓名',
    key: 'name',
    sortable: false
  }, {
    label: '语文',
    key: 'Chinese',
    sortable: true

    /**
     * 自定义的排序方法，如果设置此项，sortable 必须为 true。a, b 均为该列对应的数据
     * @param {any} a - 要比较的第一项
     * @param {any} b - 要比较的第一项
     */
    // sortFunction(a, b) {}
  }, {
    label: '数学',
    key: 'Math',
    sortable: true
  }, {
    label: '英语',
    key: 'English',
    sortable: true
  }, {
    label: '总分',
    key: 'total',
    sortable: true
  }]
}
const table = new Table(props).render()

document.body.appendChild(table)
