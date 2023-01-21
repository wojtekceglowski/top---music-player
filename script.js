let trackArt = document.querySelector('.track-art')
let trackName = document.querySelector('.track-name')
let trackAlbum = document.querySelector('.track-album')

let playPauseBtn = document.querySelector('.playpause-track')
let nextBtn = document.querySelector('.next-track')
let prevBtn = document.querySelector('.prev-track')

let seekSlider = document.querySelector('.seek-slider')
let volumeSlider = document.querySelector('.volume-slider')
let currentTime = document.querySelector('.current-time')
let totalDuration = document.querySelector('.total-duration')
let randomIcon = document.querySelector('.fa-random')
let currentTrack = document.createElement('audio')

let trackIndex = 0
let isPlaying = false
let isRandom = false
let updateTimer

const musicList = [
	{
		img: 'images/rab.jpg',
		name: 'Lovely',
		album: 'Regional At Best',
		music: 'music/lovely.mp3',
	},
	{
		img: 'images/blurryface.png',
		name: 'Goner',
		album: 'Blurryface',
		music: 'music/goner.mp3',
	},
	{
		img: 'images/top.png',
		name: 'Oh Ms Believer',
		album: 'Twenty One Pilots',
		music: 'music/ohmsbeliever.mp3',
	},
	{
		img: 'images/trench.png',
		name: 'Morph',
		album: 'Trench',
		music: 'music/morph.mp3',
	},
	{
		img: 'images/vessel.jpg',
		name: 'Car Radio',
		album: 'Vessel',
		music: 'music/carradio.mp3',
	},
]

loadTrack(trackIndex)

function loadTrack(trackIndex) {
	clearInterval(updateTimer)
	reset()

	currentTrack.src = musicList[trackIndex].music
	currentTrack.load()

	trackArt.style.backgroundImage = 'url(' + musicList[trackIndex].img + ')'
	trackName.textContent = musicList[trackIndex].name
	trackAlbum.textContent = musicList[trackIndex].album

	updateTimer = setInterval(setUpdate, 1000)

	currentTrack.addEventListener('ended', nextTrack)

	switch (trackIndex) {
		case 0:
			trackName.style.color = '#61c1d9'
			break
		case 1:
			trackName.style.color = '#f25b42'
			break
		case 2:
			trackName.style.color = '#98f356'
			break
		case 3:
			trackName.style.color = '#e4d319'
			break
		case 4:
			trackName.style.color = '#8f96a0'
			break
	}
}

function reset() {
	currentTime.textContent = '00:00'
	totalDuration.textContent = '00:00'
	seekSlider.value = 0
}
function randomTrack() {
	isRandom ? pauseRandom() : playRandom()
}
function playRandom() {
	isRandom = true
	randomIcon.classList.add('randomActive')
}
function pauseRandom() {
	isRandom = false
	randomIcon.classList.remove('randomActive')
}
function repeatTrack() {
	let current_index = trackIndex
	loadTrack(current_index)
	playTrack()
}
function playpauseTrack() {
	isPlaying ? pauseTrack() : playTrack()
}
function playTrack() {
	currentTrack.play()
	isPlaying = true
	playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}
function pauseTrack() {
	currentTrack.pause()
	isPlaying = false
	playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}
function nextTrack() {
	if (trackIndex < musicList.length - 1 && isRandom === false) {
		trackIndex += 1
	} else if (trackIndex < musicList.length - 1 && isRandom === true) {
		let random_index = Number.parseInt(Math.random() * musicList.length)
		trackIndex = random_index
	} else {
		trackIndex = 0
	}
	loadTrack(trackIndex)
	playTrack()
}
function prevTrack() {
	if (trackIndex > 0) {
		trackIndex -= 1
	} else {
		trackIndex = musicList.length - 1
	}
	loadTrack(trackIndex)
	playTrack()
}
function seekTo() {
	let seekto = currentTrack.duration * (seekSlider.value / 100)
	currentTrack.currentTime = seekto
}
function setVolume() {
	currentTrack.volume = volumeSlider.value / 100
}
function setUpdate() {
	let seekPosition = 0
	if (!isNaN(currentTrack.duration)) {
		seekPosition = currentTrack.currentTime * (100 / currentTrack.duration)
		seekSlider.value = seekPosition

		let currentMinutes = Math.floor(currentTrack.currentTime / 60)
		let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60)
		let durationMinutes = Math.floor(currentTrack.duration / 60)
		let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60)

		if (currentSeconds < 10) {
			currentSeconds = '0' + currentSeconds
		}
		if (durationSeconds < 10) {
			durationSeconds = '0' + durationSeconds
		}
		if (currentMinutes < 10) {
			currentMinutes = '0' + currentMinutes
		}
		if (durationMinutes < 10) {
			durationMinutes = '0' + durationMinutes
		}

		currentTime.textContent = currentMinutes + ':' + currentSeconds
		totalDuration.textContent = durationMinutes + ':' + durationSeconds
	}
}
