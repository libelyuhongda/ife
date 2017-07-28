let currentTrackIndex = 0

fetch('http://route.showapi.com/213-4?showapi_appid=42923&showapi_sign=22e4e79b78554cd5858fe2faa7b173ef&topid=5').then(response => {
  if (response.ok) {
    return response.json()
  }
}).then(response => {
  if (response.showapi_res_code) {
    return console.log('发生错误')
  }

  const table = document.querySelector('table')
  const songList = response.showapi_res_body.pagebean.songlist

  document.images[0].src = songList[currentTrackIndex].albumpic_big
  document.images[1].src = songList[currentTrackIndex].albumpic_small
  document.querySelector('.song').textContent = songList[currentTrackIndex].songname
  document.querySelector('.artist').textContent = songList[currentTrackIndex].singername

  const secStr = getSecStr(songList[currentTrackIndex].seconds)
  const playBtn = document.querySelector('.play')
  const nextBtn = document.querySelector('.next')
  const loopBtn = document.querySelector('.loop')
  const volumeBtn = document.querySelector('.volume')
  let sound = new Audio(songList[currentTrackIndex].url)

  sound.volume = 0.7
  document.querySelector('.track-length').textContent = secStr

  sound.ontimeupdate = () => {
    document.querySelector('.elapsed-time').textContent = getSecStr(sound.currentTime)
    document.querySelector('.elapsed').style.width = 550 * sound.currentTime / sound.duration + 'px'
    document.querySelector('.handle').style.left = 550 * sound.currentTime / sound.duration - 6.5 + 'px'
  }

  sound.onvolumechange = () => {
    if (sound.volume == 0) {
      sound.muted = true
    }
    document.querySelector('.volume-level').style.width = 100 * sound.volume + 'px'

    if (sound.muted) {
      volumeBtn.className = 'iconfont icon-volume-off volume'
      document.querySelector('.volume-level').style.background = 'rgba(250, 128, 10, 0)'
      document.querySelectorAll('.handle')[1].style.left = 0
    } else {
      volumeBtn.className = 'iconfont icon-volume-up volume'
      document.querySelector('.volume-level').style.background = 'rgb(250, 128, 10)'
      document.querySelectorAll('.handle')[1].style.left = 100 * sound.volume - 6.5 + 'px'
    }
  }

  loopBtn.onclick = () => {
    if (loopBtn.classList.contains('icon-repeat')) {
      loopBtn.className = 'iconfont icon-shuffle loop'
      return
    }

    if (loopBtn.classList.contains('icon-loop')) {
      loopBtn.className = 'iconfont icon-repeat loop'
      return
    }

    if (loopBtn.classList.contains('icon-shuffle')) {
      loopBtn.className = 'iconfont icon-loop loop'
    }
  }

  volumeBtn.onclick = () => {
    if (volumeBtn.classList.contains('icon-volume-up')) {
      sound.muted = true
      return
    }

    if (volumeBtn.classList.contains('icon-volume-off')) {
      sound.muted = false
      return
    }
  }

  sound.onended = () => {
    sound.pause()
    if (loopBtn.classList.contains('icon-repeat')) {
      play()
      return
    }

    if (loopBtn.classList.contains('icon-loop')) {
      nextBtn.click()
      return
    }

    if (loopBtn.classList.contains('icon-shuffle')) {
      currentTrackIndex = Math.floor(Math.random() * songList.length)
      play()
    }
  }

  const progressBar = document.querySelector('.progress-bar')
  const volumeBar = document.querySelector('.volume-bar')

  progressBar.onclick = e => {
    sound.currentTime = e.offsetX / progressBar.clientWidth * sound.duration
  }

  volumeBar.onclick = e => {
    sound.volume = e.offsetX / volumeBar.clientWidth
    sound.muted = false
  }

  function getSecStr(secs) {
    const minute = Math.floor(secs / 60)
    let seconds = Math.floor(secs % 60)

    seconds = seconds < 10 ? '0' + seconds : seconds
    return minute + ':' + seconds
  }

  playBtn.onclick = playOrPause
  document.querySelector('.prev').onclick = () => {
    currentTrackIndex == 0 ? currentTrackIndex = songList.length - 1 : currentTrackIndex--
    play()
  }

  nextBtn.onclick = () => {
    currentTrackIndex == songList.length - 1 ? currentTrackIndex = 0 : currentTrackIndex++
    play()
  }

  table.ondblclick = e => {
    currentTrackIndex = e.target.parentElement.rowIndex - 1
    play()
  }

  const rotation = document.images[0].animate(
    [
      { transform: 'rotate(0)' },
      { transform: 'rotate(360deg)' }
    ], {
      duration: 20000,
      delay: 1000,
      iterations: Infinity
    }
  )

  rotation.pause()

  function play() {
    sound.src = songList[currentTrackIndex].url
    playBtn.className = 'iconfont icon-pause pause'
    document.images[0].src = songList[currentTrackIndex].albumpic_big
    document.images[1].src = songList[currentTrackIndex].albumpic_small
    document.querySelector('.song').textContent = songList[currentTrackIndex].songname
    document.querySelector('.artist').textContent = songList[currentTrackIndex].singername

    const secStr = getSecStr(songList[currentTrackIndex].seconds)

    document.querySelector('.track-length').textContent = secStr
    sound.play()
    rotation.cancel()
    rotation.play()
  }

  function pause() {
    playBtn.className = 'iconfont icon-play play'
    sound.pause()
    rotation.pause()
  }

  function playOrPause() {
    if (sound.paused) {
      playBtn.className = 'iconfont icon-pause pause'
      sound.play()
      rotation.play()
    } else {
      pause()
    }
  }

  songList.forEach(song => {
    const secStr = getSecStr(song.seconds)

    table.insertRow().innerHTML = `<td>${song.songname}</td><td>${song.singername}</td><td>${secStr}</td>`
  })
})
