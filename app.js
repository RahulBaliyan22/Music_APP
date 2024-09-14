let ulEl = document.getElementById("song");
let play_btn = document.getElementById("play-btn");
let forward_btn = document.getElementById("forward_btn");
let back_btn = document.getElementById("back_btn");
let inputEl = document.getElementById("inp");
let infoEl = document.getElementById("info");
let headerEl = document.getElementById("header");
let addSongEl = document.getElementById("addSong");
let randEl = document.getElementById("randomPlay");

let songs = [
  { name: "song1", id: 1, key: "Bekhayali (बेख्याली)" },
  { name: "song2", id: 2, key: "Rihaa" },
  { name: "song3", id: 3, key: "Zindagi Ko Hi5" },
  { name: "song4", id: 4, key: "Jaan Nisaar" },
  { name: "song5", id: 5, key: "Saari Ki Saari 2.0" },
  { name: "song6", id: 6, key: "Muskurane" },
  { name: "song7", id: 7, key: "Laal Ishq" },
  { name: "song8", id: 8, key: "Judaiyaan" },
  { name: "song9", id: 9, key: "Aaj Bhi" },
  { name: "song10", id: 10, key: "Aa Jaana" },
];

let counter = 1;
let audio = new Audio(`./asserts/song${counter}.mp3`);

function info() {
  if (!audio.paused) {
    infoEl.innerHTML = `Playing >>>>>> ${songs[counter - 1].key}`;
  } else {
    infoEl.innerHTML = `${songs[counter - 1].key} >>>>>  Paused`;
  }
}

function newSong() {
  counter = counter < songs.length ? counter + 1 : 1;

  audio.src = `./asserts/song${counter}.mp3`;
  audio.currentTime = 0;
  audio.play();
  info();
  play_btn.children[0].classList.remove("fa-play");
  play_btn.children[0].classList.add("fa-pause");
}

for (let song of songs) {
  let item = document.createElement("li");
  item.innerHTML = song.name;
  item.setAttribute("id", song.id);
  item.classList.add("song-item");
  ulEl.append(item);
}

headerEl.children[0].addEventListener("click", () => {
  location.reload();
});

//play botton
play_btn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  info();
  if (play_btn.children[0].classList.contains("fa-play")) {
    play_btn.children[0].classList.remove("fa-play");
    play_btn.children[0].classList.add("fa-pause");
  } else {
    play_btn.children[0].classList.remove("fa-pause");
    play_btn.children[0].classList.add("fa-play");
  }
});

//audio change input
audio.addEventListener("timeupdate", () => {
  inputEl.value = (audio.currentTime * 100) / audio.duration;
  if (inputEl.value == 100) {
    play_btn.children[0].classList.remove("fa-pause");
    play_btn.children[0].classList.add("fa-play");
    newSong();
  }
});

//input click
inputEl.addEventListener("change", () => {
  audio.currentTime = (inputEl.value * audio.duration) / 100;
});

//forward
forward_btn.addEventListener("click", () => {
  counter = counter < songs.length ? Number(counter) + 1 : 1;

  audio.src = `./asserts/song${counter}.mp3`;
  audio.currentTime = 0;
  audio.play();
  info();
  play_btn.children[0].classList.remove("fa-play");
  play_btn.children[0].classList.add("fa-pause");
});

//back
back_btn.addEventListener("click", () => {
  counter = counter > 1 ? counter - 1 : songs.length;

  audio.src = `./asserts/song${counter}.mp3`;
  audio.currentTime = 0;
  audio.play();
  info();
  play_btn.children[0].classList.remove("fa-play");
  play_btn.children[0].classList.add("fa-pause");
});

//list click
ulEl.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    counter = e.target.getAttribute("id");
    audio.src = `./asserts/song${counter}.mp3`;

    audio.currentTime = 0;
    audio.play();
    info();
    play_btn.children[0].classList.remove("fa-play");
    play_btn.children[0].classList.add("fa-pause");
  }
});

//random
randEl.addEventListener("click", () => {
  counter = Math.round(Math.random() * (songs.length - 1)) + 1;
  audio.src = `./asserts/song${counter}.mp3`;
  audio.currentTime = 0;
  audio.play();
  info();
  play_btn.children[0].classList.remove("fa-play");
  play_btn.children[0].classList.add("fa-pause");
});
