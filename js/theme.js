// Перемикач теми
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');

    if (body.classList.contains('light')) {
        body.classList.remove('light');
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Завантажуємо збережену тему
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.getElementById('theme-btn');

    if (savedTheme === 'light') {
        document.body.classList.add('light');
        btn.textContent = '☀️';
    } else {
        btn.textContent = '🌙';
    }
}

loadTheme();