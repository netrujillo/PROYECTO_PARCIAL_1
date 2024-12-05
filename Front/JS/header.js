class NavBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div')
        this.container.classList.add('footer')

        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .nav-bar {
                background-color: #333;
                color: white;
                padding: 0.5rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 1rem;
            }

            .title {
                margin: 0 50px;
                font-size: 1.2rem;
                font-weight: bold;
            }

            .menu-container {
                display: flex;
                gap: 1rem;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .menu-item {
                padding: 16px;
                color: white;
                text-decoration: none;
                font-size: 1.2rem;
                transition: color 0.3s;
                cursor: pointer;
            }

            .menu-item:hover {
                color: #d7ccc8;
            }
        `;

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="nav-bar">
                <div class="title"><slot name="main-title">Default Title</slot></div>
                <ul class="menu-container"></ul>
            </div>
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.container);

        this.templateClone = this.template.content.cloneNode(true);
        this.container.appendChild(this.templateClone);

        this.menuContainer = this.shadow.querySelector('.menu-container');
    }

    connectedCallback() {
        this.renderMenu();
    }

    renderMenu() {
        const menuOptions = [
            { texto: 'Inicio', enlace: 'index.html' },
            { texto: 'Usuarios', enlace: 'usuarios.html' },
            { texto: 'Métodos de Pago', enlace: 'met_pagos.html' },
            { texto: 'Pagos de Usuarios', enlace: 'pagos_usuario.html' },
            { texto: 'Acerca de', enlace: 'acerca.html' }
        ];

        this.menuContainer.innerHTML = '';

        menuOptions.forEach(option => {
            const link = document.createElement('a');
            link.href = option.enlace;
            link.textContent = option.texto;
            link.classList.add('menu-item');

            const item = document.createElement('li');
            item.appendChild(link);

            this.menuContainer.appendChild(item);
        });
    }
}

window.customElements.define('nav-bar', NavBar);

