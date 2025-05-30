document.addEventListener('DOMContentLoaded', function () {
    const settingsContainer = document.querySelector('.settings-container');
    const settingsButton = document.querySelector('.settings-button');
    const settingsMenu = document.querySelector('.settings-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    let isMenuOpen = false;
    let isDarkMode = false;

    // Carrega a preferência de tema do localStorage
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('darkModeEnabled');

        if (savedTheme !== null) {
            isDarkMode = (savedTheme === 'true');
            body.classList.toggle('dark-mode', isDarkMode);
            if (themeToggle) {
                themeToggle.textContent = isDarkMode ? 'Tema Claro' : 'Tema Escuro';
            }
        }
    }

    // Aplica o evento de alternar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            body.classList.toggle('dark-mode', isDarkMode);

            themeToggle.textContent = isDarkMode ? 'Tema Claro' : 'Tema Escuro';

            // Salva no localStorage
            localStorage.setItem('darkModeEnabled', isDarkMode);
        });
    }

    // Alterna o menu de configurações
    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            settingsMenu.classList.toggle('open');
            settingsButton.classList.toggle('active', isMenuOpen);
        });
    }

    // Fecha o menu se clicar fora
    document.addEventListener('click', (event) => {
        if (settingsContainer && !settingsContainer.contains(event.target) && isMenuOpen) {
            settingsMenu.classList.remove('open');
            settingsButton.classList.remove('active');
            isMenuOpen = false;
        }
    });

    // Inicializa tema ao carregar
    loadThemePreference();
});
