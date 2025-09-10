// Exibir splash e depois sumir
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('splash').classList.add('fade-out');
        setTimeout(() => {
          document.getElementById('splash').style.display = 'none';
          document.getElementById('login-screen').style.display = 'flex';
        }, 1000);
      }, 2000); // tempo que splash fica visível
    });