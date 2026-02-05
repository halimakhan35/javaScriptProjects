const audio = document.getElementById("main-audio");
const playBtn = document.getElementById("play");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const volValueText = document.getElementById("vol-value");
const trackIndexDisp = document.getElementById("track-index");
const playerCard = document.querySelector(".player-container");

// Playlist Data
const songs = [
  {
    name: "Neon Dreams",
    artist: "Future Funk Duo",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400",
  },
  {
    name: "Cyber City",
    artist: "Synthwave Queen",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
  },
  {
    name: "Midnight Drive",
    artist: "Retro Wave",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400",
  },
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
  title.innerText = song.name;
  artist.innerText = song.artist;
  audio.src = song.url;
  cover.src = song.cover;
  trackIndexDisp.innerText = songIndex + 1;
}

loadSong(songs[songIndex]);

// Play/Pause Logic
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playIcon.classList.replace("fa-pause", "fa-play");
    playerCard.classList.remove("playing");
  } else {
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
    playerCard.classList.add("playing");
  }
  isPlaying = !isPlaying;
}

// Next/Prev Logic
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) audio.play();
}

// Progress Bar Logic
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) =>
      Math.floor(time / 60) +
      ":" +
      String(Math.floor(time % 60)).padStart(2, "0");
    document.getElementById("current-time").innerText = formatTime(currentTime);
    document.getElementById("duration").innerText = formatTime(duration);
  }
});

// Seek Logic
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// VOLUME LOGIC (FIXED)
volumeSlider.addEventListener("input", (e) => {
  let value = e.target.value;
  audio.volume = value / 100; // Important: Audio volume is 0.0 to 1.0
  volValueText.innerText = `${value}%`;

  // Icon update
  if (value == 0) volumeIcon.className = "fas fa-volume-mute";
  else if (value < 50) volumeIcon.className = "fas fa-volume-down";
  else volumeIcon.className = "fas fa-volume-up";
});

// Mute Toggle on Icon click
volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeSlider.value = 0;
    volValueText.innerText = "0%";
    volumeIcon.className = "fas fa-volume-mute";
  } else {
    audio.volume = 0.8;
    volumeSlider.value = 80;
    volValueText.innerText = "80%";
    volumeIcon.className = "fas fa-volume-up";
  }
});

// Events
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);
