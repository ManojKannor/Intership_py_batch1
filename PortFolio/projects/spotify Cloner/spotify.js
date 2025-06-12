let ul = document.querySelector(".playlistLibrary ul");
let songName = document.querySelector(".songName");
let songUl = document.querySelector(".songList").querySelector("ul");
let circle = document.querySelector(".circle");
let playbutton = document.querySelector(".playbutton");
let playbtn = document.querySelector(".play");
let currentSong = new Audio();
let songs;
let music = [];
let currFolder;

async function getSongs(folder) {
    currFolder = folder;
    let response = await fetch(`${currFolder}`);
    console.log(response.url);
    let data = await response.text();
    let div = document.createElement("div");
    div.innerHTML = data;
    let a = div.querySelectorAll("a");
    console.log(a);
    let songs = [];

    for (let i = 0; i < a.length; i++) {
        if (a[i].href.endsWith(".mp3")) {
            songs.push(a[i].href.split(`${currFolder}`)[1]);
        }
       
    }
  
    for(let i = 0; i<songs.length; i++){
        songs[i] = songs[i].replaceAll("%20", " ");
        songs[i] = songs[i].replace("/", " ");
    }
   
    return songs;


}



function playSong(track) {
    currentSong.src = `${currFolder}/` + track.replaceAll("%20", " ");
    currentSong.play();
    songName.innerText = track;
    console.log("currsong track", currentSong.src);
}

// function defaultMusicSystem(defaultSong){
//     currentSong.src = `${currFolder}` + defaultSong.replaceAll("%20", " ");
//     currentSong.play();
//     songName.innerText = defaultSong;
//     console.log("currsong default", currentSong.src);
// }

playbtn.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        playbutton.children[1].classList.remove("fa-play");
        playbutton.children[1].classList.add("fa-pause");
    }
    else {
        currentSong.pause();
        playbutton.children[1].classList.remove("fa-pause");
        playbutton.children[1].classList.add("fa-play");
    }
});

function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Ensure both minutes and seconds are two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// ----------- this the Main to perform all task based on multiple function -------------

async function main() {
    songs = await getSongs();
    for (let song of songs) {

        song = song.replaceAll("%20", " ");
        songUl.innerHTML = songUl.innerHTML + `
                             <div class="song">
                                <i class="fa-solid fa-music"></i>
                                <div class="info">
                                    <div> ${song} </div>
                                    <p>TM Manoj</p>
                                </div>
                                <i class="fa-solid fa-play"></i>
                            </div> `
    }

    // Attach All songs on event

    Array.from(document.querySelector(".songList").querySelectorAll(".song")).forEach((e) => {
        // let element = e.querySelector(".info").firstElementChild.innerHTML;
        e.addEventListener('click', () => {
            let track = e.querySelector(".info").firstElementChild.innerHTML.trim();
            console.log("track",track);
            playSong(track);    // playSong function perform the play songs   

            playbutton.children[1].classList.remove("fa-play");
            playbutton.children[1].classList.add("fa-pause");


        })
    })

    currentSong.addEventListener("timeupdate", () => {
        let startTime = convertSecondsToMinutes(currentSong.currentTime);
        let endTime = convertSecondsToMinutes(currentSong.duration);
        let playtime = document.querySelector(".playtime");
        playtime.innerText = `${startTime} / ${endTime}`;

        circle.style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";


    })

    // Attach Event Listen to seekbar for controling

    let seekbar = document.querySelector(".seekbar");
    seekbar.addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        circle.style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;


    });

    // // Attach event Listener to menu bar 
    let menuBar = document.querySelector(".bar i");
    menuBar.addEventListener('click', () => {
        document.querySelector(".left").style.display = "block";
        document.querySelector(".left").style.left = "0";
    })

    // // Attach event Listener to cancel bar
    let cancel = document.querySelector(".fa-xmark");
    cancel.addEventListener('click', () => {
        document.querySelector(".left").style.left = "-100%";
    })

    // Attach event Listener to previous button
    let previous = document.querySelector("#previous");
    previous.addEventListener("click", () => {
        let idx = songs.indexOf(currentSong.src);
        if (idx - 1 > -1) {
            playSong(songs[idx - 1]);
        }
    })


    // Attach event Listener to next button
    let next = document.querySelector("#next");
    next.addEventListener("click", () => {
        for(let i = 0; i<songs.length; i++){
            if(songs[4].replace("/", " ") == currentSong.src.split("/")[5]){
            }
        }
        if (idx + 1 < songs.length) {
            playSong(songs[idx + 1]);
        }
    })

    // Attach event Listener to volume 
    let range = document.querySelector(".range").getElementsByTagName("input")[0];
    range.addEventListener("change", (e) => {
        currentSong.volume = (range.value) / 100;

    })

    // Attach event Listener to card for load Alblum
    let card = document.querySelectorAll(".card");
    card.forEach((item) => {
        item.addEventListener("click", async () => {
            songs = await getSongs(`songs/${item.dataset.folder}`);
        })
    })




}

main();

