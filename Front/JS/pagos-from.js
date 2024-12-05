class PagosForm extends HTMLElement {
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
      select, input, button {
        padding: 12px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #d7ccc8;
      }
      button {
        background-color: #a1887f;
        color: #fff;
        border: none;
        cursor: pointer;
        font-weight: bold;
      }
    `;

    this.shadowRoot.appendChild(this.estilo);
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.container.innerHTML = `
      <h1>Formulario de Métodos de Pago</h1>
      <div class="form-container">
        <form id="pago-form">
          <label for="tipo">Tipo de Método de Pago</label>
          <select id="tipo" required>
            <option value="">Selecciona un tipo</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="PayPal">PayPal</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Efectivo">Efectivo</option>
          </select>

          <label for="entidad">Entidad</label>
          <input type="text" id="entidad" required />

          <button type="submit">Registrar</button>
        </form>
      </div>
    `;

    this.shadowRoot.querySelector('#pago-form').addEventListener('submit', this.handleSubmit);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const tipo = this.shadowRoot.querySelector('#tipo').value;
    const entidad = this.shadowRoot.querySelector('#entidad').value;

    if (!tipo || !entidad) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const newPago = { tipo, entidad };

    try {
      const response = await fetch('http://localhost:3000/api/metodos-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPago),
      });

      if (response.ok) {
        alert('Método de pago registrado');
        this.shadowRoot.querySelector('#tipo').value = '';
        this.shadowRoot.querySelector('#entidad').value = '';
        this.dispatchEvent(new CustomEvent('pago-added', { bubbles: true }));
      } else {
        alert('Error al registrar el método de pago');
      }
    } catch (error) {
      console.error(`Error al registrar: ${error}`);
    }
  };
}

window.customElements.define('pagos-form', PagosForm);

  