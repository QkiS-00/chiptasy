const artists = {
    'Opium': {
        name: 'Opium',
        photo: 'img/cover1.jpg',
        bio: 'Opium — это не просто звук, это движение. Переплетая мрачную эстетику авангардного хип-хопа с агрессивным рейдж-звучанием, артист создает атмосферу ночного города и бесконечного хаоса. Никаких правил, только чистая энергия и стиль, меняющий индустрию здесь и сейчас.'
    },
    'Мурат Тхагалегов': {
        name: 'Мурат Тхагалегов',
        photo: 'img/cover3.jpg',
        bio: 'Мурат Тхагалегов — виконавець з багатою музичною спадщиною.'
    }
};

const params = new URLSearchParams(window.location.search);
const artistName = params.get('name');
const artist = artists[artistName];

if (!artist) {
    window.location.href = 'index.html';
}

document.getElementById('artist-name').textContent = artist.name;
document.getElementById('artist-bio').textContent = artist.bio;
document.getElementById('artist-photo').style.backgroundImage = `url('${artist.photo}')`;
document.title = `Chiptasy — ${artist.name}`;

const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (user) {
    document.getElementById('username-display').textContent = `👤 ${user.username}`;
} else {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

const artistTracks = tracks.filter(t => t.artist === artistName);

function loadArtistTracks() {
    const trackList = document.getElementById('track-list');
    if (!trackList) return;
    trackList.innerHTML = '';

    artistTracks.forEach((track, index) => {
        const realIndex = tracks.indexOf(track);
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isLiked = favorites.some(f => f.title === track.title);

        const div = document.createElement('div');
        div.className = 'track-item';
        div.innerHTML = `
            <div class="track-left" onclick="playTrack(${realIndex})">
                <div class="track-name">🎵 ${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-actions">
                <button class="like-btn ${isLiked ? 'liked' : ''}"
                        onclick="event.stopPropagation(); toggleLike(${realIndex})">
                    ${isLiked ? '💜' : '🤍'}
                </button>
            </div>
        `;
        trackList.appendChild(div);
    });
}

loadArtistTracks();