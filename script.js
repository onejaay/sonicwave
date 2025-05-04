let songIndex = 0;
let audio = new Audio(
  "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/End Of Beginning.flac"
);
let masterPlay = document.getElementById("masterplay");
let progressBar = document.getElementById("range-bar");
let timestamp = document.getElementById("timestamp");
let volumebar = document.getElementById("volume");
let timeSong = document.getElementById("time-song");
let songItems = Array.from(document.getElementsByClassName("songitems"));

let songs = [
  {
    id: 1,
    songName: "Djo - End Of Beginning",
    songPath: "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/End Of Beginning.flac",
    songCover: "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/end.jpg",
  },
  {
    id: 2,
    songName: "Eminem - Without Me",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Eminem - Without Me.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/withoutme.jpg",
  },
  {
    id: 3,
    songName: "Lucky Ali - Safarnama",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Lucky Ali - Safarnama.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/tamasha.jpeg",
  },
  {
    id: 4,
    songName: "girl in red - we fell in love in october",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/girl in red - we fell in love in october.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/girlinred.jpeg",
  },
  {
    id: 5,
    songName: "Amit Trivedi - Iktara",
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
    songName: "Mohit Chauhan - Matargashti",
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
    songName: "Arjit Singh - Jhumbritalaiyya",
    songPath:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/audio/Arjit Singh - Jhumbritalaiyya.flac",
    songCover:
      "https://jays3aws.s3.ap-south-1.amazonaws.com/cover/jhumbritalaiyya.jpeg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].songCover;
  element.getElementsByTagName("img")[0].alt = songs[i].songName;
  element.getElementsByClassName("songName")[0].textContent = songs[i].songName;
});
songItems.forEach((element) => {
  element.addEventListener("click", () => {
    let songName = element.querySelector(".songName").textContent;

    let selectedSong = songs.find((song) => song.songName === songName);

    if (selectedSong) {
      audio.src = selectedSong.songPath;
      document.getElementById("song-name1").textContent = selectedSong.songName;

      updateMediaSessionMetadata(selectedSong);
      audio.play();
      audio.currentTime = 0;
      masterPlay.src =
        "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-pause-solid.svg";
      masterPlay.alt = "pause-btn";
    }
  });
});

audio.addEventListener("timeupdate", () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 100);
  timestamp.textContent = `${formatTime(audio.currentTime)} / ${formatTime(
    audio.duration
  )}`;

  progressBar.value = progress;
});

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

document.getElementById("year").textContent = new Date().getFullYear();

function masterPlay1() {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.src =
      "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-pause-solid.svg";
    masterPlay.alt = "pause-btn";
  } else {
    audio.pause();
    masterPlay.src = "https://jays3aws.s3.ap-south-1.amazonaws.com/assets/circle-play-solid.svg";
    masterPlay.alt = "play-btn";
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

let nextImg = document.getElementById("forward-play"); // Image for next song
let prevImg = document.getElementById("backward-play"); // Image for previous song

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

  audio.currentTime = 0;
  masterPlay1(); // Play the song automatically
}

// Attach event listeners to images for next and previous song
nextImg.addEventListener("click", nextSong);
prevImg.addEventListener("click", prevSong);

// If song ends, play next song and update image
audio.addEventListener("ended", nextSong);
