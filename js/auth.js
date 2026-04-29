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

  errorMsg.textContent = '';
  const user = {
    username: username,
    email: email,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(user));
  errorMsg.style.color = '4ade80';
  errorMsg.textContent = 'Акаунт успішно створено!';
}