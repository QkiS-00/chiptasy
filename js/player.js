const tracks = [
    {
        title: 'Трек 1',
        artist: 'Виконавець 1',
        src: 'audio/track1.mp3'
    },
    {
        title: 'Трек 2',
        artist: 'Виконавець 2',
        src: 'audio/track2.mp3'
    },
    {
        title: 'Трек 3',
        artist: 'Виконавець 3',
        src: 'audio/track3.mp3'
    }
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const playBtn = document.querySelector('.player-controls button:nth-child(2)');

function loadTracks(list = tracks) {
    const trackList = document.getElementById('track-list');
    trackList.innerHTML = '';

    list.forEach((track, index) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isLiked = favorites.some(f => f.title === track.title);

        const div = document.createElement('div');
        div.className = 'track-item' + (index === currentIndex ? ' active' : '');
        div.innerHTML = `
            <div onclick="playTrack(${index})">
                <div class="track-name">🎵 ${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-actions">
                <button class="like-btn ${isLiked ? 'liked' : ''}" 
                        onclick="toggleLike(${index})">
                    ${isLiked ? '💜' : '🤍'}
                </button>
            </div>
        `;
        trackList.appendChild(div);
    });
}

function playTrack(index) {
    currentIndex = index;
    const track = tracks[index];

    audio.src = track.src;
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸';

    document.getElementById('player-title').textContent = 
        `${track.title} — ${track.artist}`;

    loadTracks();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
    } else {
        audio.play();
        isPlaying = true;
        playBtn.textContent = '⏸';
    }
}

function nextTrack() {
    currentIndex = (currentIndex + 1) % tracks.length;
    playTrack(currentIndex);
}

function prevTrack() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentIndex);
}

audio.addEventListener('timeupdate', () => {
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('current-time');

    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }

    const min = Math.floor(audio.currentTime / 60);
    const sec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTime.textContent = `${min}:${sec}`;
});

function setProgress() {
    const progress = document.getElementById('progress');
    audio.currentTime = (progress.value / 100) * audio.duration;
}


function toggleLike(index) {
    const track = tracks[index];
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some(f => f.title === track.title);

    if (exists) {
        favorites = favorites.filter(f => f.title !== track.title);
    } else {
        favorites.push(track);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadTracks();
}


function showUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('username-display').textContent = `👤 ${user.username}`;
    } else {
        window.location.href = 'login.html';
    }
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}


audio.addEventListener('ended', nextTrack);


showUsername();
loadTracks();