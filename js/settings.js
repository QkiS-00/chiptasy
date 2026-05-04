const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = 'login.html';
}

function uploadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const photoData = e.target.result;
    localStorage.setItem('userPhoto', photoData);

    document.getElementById('photo-preview').style.backgroundImage = `url(${photoData})`;
    document.getElementById('photo-preview').style.backgroundSize = 'cover';
    document.getElementById('photo-preview-2').style.backgroundImage = `url(${photoData})`;
    document.getElementById('photo-preview-2').style.backgroundSize = 'cover';
  };
  reader.readAsDataURL(file);
}

const savedPhoto = localStorage.getItem('userPhoto');
if (savedPhoto) {
  document.getElementById('photo-preview').style.backgroundImage = `url(${savedPhoto})`;
  document.getElementById('photo-preview').style.backgroundSize = 'cover';
  document.getElementById('photo-preview-2').style.backgroundImage = `url(${savedPhoto})`;
  document.getElementById('photo-preview-2').style.backgroundSize = 'cover';
}

document.getElementById('fullname').value = user.username || '';
document.getElementById('email').value = user.email || '';

function checkPassword() {
  const currentPassword = document.getElementById('current-password').value;
  const settingsMsg = document.getElementById('settings-msg');

  if (currentPassword !== user.password) {
    settingsMsg.style.color = '#f87171';
    settingsMsg.textContent = 'Невірний поточний пароль';
    return false;
  }

  return true;
}