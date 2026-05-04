function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-msg">
                <p>😔 У вас ще немає обраних треків</p>
                <span>Поставте ❤️ на треках які вам подобаються</span>
                <a href="index.html">Перейти до треків</a>
            </div>
        `;
        return;
    }

    favoritesList.innerHTML = '';
    favorites.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'track-item';
        div.innerHTML = `
            <div class="track-left" onclick="playTrack(${index})">
                <div class="track-number">${index + 1}</div>
                <div>
                    <div class="track-name">🎵 ${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
            </div>
            <div class="track-actions">
                <button class="like-btn liked" onclick="removeFavorite('${track.title}')">💜</button>
            </div>
        `;
        favoritesList.appendChild(div);
    });

    window.tracks = favorites;
}

function removeFavorite(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(f => f.title !== title);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
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


const style = document.createElement('style');
style.textContent = `
    .empty-msg {
        text-align: center;
        padding: 60px;
        color: #aaaaaa;
    }
    .empty-msg p {
        font-size: 18px;
        margin-bottom: 16px;
    }
    .empty-msg a {
        color: #a855f7;
        text-decoration: none;
        font-size: 15px;
    }
    .empty-msg a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

showUsername();
loadFavorites();