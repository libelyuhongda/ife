const layer = document.getElementById('layer')
const mask = document.getElementById('mask')
const ok = document.getElementById('ok')
const cancel = document.getElementById('cancel')
const showBtn = document.getElementById('show')

showBtn.onclick = show
ok.onclick = hide
cancel.onclick = hide
mask.onclick = hide

// 显示浮出层
function show() {
  layer.style.display = 'block'
  mask.style.display = 'block'
}

// 隐藏浮出层
function hide() {
  layer.style.display = 'none'
  mask.style.display = 'none'
}

// 改变浮出层的宽高
function changeSize(width = 600, height = 300) {
  layer.style.width = width + 'px'
  layer.style.height = height + 'px'
}

// 鼠标拖拽移动浮出窗口位置
layer.onmousedown = e => {
  const prevX = e.offsetX
  const prevY = e.offsetY

  layer.onmousemove = e => {
    if (e.target == layer && e.buttons == 1) {
      const pageWidth = document.documentElement.clientWidth
      const pageHeight = document.documentElement.clientHeight
      const maxX = pageWidth - layer.offsetWidth
      const maxY = pageHeight - layer.offsetHeight
      const disX = Math.min(maxX, Math.max(0, e.pageX - prevX))
      const disY = Math.min(maxY, Math.max(0, e.pageY - prevY))

      layer.style.left = disX + 250 + 'px'
      layer.style.top = disY + 150 + 'px'
    }
  }
}
