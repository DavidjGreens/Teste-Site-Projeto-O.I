document.addEventListener('DOMContentLoaded', () => {
    // Seletores para elementos do menu e tema
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavList = document.querySelector('.main-nav-list');
    const dropHover = document.querySelector('.drop-hover > a'); // O link "LINGUAGENS"
    const dropMenu = document.querySelector('.drop-hover .drop'); // O div de dropdown
    const settingsButton = document.querySelector('.settings-button');
    const settingsMenu = document.querySelector('.settings-menu');
    const themeToggle = document.getElementById('theme-toggle');

    // --- Funcionalidade do Menu Hambúrguer ---
    if (menuToggle && mainNavList) {
        menuToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('active');
            // Fechar menu de configurações se estiver aberto
            if (settingsMenu.classList.contains('open')) {
                settingsMenu.classList.remove('open');
                settingsButton.classList.remove('active');
            }
        });

        // Fechar menu quando um item é clicado (para mobile)
        mainNavList.querySelectorAll('a:not(.drop-hover a)').forEach(item => {
            item.addEventListener('click', () => {
                if (mainNavList.classList.contains('active')) {
                    mainNavList.classList.remove('active');
                }
            });
        });
    }

    // --- Funcionalidade do Dropdown (para Mobile) ---
    // Ativa/desativa o dropdown quando o link 'Linguagens' é clicado
    if (dropHover && dropMenu) {
        dropHover.addEventListener('click', (e) => {
            // Previne a navegação para '#' no mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropMenu.classList.toggle('active-drop');
            }
        });

        // Fechar dropdown quando um item do dropdown é clicado (para mobile)
        dropMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    dropMenu.classList.remove('active-drop');
                    // Opcional: fechar o menu principal se o dropdown for parte dele
                    if (mainNavList.classList.contains('active')) {
                        mainNavList.classList.remove('active');
                    }
                }
            });
        });
    }

    // --- Funcionalidade da Engrenagem de Configurações ---
    if (settingsButton && settingsMenu) {
        settingsButton.addEventListener('click', () => {
            settingsMenu.classList.toggle('open');
            settingsButton.classList.toggle('active');
            // Fechar menu hambúrguer se estiver aberto
            if (mainNavList && mainNavList.classList.contains('active')) {
                mainNavList.classList.remove('active');
            }
        });

        // Fechar menu de configurações se clicar fora dele
        document.addEventListener('click', (event) => {
            if (!settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
                settingsMenu.classList.remove('open');
                settingsButton.classList.remove('active');
            }
        });
    }

    // --- Funcionalidade de Alternância de Tema (Tema Escuro/Claro) ---

    // 1. Função para aplicar o tema
    function applyTheme(theme) {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.textContent = 'Tema Claro';
            }
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.textContent = 'Tema Escuro';
            }
        }
    }

    // 2. Carregar o tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Se não houver tema salvo, verifica a preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Aplica o tema claro como padrão se não houver preferência ou salvo
        }
    }

    // 3. Event listener para alternar o tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            if (body.classList.contains('dark-mode')) {
                applyTheme('light');
                localStorage.setItem('theme', 'light'); // Salva a escolha do usuário
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark'); // Salva a escolha do usuário
            }
        });
    }
});

// Adicione este script no final do seu arquivo, caso já não tenha.
// Ele é para o VLibras, não relacionado ao tema, mas é bom manter junto.
// new window.VLibras.Widget('https://vlibras.gov.br/app'); // Este já está no HTML

document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantenha todo o seu código script.js existente aqui) ...

    // --- Funcionalidade de Áudio (parar outros quando um começa a tocar) ---
    const allAudios = document.querySelectorAll('.member-card audio');

    if (allAudios.length > 0) {
        allAudios.forEach(audio => {
            audio.addEventListener('play', () => {
                allAudios.forEach(otherAudio => {
                    if (otherAudio !== audio && !otherAudio.paused) {
                        otherAudio.pause();
                    }
                });
            });
        });
    }
});