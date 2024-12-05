class Footer extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div')
        this.container.classList.add('footer')

        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .footer {
                background-color: #333;
                color: white;
                padding: 1rem;
                text-align: center;
                font-size: 0.9rem;
            }
            
            .politica {
                color: #00bcd4;
                text-decoration: none;
                font-weight: bold;
            }

            .politica:hover {
                text-decoration: underline;
            }
        `;

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="derechos"><slot name="footer-text">© 2024 - Todos los derechos reservados</slot></p>
            <div class="politica"><slot name="additional-content"></slot></div>
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const templateClone = this.template.content.cloneNode(true);
        this.container.innerHTML = '';
        this.container.appendChild(templateClone);
    }
}

window.customElements.define('mi-footer', Footer);
