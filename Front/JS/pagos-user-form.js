class PagosUserForm extends HTMLElement {
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
        select, button {
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
      this.fetchUsuarios();
      this.fetchMetodosPago();
    }
  
    // Obtener los usuarios disponibles
    fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/usuarios');
        const usuarios = await response.json();
        this.renderUsuarios(usuarios);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
  
    // Obtener los métodos de pago disponibles
    fetchMetodosPago = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/metodos-pago');
        const metodosPago = await response.json();
        this.renderMetodosPago(metodosPago);
      } catch (error) {
        console.error('Error al obtener métodos de pago:', error);
      }
    };
  
    // Renderizar las opciones de usuarios
    renderUsuarios = (usuarios) => {
      const selectUsuarios = this.shadowRoot.querySelector('#usuario');
      usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id_usuario;
        option.textContent = `${usuario.nombre} (${usuario.id_usuario})`;
        selectUsuarios.appendChild(option);
      });
    };
  
    // Renderizar las opciones de métodos de pago
    renderMetodosPago = (metodosPago) => {
      const selectMetodosPago = this.shadowRoot.querySelector('#metodo');
      metodosPago.forEach(metodo => {
        const option = document.createElement('option');
        option.value = metodo.id_metodo;
        option.textContent = `${metodo.tipo} (${metodo.id_metodo})`;
        selectMetodosPago.appendChild(option);
      });
    };
  
    render = () => {
      this.container.innerHTML = `
        <h1>Formulario de Relación de Pagos-Usuarios</h1>
        <div class="form-container">
          <form id="pago-usuario-form">
            <label for="usuario">Usuario</label>
            <select id="usuario" required>
              <option value="">Selecciona un usuario</option>
            </select>
  
            <label for="metodo">Método de Pago</label>
            <select id="metodo" required>
              <option value="">Selecciona un método de pago</option>
            </select>
  
            <button type="submit">Crear Relación</button>
          </form>
        </div>
      `;
  
      this.shadowRoot.querySelector('#pago-usuario-form').addEventListener('submit', this.handleSubmit);
    };
  
    handleSubmit = async (event) => {
      event.preventDefault();
  
      const usuarioId = this.shadowRoot.querySelector('#usuario').value;
      const metodoId = this.shadowRoot.querySelector('#metodo').value;
  
      if (!usuarioId || !metodoId) {
        alert('Por favor, selecciona un usuario y un método de pago válidos.');
        return;
      }
  
      const pagoUsuario = { id_usuario: usuarioId, id_metodo: metodoId };
  
      try {
        const response = await fetch('http://localhost:3000/api/pagos-usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pagoUsuario),
        });
  
        if (response.ok) {
          alert('Relación creada exitosamente');
          this.dispatchEvent(new CustomEvent('relacion-added', { bubbles: true }));
        } else {
          alert('Error al crear la relación');
        }
      } catch (error) {
        console.error('Error al crear la relación:', error);
        alert('Ocurrió un error al crear la relación');
      }
    };
  }
  
  window.customElements.define('pagos-user-form', PagosUserForm);
  
  
  
  
