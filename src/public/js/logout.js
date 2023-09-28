const btnLogout = document.getElementById('btnLogout');
console.log('js logout');

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        fetch('/api/session/logout').then(() => {
          window.location.replace('/login');
        });
      });
}