const tracks = [
    {
        title: 'Чёрные глаза',
        artist: 'Opium',
        src: 'audio/track1.mp3',
        genre: 'Hip-Hop',
        cover: 'img/cover1.jpg'
    },
    {
        title: 'Трек 2',
        artist: 'Виконавець 2',
        src: 'audio/track2.mp3',
        genre: 'Pop',
        cover: 'img/cover2.jpg'
    },
    {
        title: 'Трек 3',
        artist: 'Виконавець 3',
        src: 'audio/track3.mp3',
        genre: 'Rock',
        cover: 'img/cover3.jpg'
    }
];

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false; // ← додано!

const audio = document.getElementById('audio');
const playBtn = document.querySelector('.player-controls button:nth-child(2)');

// Завантаження треків
function loadTracks(list = tracks) {
    const trackList = document.getElementById('track-list');
    if (!trackList) return;
    trackList.innerHTML = '';

    list.forEach((track, index) => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isLiked = favorites.some(f => f.title === track.title);

        const div = document.createElement('div');
        div.className = 'track-item' + (index === currentIndex ? ' active' : '');
        div.innerHTML = `
            <div class="track-left" onclick="window.location.href='track.html?id=${index}'">
                <div class="track-name">🎵 ${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-actions">
                <button class="like-btn ${isLiked ? 'liked' : ''}" 
                        onclick="event.stopPropagation(); toggleLike(${index})">
                    ${isLiked ? '💜' : '🤍'}
                </button>
            </div>
        `;
        trackList.appendChild(div);
    });
}

// Відтворення треку
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

// Пауза / відтворення
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

// Наступний трек
function nextTrack() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tracks.length);
        } while (randomIndex === currentIndex && tracks.length > 1);
        currentIndex = randomIndex;
    } else {
        currentIndex = (currentIndex + 1) % tracks.length;
    }
    playTrack(currentIndex);
}

// Попередній трек
function prevTrack() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentIndex);
}

// Режим перемішування
function toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffle-btn');
    if (isShuffle) {
        btn.style.color = '#a855f7';
        btn.title = 'Перемішування увімкнено';
    } else {
        btn.style.color = '#ffffff';
        btn.title = 'Перемішати';
    }
}
// Режим повторення
let isRepeat = false;

function toggleRepeat() {
    isRepeat = !isRepeat;
    const btn = document.getElementById('repeat-btn');
    if (isRepeat) {
        btn.style.color = '#a855f7';
        btn.title = 'Повторення увімкнено';
    } else {
        btn.style.color = '#ffffff';
        btn.title = 'Повторити';
    }
}

// Гучність
function setVolume() {
    const volume = document.getElementById('volume').value;
    audio.volume = volume / 100;
}

// Прогрес бар
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

// Перемотування
function setProgress() {
    const progress = document.getElementById('progress');
    audio.currentTime = (progress.value / 100) * audio.duration;
}

// Лайк
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

// Показуємо ім'я
function showUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('username-display').textContent = `👤 ${user.username}`;
    } else {
        window.location.href = 'login.html';
    }
}

// Вихід
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Автоматично наступний трек
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.play();
    } else {
        nextTrack();
    }
});
// Запуск
showUsername();
loadTracks();   