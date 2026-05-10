// Перевірка користувача
const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (!user) {
    window.location.href = 'login.html';
}

// Показуємо нікнейм
document.getElementById('profile-name').textContent = `Привіт, "${user.username}"`;
document.getElementById('username-display') &&
    (document.getElementById('username-display').textContent = `👤 ${user.username}`);

// Фото профілю
const savedPhoto = localStorage.getItem('profilePhoto');
if (savedPhoto) {
    const photo = document.getElementById('profile-photo');
    photo.style.backgroundImage = `url('${savedPhoto}')`;
    photo.textContent = '';
}

// Статистика — рахуємо з localStorage
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

document.getElementById('stat-saves').textContent = favorites.length;
document.getElementById('stat-plays').textContent =
    parseInt(localStorage.getItem('totalPlays') || '0');

// Збереження — показуємо лайкнуті треки
function loadSaved() {
    const savedList = document.getElementById('saved-tracks');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length === 0) {
        savedList.innerHTML = `<p class="saved-empty">😔 Немає збережених треків — 
            <a href="index.html" style="color:#a855f7">перейти до треків</a></p>`;
        return;
    }

    savedList.innerHTML = '';
    favorites.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'saved-track-item';
        div.innerHTML = `
            <div>
                <div class="saved-track-name">🎵 ${track.title}</div>
                <div class="saved-track-artist">${track.artist}</div>
            </div>
            <button onclick="removeSaved('${track.title}')" 
                    style="background:none;border:none;color:#aaaaaa;cursor:pointer;font-size:18px">
                💜
            </button>
        `;
        savedList.appendChild(div);
    });
}

// Видалити зі збереженого
function removeSaved(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(f => f.title !== title);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadSaved();

    // Оновлюємо статистику
    document.getElementById('stat-saves').textContent = favorites.length;
}


function showAddTrack() {
    alert('Функція додавання треку буде додана пізніше');
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

loadSaved();