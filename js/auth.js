function register() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('error-msg');

    if (!username || !email || !password || !confirmPassword) {
        errorMsg.textContent = 'Заповніть усі поля';
        return;
    }

    if (password.length < 6) {
        errorMsg.textContent = 'Пароль має бути не менше 6 символів';
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Паролі не збігаються';
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(user));

    errorMsg.style.color = '#4ade80';
    errorMsg.textContent = 'Акаунт успішно створено!';

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    if (!email || !password) {
        errorMsg.textContent = 'Заповніть усі поля';
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
        errorMsg.textContent = 'Невірний email або пароль';
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(savedUser));

    errorMsg.style.color = '#4ade80';
    errorMsg.textContent = 'Вхід успішний!';

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

const user = JSON.parse(localStorage.getItem('user'));
const cabDisplay = document.getElementById('username-display');
if (cabDisplay && user) {
    cabDisplay.textContent = `👤 ${user.username}`;
}