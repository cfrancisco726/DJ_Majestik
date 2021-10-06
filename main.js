const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
var toggleOpen = false;

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("open");
});

// const playerContainer = document.getElementsByClassName("player-container");
// const progressContainer = document.getElementsByClassName("progress-container");
// const pauseBtn = document.getElementsByClassName("fas.fa-pause");
// const currentProgressTime = document.getElementsByClassName("progress-time");
// const durationTime = document.getElementsByClassName("duration");
// const volUp = document.getElementsByClassName("fas.fa-volume-up");
// const volMute = document.getElementsByClassName("fa.fa-volume-mute");
// const download = document.getElementsByClassName("download");

const playerContainers = Array.from(
  document.querySelectorAll(".player-container")
);
// console.log("pc", playerContainers);

playerContainers.forEach((playerContainer) => {
  let playerBtn = playerContainer.getElementsByClassName("player-btn")[0].id;
  let playBtn = playerContainer.getElementsByClassName("fas fa-play")[0].id;
  let pauseBtn = playerContainer.getElementsByClassName("fas fa-pause")[0].id;
  let audioSrc = playerContainer.getElementsByClassName("audio")[0].id;

  let audio = document.getElementById(audioSrc);
  let volUp = playerContainer.getElementsByClassName("fas fa-volume-up")[0].id;
  let volMute =
    playerContainer.getElementsByClassName("fa fa-volume-mute")[0].id;
  let progressTime =
    playerContainer.getElementsByClassName("progress-time")[0].id;
  let progressContainer =
    playerContainer.getElementsByClassName("progress-container")[0];
  console.log(progressContainer);
  let progressContainerId = document.getElementById(progressContainer);

  function playSong() {
    playerContainer.classList.add("play");

    document.getElementById(playBtn).style.display = "none";
    document.getElementById(pauseBtn).style.display = "block";

    document.getElementById(audioSrc).play();
  }

  function pauseSong() {
    playerContainer.classList.remove("play");

    document.getElementById(playBtn).style.display = "block";
    document.getElementById(pauseBtn).style.display = "none";

    document.getElementById(audioSrc).pause();
  }

  function muteSong() {
    document.getElementById(audioSrc).muted = true;

    document.getElementById(volUp).style.display = "none";
    document.getElementById(volMute).style.display = "block";
  }

  function unMuteSong() {
    document.getElementById(audioSrc).muted = false;

    document.getElementById(volUp).style.display = "block";
    document.getElementById(volMute).style.display = "none";
  }

  function updateProgressPercent() {
    let progress = playerContainer.getElementsByClassName("progress")[0].id;

    let progressPercent = (audio.currentTime / audio.duration) * 100;
    console.log("audio", audio);
    console.log("progress", progressPercent);

    document.getElementById(progress).style.width = `${progressPercent}%`;
  }

  function showTime() {
    let seconds = audio.currentTime;

    seconds++;
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor(seconds / 60) - hours * 60;
    let secs = Math.floor(seconds % 60);
    let output =
      hours.toString().padStart(2, "0") +
      ":" +
      mins.toString().padStart(2, "0") +
      ":" +
      secs.toString().padStart(2, "0");
    document.getElementById(progressTime).innerHTML = output;
  }

  document.getElementById(playerBtn).addEventListener("click", () => {
    console.log(playerContainer);
    const isPlaying = playerContainer.classList.contains("play");

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
      unMuteSong();
    }
  });

  document.getElementById(volUp).addEventListener("click", () => {
    muteSong();
  });

  document.getElementById(volMute).addEventListener("click", () => {
    unMuteSong();
  });

  audio.ontimeupdate = function () {
    updateProgressPercent();
    showTime();
  };

  function setProgress(e) {
    console.log("setprogress", e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log(width);
    console.log(clickX);
    audio.currentTime = (clickX / width) * audio.duration;
  }

  progressContainer.addEventListener("click", setProgress);
});
