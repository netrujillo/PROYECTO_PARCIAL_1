class PagosList extends HTMLElement {
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
          margin: 20px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 16px;
          text-align: left;
          background-color: #faf3e0;
          border: 1px solid #e0d4c3;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        th, td {
          padding: 12px;
          border-bottom: 1px solid #e0d4c3;
        }
        th {
          background-color: #d2b48c;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        tr:nth-child(even) {
          background-color: #f9f4e7;
        }
        .actions button {
          margin: 0 5px;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        .actions .btn-delete {
          background-color: #e57373;
          color: white;
          transition: background-color 0.3s;
        }
        .actions .btn-delete:hover {
          background-color: #d32f2f;
        }
      `;
  
      this.shadowRoot.appendChild(this.estilo);
      this.shadowRoot.appendChild(this.container);
    }
  
    connectedCallback() {
      const apiUrl = this.getAttribute('api-url');
      this.fetchData(apiUrl);

      window.addEventListener('pago-added', () => {
        this.fetchData(apiUrl);
      });
    }
  
    fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.render(data || []);
      } catch (error) {
        console.error(`Error al obtener datos: ${error}`);
        this.container.innerHTML = `<p class="error-alert">Error al cargar los métodos de pago.</p>`;
      }
    };
  
    render = (pagos) => {
      this.container.innerHTML = `
        <div>
          <h1>Lista de Métodos de Pago</h1>
        </div>
      `;
  
      if (pagos.length === 0) {
        this.container.innerHTML += `<p class="empty-alert">No hay métodos de pago registrados.</p>`;
        return;
      }
  
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Entidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      pagos.forEach((pago) => {
        tableHTML += `
          <tr>
            <td>${pago.id_metodo}</td>
            <td>${pago.tipo}</td>
            <td>${pago.entidad}</td>
            <td class="actions">
              <button class="btn-delete" data-id="${pago.id_metodo}">Eliminar</button>
            </td>
          </tr>
        `;
      });
  
      tableHTML += `
          </tbody>
        </table>
      `;
  
      this.container.innerHTML += tableHTML;
  
      this.container.querySelectorAll('.btn-delete').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          this.deletePago(id);
        });
      });
    };

    updateList = () => {
      const apiUrl = this.getAttribute('api-url');
      this.fetchData(apiUrl);
    };
  
    deletePago = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/metodos-pago/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Método de pago eliminado');
          this.fetchData(this.getAttribute('api-url'));
        } else {
          alert('Error al eliminar el método de pago');
        }
      } catch (error) {
        console.error(`Error al eliminar: ${error}`);
      }
    };
  }
  
  window.customElements.define('pagos-list', PagosList);
  