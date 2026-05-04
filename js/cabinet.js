const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = 'login.html';
}

document.getElementById('profile-name').textContent = user.username;