const customMenu = document.getElementById('custom-menu')

function showCustomMenu(e) {
  customMenu.style.display = 'block'
  
  const width = customMenu.offsetWidth
  const height = customMenu.offsetHeight

  if (e.offsetY + height > document.documentElement.clientHeight) {
    customMenu.style.top = e.offsetY - height + 'px'
  } else {
    customMenu.style.top = e.offsetY + 'px'
  }

  if (e.offsetX + width > document.documentElement.clientWidth) {
    customMenu.style.left = e.offsetX - width + 'px'
  } else {
    customMenu.style.left = e.offsetX + 'px'
  }
}

function hideCustomMenu() {
  customMenu.style.display = 'none'
}

document.addEventListener("contextmenu", e => {
  e.preventDefault()
  showCustomMenu(e)
}, false)

document.addEventListener("click", e => {
  if (e.target == document.documentElement) {
    hideCustomMenu()
  }

  if (e.target.nodeName == 'LI') {
    alert(e.target.textContent)
    hideCustomMenu()
  }
}, false)
