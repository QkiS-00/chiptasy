const params = new URLSearchParams(window.location.search);
const trackId = parseInt(params.get('id'));

function loadTrackInfo() {
    const track = tracks[trackId];

    if (!track) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('track-title').textContent = track.title;
    document.getElementById('track-artist').textContent = track.artist;
    document.getElementById('track-artist-detail').textContent = track.artist;
    document.getElementById('track-genre-detail').textContent = track.genre || 'Невідомо';
    document.getElementById('track-genre').textContent = track.genre || 'Невідомо';

    if (track.cover) {
        document.getElementById('track-cover').style.backgroundImage = 
            `url('${track.cover}')`;
    }

    document.title = `Chiptasy — ${track.title}`;

    const audio = document.getElementById('audio');
    audio.src = track.src;
    audio.addEventListener('loadedmetadata', () => {
        const min = Math.floor(audio.duration / 60);
        const sec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        document.getElementById('track-duration').textContent = `${min}:${sec}`;
    });

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isLiked = favorites.some(f => f.title === track.title);
    const likeBtn = document.getElementById('like-btn');
    if (isLiked) {
        likeBtn.textContent = '💜 В обраному';
        likeBtn.classList.add('liked');
    }
}

function playCurrentTrack() {
    playTrack(trackId);
}

function toggleLikeTrack() {
    const track = tracks[trackId];
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some(f => f.title === track.title);
    const likeBtn = document.getElementById('like-btn');

    if (exists) {
        favorites = favorites.filter(f => f.title !== track.title);
        likeBtn.textContent = '🤍 В обране';
        likeBtn.classList.remove('liked');
    } else {
        favorites.push(track);
        likeBtn.textContent = '💜 В обраному';
        likeBtn.classList.add('liked');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showUsername() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('username-display').textContent = `👤 ${user.username}`;
    } else {
        window.location.href = 'login.html';
    }
}

function setRating(value) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    if (!ratings[trackId]) ratings[trackId] = [];
    ratings[trackId].push(value);
    localStorage.setItem('ratings', JSON.stringify(ratings));
    highlightStars(value);
    showAvgRating();
}

function highlightStars(value) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.color = index < value ? '#a855f7' : '#444';
    });
}

function showAvgRating() {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    const trackRatings = ratings[trackId];
    if (!trackRatings || trackRatings.length === 0) return;
    const avg = (trackRatings.reduce((a, b) => a + b, 0) / trackRatings.length).toFixed(1);
    document.getElementById('avg-rating').textContent = avg + ' ⭐';
}

showAvgRating();
showUsername();
loadTrackInfo();