class InicioPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.container = document.createElement('div');
      this.container.classList.add('inicio-container');
      this.estilo = document.createElement('style');
  
      this.estilo.textContent = `
        :host {
            display: block;
            height: 110vh;
            width: 100%;
            margin: 0;
        }

        .inicio-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: #f0f8ff;
            color: #333;
            text-align: center;
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        h1 {
            color: #dc7633;
            font-size: 36px;
            margin-bottom: 10px;
        }

        p {
            font-size: 20px;
            color: #5d4037;
        }
        `;

      this.template = document.createElement('template');
      this.template.innerHTML = `
        <h1>Bienvenido a ShopSmart</h1>
        <p>La mejor plataforma de compras</p>
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
  

window.customElements.define('inicio-page', InicioPage);
  