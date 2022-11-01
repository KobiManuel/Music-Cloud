const btn = document.getElementsByTagName("button");
const btn1 = document.getElementById("s1");
const btn2 = document.getElementById("s2");
const btn3 = document.getElementById("s3");
const btn4 = document.getElementById("s4");
const btn5 = document.getElementById("s5");
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const slide3 = document.getElementById("slide3");
const slide4 = document.getElementById("slide4");
const slide5 = document.getElementById("slide5");
const hidden = document.getElementById("msc");
const musicInfo = document.getElementById("music-info");
const imgContainer= document.getElementById("img-container");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artisteName = document.getElementById("artiste-name");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const shuffle = document.getElementById("shuffle");
const repeatMusic = document.getElementById("repeatMsc");
const audio = document.getElementById("audio");
const currentTim = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const label = document.getElementsByTagName('label'); 
  


// Song titles

//const songs = ['Ghosts', 'WhenTPO', 'AfterHours', 'Happier', 'Higher'];

// Keep track of songs
let currentMusic = 0; 

//let currentMusic = 4;

// Initially load song into DOM

//loadSong(songs[currentMusic]);

// Update song details

function loadSong(i) {
  const song = songs[i];
  currentMusic = i;
  audio.src = song.path;

  cover.src = song.cover;
  title.innerText = song.name;
  artisteName.innerText = song.artist;

  currentTim.innerHTML = '00:00';
  setTimeout(() => {
    musicDuration.innerHTML = formatTime(audio.duration);
  },300);
}
loadSong(0);

/*function loadSong(song) {
  title.innerText = song;
  audio.src = `./assets/${song}.mp3`;
  cover.src = `./assets/${song}.jpg`;
} 
*/

/*function shuffleMusic(arr) {
   const randomIndex = Math.floor(Math.random() * arr.length);
   const shuffling = arr[randomIndex];
   return shuffling;
}
const result = shuffleMusic(songs);
*/
function formatTime (time) {
  let min = Math.floor(time / 60);
  if(min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`; 
}

setInterval(() => {
  currentTim.innerHTML = formatTime(audio.currentTime);
}, 400);

function pauseSong() {
   playBtn.innerText = "play_circle";
   hidden.classList.remove('play');
   audio.pause();
   if (audio.pause) {
   setTimeout(() => {
    hidden.classList.add('hide');
   }, 4000);
   }
}

function playSong() {
  playBtn.innerText = "pause_circle";
  hidden.classList.add('play');
  audio.play();

}

function prevSong() {
  if (shuffle.innerText == ('shuffle_on')){
    currentMusic =[Math.floor(Math.random() * songs.length)];
   }
  currentMusic-- 
  if (currentMusic < 0) {
    currentMusic = songs.length -1 
  }
  loadSong(currentMusic);
  playSong();
}

function nextSong() {
  if (shuffle.innerText == ('shuffle_on')){
    currentMusic =[Math.floor(Math.random() * songs.length)];
   }
  currentMusic++ 
  if (currentMusic > songs.length - 1) {
    currentMusic = 0  
  }
   loadSong(currentMusic);
    playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime/duration) * 100;
  progressBar.style.width = `${progressPercent}%` ;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

 // Event listeners

 repeatMusic.addEventListener ('click', () => {
    if (repeatMusic.innerText == ('repeat')) {
      repeatMusic.innerText = ('repeat_on');
    }
    else if (repeatMusic.innerText == ('repeat_on')) {
      repeatMusic.innerText = ('repeat_one_on');
    }
    else if (repeatMusic.innerText == ('repeat_on') || repeatMusic.innerText == ('repeat_one_on')) {
      repeatMusic.innerText = ('repeat');
    }
 })

 shuffle.addEventListener ('click', () => {
   if (shuffle.innerText == ('shuffle')) {
      shuffle.innerText = ('shuffle_on')
   }
   else if (shuffle.innerText == ('shuffle_on')){
    shuffle.innerText= ('shuffle')
   }
 })
 nextBtn.addEventListener ('click', nextSong);

 prevBtn.addEventListener ('click', prevSong);

 audio.addEventListener ('timeupdate', updateProgress);

 progressContainer.addEventListener ('click', setProgress);

 audio.addEventListener ('ended', () => {
    if (repeatMusic.innerText == ('repeat')) {
      nextSong();
    }
    else if (repeatMusic.innerText == ('repeat_on')){
      nextSong();
    }
    else if (repeatMusic.innerText == ('repeat_one_on')) {
      loadSong(currentMusic);
      playSong();
    }
 });

 playBtn.addEventListener('click', () => {
   const isPlaying = hidden.classList.contains('play')

   if (isPlaying) { 
    pauseSong()
   } else {
    playSong()
   }
 })



var mini = true; 
function toggleSidebar() {
  if (mini) {
    document
      .querySelector(":root")
      .style.setProperty("--sidebar-width", "270px");
    // document.getElementById("mySidebar").style.width="270px";
    document.getElementById("mySidebar").style.zIndex = "9";

    var y = document.getElementById("playlists").querySelectorAll("li");
    for (var i = 0; i < y.length; i++) y[i].style.opacity = "1";

    var x = document.getElementById("mySidebar").querySelectorAll("p");
    for (var i = 0; i < x.length; i++) x[i].style.opacity = "1";
    document.getElementById("btn").style.display = "block";

    this.mini = false;
  } else {
    // document.getElementById("mySidebar").style.width="83px";
    document
      .querySelector(":root")
      .style.setProperty("--sidebar-width", "83px");

    var y = document.getElementById("playlists").querySelectorAll("li");
    for (var i = 0; i < y.length; i++) y[i].style.opacity = "0";

    var x = document.getElementById("mySidebar").querySelectorAll("p");
    for (var i = 0; i < x.length; i++) x[i].style.opacity = "0";
    document.getElementById("btn").style.display = "none";
    this.mini = true;
  }
}

function hide() {
  var y = document.getElementById("playlists").querySelectorAll("li");
  y[0].style.opacity = "0";
  y[1].style.opacity = "0";
  y[2].style.opacity = "0";
  var hiddenBtn = document.getElementById("btn");
  hiddenBtn.style.display = "none";
  var x = document.getElementById("mySidebar").querySelectorAll("p");
  x[0].style.opacity = "0";
  x[1].style.opacity = "0";
  x[2].style.opacity = "0";
  hidden.classList.add("hide");
  //let l = document.getElementById("carousel").querySelectorAll("label");
  //l[0].innerText = (' ');

}

function animateCarousel(whichOne) {
if (whichOne === 'firstButton') {
        slide1.style.transform = "translate3d(0%, 0, 0px)";
        slide2.style.transform = "translate3d(15%, 0, -100px)";
        slide3.style.transform = "translate3d(30%, 0, -250px)";
        slide4.style.transform = "translate3d(-15%, 0, -100px)";
        slide5.style.transform = "translate3d(-30%, 0, -250px)";
      }
    else if (whichOne === 'secondButton') {
    slide2.style.transform = "translate3d(0%, 0, 0px)";
    slide2.style.boxShadow="0 13px 26px rgb(49, 53, 136), 0 12px 6px rgb(97, 207, 13)";
    slide3.style.transform = "translate3d(15%, 0, -100px)";
    slide4.style.transform = "translate3d(30%, 0, -250px)";
    slide5.style.transform = "translate3d(-15%, 0, -100px)";
    slide1.style.transform = "translate3d(-30%, 0, -250px)";
  } else if (whichOne === 'thirdButton') {
    slide3.style.transform = "translate3d(0%, 0, 0px)";
    slide3.style.boxShadow="0 13px 26px rgb(49, 53, 136), 0 12px 6px rgb(97, 207, 13)";
    slide4.style.transform = "translate3d(15%, 0, -100px)";
    slide5.style.transform = "translate3d(30%, 0, -250px)";
    slide1.style.transform = "translate3d(-15%, 0, -100px)";
    slide2.style.transform = "translate3d(-30%, 0, -250px)";
  } else if (whichOne === 'fourthButton') {
    slide4.style.transform = "translate3d(0%, 0, 0px)";
    slide4.style.boxShadow="0 13px 26px rgb(49, 53, 136), 0 12px 6px rgb(97, 207, 13)";
    slide5.style.transform = "translate3d(15%, 0, -100px)";
    slide1.style.transform = "translate3d(30%, 0, -250px)";
    slide2.style.transform = "translate3d(-15%, 0, -100px)";
    slide3.style.transform = "translate3d(-30%, 0, -250px)";
  } else if (whichOne === 'fifthButton') {
    slide5.style.transform = "translate3d(0%, 0, 0px)";
    slide5.style.boxShadow="0 13px 26px rgb(49, 53, 136), 0 12px 6px rgb(97, 207, 13)";
    slide1.style.transform = "translate3d(15%, 0, -100px)";
    slide2.style.transform = "translate3d(30%, 0, -250px)";
    slide3.style.transform = "translate3d(-15%, 0, -100px)";
    slide4.style.transform = "translate3d(-30%, 0, -250px)";
  } 
}

// Event listeners //
 
btn1.addEventListener('click',() =>{
  animateCarousel('firstButton');
  hidden.classList.remove("hide");
  hidden.style.transform = "scale(1)";
  currentMusic = 0;
  loadSong(currentMusic);
  playSong();
  playBtn.innerText = "pause_circle";
})

btn2.addEventListener('click',() =>{
  animateCarousel('secondButton');
  hidden.classList.remove("hide");
  currentMusic = 1;
  loadSong(currentMusic);
  playSong();
  playBtn.innerText = "pause_circle";
})

btn3.addEventListener('click',() =>{
  animateCarousel('thirdButton');
  hidden.classList.remove("hide");
  currentMusic = 2;
  loadSong(currentMusic);
  playSong();
  playBtn.innerText = "pause_circle";
})

btn4.addEventListener('click',() =>{
  animateCarousel('fourthButton');
  hidden.classList.remove("hide");
  currentMusic = 3;
  loadSong(currentMusic);
  playSong();
  playBtn.innerText = "pause_circle";
})

btn5.addEventListener('click',() =>{
  animateCarousel('fifthButton');
  hidden.classList.remove("hide");
  currentMusic = 4;
  loadSong(currentMusic);
  playSong();
  playBtn.innerText = "pause_circle";
})
