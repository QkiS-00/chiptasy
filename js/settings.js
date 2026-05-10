let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if (!currentUser) {
    window.location.href = 'login.html';
}
if (!currentUser) {
    window.location.href = 'login.html';
}

function showUsername() {
    const display = document.getElementById('username-display');
    if (display) display.textContent = `👤 ${currentUser.username}`;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function loadPhoto() {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        const preview = document.getElementById('photo-preview');
        if (preview) {
            preview.style.backgroundImage = `url(${savedPhoto})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
        }
    }
}

function loadUserData() {
    document.getElementById('fullname').value = currentUser.username || '';
    document.getElementById('email').value = currentUser.email || '';
}

function uploadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const photoData = e.target.result;

      
        localStorage.setItem('profilePhoto', photoData);

        const preview = document.getElementById('photo-preview');
        if (preview) {
            preview.style.backgroundImage = `url(${photoData})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
        }

        const msg = document.getElementById('settings-msg');
        msg.style.color = '#4ade80';
        msg.textContent = '✅ Фото успішно оновлено!';
    };
    reader.readAsDataURL(file);
}

function saveSettings() {
    const settingsMsg = document.getElementById('settings-msg');
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    if (currentPassword || newPassword || repeatPassword) {

        if (currentPassword !== currentUser.password) {
            settingsMsg.style.color = '#f87171';
            settingsMsg.textContent = '❌ Невірний поточний пароль!';
            return;
        }

        if (!newPassword) {
            settingsMsg.style.color = '#f87171';
            settingsMsg.textContent = '❌ Введіть новий пароль!';
            return;
        }

        if (newPassword.length < 6) {
            settingsMsg.style.color = '#f87171';
            settingsMsg.textContent = '❌ Пароль має бути мінімум 6 символів!';
            return;
        }

        if (newPassword !== repeatPassword) {
            settingsMsg.style.color = '#f87171';
            settingsMsg.textContent = '❌ Нові паролі не збігаються!';
            return;
        }

        currentUser.password = newPassword;

        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('repeat-password').value = '';
    }

    if (fullname) currentUser.username = fullname;
    if (email) currentUser.email = email;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));

    settingsMsg.style.color = '#4ade80';
    settingsMsg.textContent = '✅ Дані успішно оновлено!';

    setTimeout(() => {
        settingsMsg.textContent = '';
    }, 3000);
}

showUsername();
loadPhoto();
loadUserData();