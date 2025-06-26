document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', currentTheme === 'dark');

  const themeButton = document.getElementById('themeToggle');
  if (themeButton) {
    themeButton.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

    themeButton.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeButton.innerHTML = isDark ? '☀️' : '🌙';
    });
  }
});
