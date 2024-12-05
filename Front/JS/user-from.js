class UsuarioForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.estilo = document.createElement('style');
    this.estilo.textContent = `
      h1 {
        color:#dc7633;
        text-align: center;
        font-size: 24px;
        margin: 40px 0;
      }

      .form-container {
        display: block;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        padding: 0.8em;
        background-color: #fef9f3;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        color: #5d4037;
      }

      form {
        display: grid;
        gap: 1.5em;
      }

      label {
        font-size: 16px;
        font-weight: bold;
        color: #6d4c41;
      }

      input, button {
        padding: 12px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #d7ccc8;
        transition: all 0.3s ease;
      }

      input:focus, button:focus {
        outline: none;
        border-color: #a1887f;
        box-shadow: 0 0 0 2px rgba(161, 136, 127, 0.2);
      }

      input {
        background-color: #f6e8e1;
      }

      button {
        background-color: #a1887f;
        color: #fff;
        border: none;
        cursor: pointer;
        font-weight: bold;
      }

      button:hover {
        background-color: #8d6e63;
      }

      button:active {
        background-color: #6d4c41;
      }

      .error-message {
        color: #d84315;
        font-size: 12px;
        margin-top: 5px;
      }
    `;


    this.shadowRoot.appendChild(this.estilo);
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback(){
    this.render();
  }

  render = () => {
    this.container.innerHTML = `
      <h1>Formulario de Registro</h1>
      <div class="form-container">
        <form id="usuario-form">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" required />
          <label for="correo">Correo</label>
          <input type="email" id="correo" required />
          <button type="submit">Registrar</button>
        </form>
      </div>
    `;

    this.shadowRoot.querySelector("#usuario-form").addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const nombre = this.shadowRoot.querySelector('#nombre').value;
    const correo = this.shadowRoot.querySelector('#correo').value;

    const newUser = {
      nombre,
      correo
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        alert('Usuario registrado');
        this.shadowRoot.querySelector('#nombre').value = '';
        this.shadowRoot.querySelector('#correo').value = '';
        this.dispatchEvent(new CustomEvent('user-added', { bubbles: true }));
      } else {
        alert('Error al registrar');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al registrar el usuario.');
    }
  };
}

window.customElements.define('user-form', UsuarioForm);

  