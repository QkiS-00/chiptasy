const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = 'login.html';
}

document.getElementById('profile-name').textContent = user.username;

const beats = [
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
  { name: 'Назва', genre: 'Жанр', price: '500грн' },
];

const grid = document.getElementById('beats-grid');

beats.forEach(beat => {
  grid.innerHTML += `
    <div class="beat-card">
      <div class="beat-info">
        <h4>${beat.name}</h4>
        <p>${beat.genre}</p>
        <p class="price">${beat.price}</p>
      </div>
    </div>
  `;
});

document.querySelector('.btn-add').addEventListener('click', () => {
  alert('Функція додавання треку буде додана пізніше');
});