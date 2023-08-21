console.log("Welcome to Spotify")

//Inoitialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Saudebaazi", filePath: "songs/1.mp3", coverPath: "music/COVER1.jpeg"},
    {songName: "Night Changes", filePath: "songs/2.mp3", coverPath: "music/COVER2.jpeg"},
    {songName: "My Life Is Going On", filePath: "songs/3.mp3", coverPath: "music/COVER3.jpeg"},
    {songName: "Alag Aasmaan", filePath: "songs/4.mp3", coverPath: "music/COVER4.jpeg"},
    {songName: "Kun Faya Kun", filePath: "songs/5.mp3", coverPath: "music/COVER5.jpeg"},
    {songName: "Saiyyan", filePath: "songs/6.mp3", coverPath: "music/COVER6.jpeg"},
    {songName: "Ishq Sufiana", filePath: "songs/7.mp3", coverPath: "music/COVER7.jpeg"},
    {songName: "Iktara", filePath: "songs/8.mp3", coverPath: "music/COVER8.jpeg"},
    {songName: "Give Me Some Sunshine", filePath: "songs/9.mp3", coverPath: "music/COVER9.jpeg"},
]

// songItems.forEach((element, i)=>{
//     console.log(element, i);
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("SongName")[0].innerText = songs[i].songName;
// })

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
   
    //update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex +1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex +1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 8;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex +1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})