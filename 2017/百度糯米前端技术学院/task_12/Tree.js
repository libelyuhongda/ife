/**
 * 表示一个树形组件的类。
 */
class Tree {
  /**
   * 创建 Tree 的实例。
   * @param {array} data - 要展示的数据。
   * @param {string} rootId - 树形组件根节点的 id。
   */
  constructor(data, rootId) {
    this._render(data, rootId)
  }

  _render(data, rootId) {
    document.getElementById(rootId).append(...this.createChildNodes(data))
  }

  /**
   * 递归地创建所有子节点。
   * @returns {array} 创建的 div 节点数组。
   */
  createChildNodes(nodes) {
    return nodes.map(node => {
      const div = document.createElement('div')

      div.innerHTML = `<div style="padding: 5px 0">
                          <span class="fa fa-chevron-down" style="visibility: hidden; width: 15px;"></span>
                          <span>${node.label}</span>
                        </div>`
      div.style.cursor = 'pointer'
      div.style.paddingLeft = '1em'
      // 防止子节点的点击事件影响父节点
      div.addEventListener('click', e => {
        e.stopPropagation()
      })

      const icon = div.firstElementChild.firstElementChild

      // 如果数据对象存在 children，则递归地调用 Tree#createChildNodes，并将创建出的所有子节点一次性加入 div。
      if (node.children) {
        icon.style.visibility = 'visible'
        div.append(...this.createChildNodes(node.children))
        div.addEventListener('click', e => {
          this.toggleExpanded(div, icon)
        })
      }

      return div
    })
  }

  toggleExpanded(elt, icon) {
    [...elt.children].forEach((child, index) => {
      // 展开和隐藏非文本节点
      if (index != 0) {
        if (child.style.display == 'none') {
          child.style.display = 'block'
          icon.className = 'fa fa-chevron-down'
        } else {
          child.style.display = 'none'
          icon.className = 'fa fa-chevron-right'
        }
      }
    })
  }
}
