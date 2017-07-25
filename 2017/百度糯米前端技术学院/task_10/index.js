const container = document.querySelector('.container')
let angle = 0
let currentIndex = 1

container.addEventListener('click', e => {

  const target = e.target

  if (target.nodeName != "DIV") {
    let clickedIndex = target.dataset.index
    
    if (currentIndex == clickedIndex) {
      return
    }

    let offset

    if (currentIndex == 1 && (clickedIndex == 5 || clickedIndex == 6)) {
      offset = (currentIndex - clickedIndex + 6) * 60
    } else if (currentIndex == 2 && clickedIndex == 6) {
      offset = (currentIndex - clickedIndex + 6) * 60
    } else if (currentIndex == 6 && (clickedIndex == 1 || clickedIndex == 2)) {
      offset = (currentIndex - clickedIndex - 6) * 60
    } else if (currentIndex == 5 && clickedIndex == 1) {
      offset = (currentIndex - clickedIndex - 6) * 60
    } else {
      offset = (currentIndex - clickedIndex) * 60
    }
    container.animate(
      [
        { transform: `translate(-50%, -50%) rotateY(${angle}deg)` },
        { transform: `translate(-50%, -50%) rotateY(${angle += offset}deg)` }
      ], {
        duration: 500,
        fill: 'forwards'
      })

    currentIndex = clickedIndex
  }
}, false)
