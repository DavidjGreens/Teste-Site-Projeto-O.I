document.addEventListener('DOMContentLoaded', function () {
    const settingsContainer = document.querySelector('.settings-container');
    const settingsButton = document.querySelector('.settings-button');
    const settingsMenu = document.querySelector('.settings-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    let isMenuOpen = false;
    let isDarkMode = false;

    // === Lógica para o Menu de Configurações e Tema (Dark Mode) ===

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

    // Fecha o menu de configurações se clicar fora
    document.addEventListener('click', (event) => {
        if (settingsContainer && !settingsContainer.contains(event.target) && isMenuOpen) {
            settingsMenu.classList.remove('open');
            settingsButton.classList.remove('active');
            isMenuOpen = false;
        }
    });

    // Inicializa tema ao carregar
    loadThemePreference();

    // --- Fim da lógica de configurações e tema ---

    // === Lógica para o Menu Hambúrguer ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavigationMenu = document.querySelector('.menu ul'); // Renomeei para evitar conflito com 'menu' no VLibras

    if (menuToggle && mainNavigationMenu) { // Garante que os elementos existem
        menuToggle.addEventListener('click', function() {
            mainNavigationMenu.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder o menu
            // Opcional: muda o ícone do hambúrguer para um 'x'
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-list');
                icon.classList.toggle('bi-x-lg');
            }
        });

        // Fechar menu quando um item é clicado (útil em mobile)
        mainNavigationMenu.querySelectorAll('li a').forEach(item => { // Seleciona todos os links dentro do menu
            item.addEventListener('click', () => {
                if (mainNavigationMenu.classList.contains('active')) {
                    mainNavigationMenu.classList.remove('active');
                    // Retorna o ícone para o hambúrguer se ele foi alterado
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('bi-x-lg');
                        icon.classList.add('bi-list');
                    }
                }
            });
        });

        // Lógica para dropdown no mobile:
        // Clicar no item 'LINGUAGENS' deve apenas abrir/fechar o dropdown, sem navegar
        const dropHoverItem = mainNavigationMenu.querySelector('.drop-hover > a');
        if (dropHoverItem) {
            dropHoverItem.addEventListener('click', function(e) {
                // Verifica se a tela é menor que 768px (o breakpoint que você usou no CSS)
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Impede o comportamento padrão do link
                    const dropContent = this.nextElementSibling; // A div .drop
                    if (dropContent && dropContent.classList.contains('drop')) {
                        dropContent.classList.toggle('active-drop'); // Alterna a classe para mostrar/esconder
                    }
                }
            });
        }
    }
    // --- Fim da lógica do Menu Hambúrguer ---

    // === Lógica para o Smooth Scroll do botão "Comece a Explorar!" (apenas na Home) ===
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) { // Garante que o botão existe (só na index.html)
        heroButton.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link
            const targetId = this.getAttribute('href'); // Pega o ID do alvo (ex: '#main-content-start')
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o elemento
            }
        });
    }
    // --- Fim da lógica do Smooth Scroll ---
});