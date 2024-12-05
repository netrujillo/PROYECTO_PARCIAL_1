class Main extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.container = document.createElement("div");
        this.container.classList.add("main-container");

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .main-container {
                padding: 5px;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 120vh;
            }

            slot {
                display: block;
                width: 100%;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <slot name="content"></slot>
        `;
    }
}

window.customElements.define("mi-main", Main);