class AcercaDe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .acerca-de-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #FFFAF0; /* Fondo cálido */
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                width: 80%;
                max-width: 600px;
                margin: 120px auto;
                font-family: Arial, sans-serif;
                text-align: center;
            }

            .profile-pic {
                width: 160px;
                height: 160px;
                border-radius: 50%;
                border: 5px solid #8E5A36;
                margin-bottom: 20px;
            }

            .nombre {
                font-size: 24px;
                font-weight: bold;
                color: #8E5A36;
                margin-bottom: 10px;
            }

            .informacion {
                font-size: 16px;
                color: #6A4F3A;
                margin-bottom: 20px;
            }

            .presentacion {
                font-size: 14px;
                color: #4B3F32;
                margin-bottom: 20px;
                font-style: italic;
            }

            .botones {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 20px;
            }

            button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: #FF9E1B;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #FF7F00;
            }

            button:active {
                background-color: #E67300;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const profilePic = './Imagen/foto_usuario.jpg';

        this.container.innerHTML = `
            <div class="acerca-de-container">
                <img src="${profilePic}" alt="Foto del usuario" class="profile-pic">
                <div class="nombre">Nicole Trujillo</div>
                <div class="informacion">
                    <p><strong>Carrera:</strong> Tecnologias de la Información</p>
                    <p><strong>Edad:</strong> 23 años</p>
                    <p><strong>Nacionalidad:</strong> Ecuatoriana</p>
                </div>
                <div class="presentacion">
                    <p>Me gusta la programación y la innovación tecnológica, me encuentro buscando nuevos retos y maneras de mejorar mis habilidades.</p>
                </div>
                <div class="botones">
                    <button id="seguir">Seguir</button>
                    <button id="mensaje">Enviar Mensaje</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('acerca-de', AcercaDe);
