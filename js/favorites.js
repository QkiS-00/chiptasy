// Перемикання вкладок
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'liked') {
        document.getElementById('tab-liked').style.display = 'block';
        document.getElementById('tab-playlists').style.display = 'none';
        tabs[0].classList.add('active');
        loadFavorites();
    } else {
        document.getElementById('tab-liked').style.display = 'none';
        document.getElementById('tab-playlists').style.display = 'block';
        tabs[1].classList.add('active');
        loadPlaylists();
    }
}

// Завантаження вподобаних
function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-msg">
                <div class="empty-icon">🎵</div>
                <p>У вас ще немає вподобаних треків</p>
                <span>Поставте ❤️ на треках які вам подобаються</span>
                <a href="index.html">Перейти до треків</a>
            </div>
        `;
        return;
    }

    favoritesList.innerHTML = '';
    favorites.forEach((track, index) => {
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

        // Формуємо список плейлистів для додавання
        const playlistOptions = playlists.map((pl, i) =>
            `<option value="${i}">${pl.name}</option>`
        ).join('');

        const div = document.createElement('div');
        div.className = 'track-item';
        div.innerHTML = `
            <div class="track-left">
                <div class="track-number">${index + 1}</div>
                <div>
                    <div class="track-name">🎵 ${track.title}</div>
                    <div class="track-artist">${track.artist}</div>
                </div>
            </div>
            <div class="track-actions">
                ${playlists.length > 0 ? `
                <select class="playlist-select" id="select-${index}">
                    <option value="">+ В плейлист</option>
                    ${playlistOptions}
                </select>
                <button class="btn-add-to-playlist" onclick="addToPlaylist(${index})">✓</button>
                ` : ''}
                <button class="like-btn liked" onclick="removeFavorite('${track.title}')">💜</button>
            </div>
        `;
        favoritesList.appendChild(div);
    });

    window.tracks = favorites;
}

// Видалення з вподобаних
function removeFavorite(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(f => f.title !== title);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// Створення плейлиста
function createPlaylist() {
    const name = document.getElementById('playlist-name').value.trim();
    if (!name) {
        alert('Введіть назву плейлиста!');
        return;
    }

    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    playlists.push({ name, tracks: [] });
    localStorage.setItem('playlists', JSON.stringify(playlists));

    document.getElementById('playlist-name').value = '';
    loadPlaylists();
}

// Завантаження плейлистів
function loadPlaylists() {
    const playlistsList = document.getElementById('playlists-list');
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

    if (playlists.length === 0) {
        playlistsList.innerHTML = `
            <div class="empty-msg">
                <div class="empty-icon">📂</div>
                <p>У вас ще немає плейлистів</p>
                <span>Створіть перший плейлист вище</span>
            </div>
        `;
        return;
    }

    playlistsList.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const div = document.createElement('div');
        div.className = 'playlist-item';
        div.innerHTML = `
            <div class="playlist-header" onclick="togglePlaylist(${index})">
                <div>
                    <div class="playlist-name">📂 ${playlist.name}</div>
                    <div class="playlist-count">${playlist.tracks.length} треків</div>
                </div>
                <div class="playlist-actions">
                    <button onclick="event.stopPropagation(); deletePlaylist(${index})">🗑️</button>
                </div>
            </div>
            <div class="playlist-tracks" id="playlist-tracks-${index}" style="display:none">
                ${playlist.tracks.length === 0
                    ? '<p class="empty-playlist">Плейлист порожній</p>'
                    : playlist.tracks.map((track, ti) => `
                        <div class="playlist-track-item">
                            <span>🎵 ${track.title} — ${track.artist}</span>
                            <button onclick="removeFromPlaylist(${index}, ${ti})">✕</button>
                        </div>
                    `).join('')
                }
            </div>
        `;
        playlistsList.appendChild(div);
    });
}

// Відкрити/закрити плейлист
function togglePlaylist(index) {
    const tracks = document.getElementById(`playlist-tracks-${index}`);
    tracks.style.display = tracks.style.display === 'none' ? 'block' : 'none';
}

// Додати трек в плейлист
function addToPlaylist(trackIndex) {
    const select = document.getElementById(`select-${trackIndex}`);
    const playlistIndex = select.value;

    if (playlistIndex === '') {
        alert('Оберіть плейлист!');
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    const track = favorites[trackIndex];

    // Перевіряємо чи трек вже є
    const exists = playlists[playlistIndex].tracks.some(t => t.title === track.title);
    if (exists) {
        alert('Цей трек вже є в плейлисті!');
        return;
    }

    playlists[playlistIndex].tracks.push(track);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    alert(`Додано в "${playlists[playlistIndex].name}"!`);
}

// Видалити трек з плейлиста
function removeFromPlaylist(playlistIndex, trackIndex) {
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    playlists[playlistIndex].tracks.splice(trackIndex, 1);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    loadPlaylists();
}

// Видалити плейлист
function deletePlaylist(index) {
    if (!confirm('Видалити плейлист?')) return;
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    playlists.splice(index, 1);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    loadPlaylists();
}

// Перевірка користувача
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

showUsername();
loadFavorites();