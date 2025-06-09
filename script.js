document.addEventListener('DOMContentLoaded', () => {
    // === Lógica do Tema Escuro ===
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema salvo
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Tema Claro';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Tema Escuro';
        }
    };

    // Aplica o tema ao carregar a página
    applyTheme();

    // Event listener para o botão de alternar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = 'Tema Escuro';
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = 'Tema Claro';
            }
        });
    }

    // === Lógica do Menu de Configurações (Engrenagem) ===
    const settingsButton = document.querySelector('.settings-button');
    const settingsMenu = document.querySelector('.settings-menu');

    if (settingsButton && settingsMenu) {
        settingsButton.addEventListener('click', () => {
            settingsMenu.classList.toggle('open');
            settingsButton.classList.toggle('active'); // Para girar a engrenagem
        });

        // Fechar o menu de configurações se clicar fora
        document.addEventListener('click', (event) => {
            if (!settingsButton.contains(event.target) && !settingsMenu.contains(event.target)) {
                settingsMenu.classList.remove('open');
                settingsButton.classList.remove('active');
            }
        });
    }

    // === Lógica do Menu Hambúrguer e Dropdowns (Mobile) ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavigationMenu = document.querySelector('.menu .main-nav-list'); // <--- ALTERADO AQUI!
    const dropHoverItems = document.querySelectorAll('.drop-hover > a'); // Seleciona o link <a> dentro de .drop-hover

    if (menuToggle && mainNavigationMenu) {
        menuToggle.addEventListener('click', () => {
            mainNavigationMenu.classList.toggle('active');
            // Fechar todos os dropdowns quando o menu principal é fechado
            if (!mainNavigationMenu.classList.contains('active')) {
                document.querySelectorAll('.drop.active-drop').forEach(drop => {
                    drop.classList.remove('active-drop');
                });
            }
        });
    }

    // Lógica para dropdowns no mobile (clique no "LINGUAGENS")
    dropHoverItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Verifica se está em modo mobile (com o menu principal ativo)
            if (mainNavigationMenu && mainNavigationMenu.classList.contains('active')) {
                event.preventDefault(); // Previne a navegação padrão do link pai
                const dropMenu = item.nextElementSibling; // Pega o div.drop ao lado do <a>
                if (dropMenu && dropMenu.classList.contains('drop')) {
                    dropMenu.classList.toggle('active-drop'); // Alterna a classe para mostrar/esconder o dropdown
                }
            }
        });
    });

    // Fechar o menu hamburguer e dropdowns se clicar fora no mobile
    document.addEventListener('click', (event) => {
        // Verifica se o menu hamburguer está ativo e se o clique não foi no botão de toggle ou no próprio menu
        if (mainNavigationMenu && mainNavigationMenu.classList.contains('active') &&
            !menuToggle.contains(event.target) && !mainNavigationMenu.contains(event.target)) {
            mainNavigationMenu.classList.remove('active');
            document.querySelectorAll('.drop.active-drop').forEach(drop => {
                drop.classList.remove('active-drop');
            });
        }
    });
});