let songIndex = 0;
let audio = new Audio();
let masterPlay = document.getElementById("masterplay");
let progressBar = document.getElementById("range-bar");
let timestamp = document.getElementById("timestamp");
let volumebar = document.getElementById("volume");
let timeSong = document.getElementById("time-song");
let songItems = Array.from(document.getElementsByClassName("songitems"));

/* all song data */
let songs = [
  {
    id: 1,
    songName: "Djo - End Of Beginning",
    songPath: "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/End Of Beginning.flac",
    songCover: "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/end.jpg",
  },

  {
    id: 2,
    songName: "Khaabon Ke Parinday",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Khaabon Ke Parinday.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/khaboo.jpeg",
  },
  {
    id: 3,
    songName: "Safarnama",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Lucky Ali - Safarnama.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/tamasha.jpeg",
  },
  {
    id: 4,
    songName: "Radiohead - Creep",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Creep.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/creep.jpeg",
  },
  {
    id: 5,
    songName: "Iktara",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Amit Trivedi - Iktara.flac",
    songCover: "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/iktara.jpeg",
  },
  {
    id: 6,
    songName: "Coldplay - Yellow",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Coldplay - Yellow.flac",
    songCover: "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/yellow.jpeg",
  },
  {
    id: 7,
    songName: "Maroon 5 - Payphone",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Maroon 5 - Payphone.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/payphone.jpeg",
  },
  {
    id: 8,
    songName: "Matargashti",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Mohit Chauhan - Matargashti.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/tamasha.jpeg",
  },
  {
    id: 9,
    songName: "Maroon 5 - Cold",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Maroon 5 - Cold.flac",
    songCover: "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/cold.jpeg",
  },
  {
    id: 10,
    songName: "Jhumbritalaiyya",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Arjit Singh - Jhumbritalaiyya.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/jhumbritalaiyya.jpeg",
  },
];
/* grid fill */
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].songCover;
  element.getElementsByTagName("img")[0].alt = songs[i].songName;
  element.getElementsByClassName("songName")[0].textContent = songs[i].songName;
});
/*click and play  */
songItems.forEach((element) => {
  element.addEventListener("click", () => {
    let songName = element.querySelector(".songName").textContent;

    let selectedSong = songs.find((song) => song.songName === songName);

    if (selectedSong) {
      audio.src = selectedSong.songPath;
      songIndex = selectedSong.id - 1;
      document.getElementById("song-name1").textContent = selectedSong.songName;
      document.getElementById("hehe").src = selectedSong.songCover;

      updateMediaSessionMetadata(selectedSong);
      audio.play();
      audio.currentTime = 0;
      masterPlay.src =
        "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-pause-solid.png";
      masterPlay.alt = "pause-btn";
    }
  });
});

audio.src = songs[songIndex].songPath /*initialized id 1 song */

/* play img changes */
function masterPlay1() {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.src =
      "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-pause-solid.png";
    masterPlay.alt = "pause-btn";
  } else {
    audio.pause();
    masterPlay.src = "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-play-solid.png";
    masterPlay.alt = "play-btn";
  }
}
function nextSong() {
  songIndex = (songIndex + 1) % songs.length; // Loop to first song if at last
  playSelectedSong(songIndex);
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to last song if at first
  playSelectedSong(songIndex);
}

// Function to play the selected song
function playSelectedSong(index) {
  let selectedSong = songs[index];

  audio.src = selectedSong.songPath;
  document.getElementById("song-name1").textContent = selectedSong.songName;
  document.getElementById("hehe").src = selectedSong.songCover;
  updateMediaSessionMetadata(selectedSong);

  audio.currentTime = 0;
  masterPlay1(); // Play the song automatically
}

let nextImg = document.getElementById("forward-play"); // Image for next song
let prevImg = document.getElementById("backward-play"); // Image for previous song
// Attach event listeners to images for next and previous song
nextImg.addEventListener("click", nextSong);
prevImg.addEventListener("click", prevSong);

// If song ends, play next song and update image
audio.addEventListener("ended", nextSong);

progressBar.addEventListener("input", () => {
  let seekTime = (progressBar.value / 100) * audio.duration; // Convert progress value back to seconds

  audio.currentTime = seekTime;
});

audio.addEventListener("loadedmetadata", () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = parseInt((audio.currentTime / audio.duration) * 100);

    timestamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
      audio.duration
    )}`;
  }
});

// Android notification audio bar
function updateMediaSessionMetadata(song) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: song.songName,
      artist: song.songName.split(" - ")[0], // Extract artist from song name
      artwork: [
        {
          src: song.songCover,
          sizes: "512x512",
          type: "image/jpeg",
        },
      ],
    });
  }
}


// (0:00)
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    masterPlay1();
  }
});
masterPlay.addEventListener("click", masterPlay1);
volumebar.addEventListener("input", () => {
  audio.volume = volumebar.value / 100;
});



// Function to fetch and update durations
function updateSongDurations() {
  songs.forEach((song, index) => {
    let tempAudio = new Audio(song.songPath);
    tempAudio.addEventListener("loadedmetadata", () => {
      let durationText = formatTime(tempAudio.duration);
      songItems[index].querySelector("#time-song").textContent = durationText;
    });
  });
}

// Call function to update durations when the page loads
updateSongDurations();

audio.addEventListener("timeupdate", () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 100);
  timestamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
    audio.duration
  )}`;
  progressBar.value = progress;
});



document.getElementById("year").textContent = new Date().getFullYear();