class PagosUserList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.container = document.createElement('div');
      this.styleElement = document.createElement('style');
  
      this.styleElement.textContent = `
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
        .empty-alert {
          text-align: center;
          color: #d84315;
          font-size: 16px;
          margin: 20px 0;
        }
      `;
  
      this.shadowRoot.appendChild(this.styleElement);
      this.shadowRoot.appendChild(this.container);
    }
  
    connectedCallback() {
      const apiUrl = this.getAttribute('api-url');
      this.fetchData(apiUrl);

      window.addEventListener('relacion-added', () => {
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
        this.container.innerHTML = `<p class="empty-alert">Error al cargar los datos.</p>`;
      }
    };
  
    render = (data) => {
      this.container.innerHTML = `
        <div>
          <h1>Relaciones de Pago-Usuarios </h1>
        </div>
      `;
  
      if (data.length === 0) {
        this.container.innerHTML += `<p class="empty-alert">No hay relaciones registradas.</p>`;
        return;
      }
  
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Nombre Usuario</th>
              <th>ID Método</th>
              <th>Tipo Método</th>
            </tr>
          </thead>
          <tbody>
      `;
  
      data.forEach((relacion) => {
        tableHTML += `
          <tr>
            <td>${relacion.id_usuario}</td>
            <td>${relacion.usuario_nombre}</td>
            <td>${relacion.id_metodo}</td>
            <td>${relacion.metodo_tipo}</td>
          </tr>
        `;
      });
  
      tableHTML += `
          </tbody>
        </table>
      `;
  
      this.container.innerHTML += tableHTML;
    };
  }
  
  window.customElements.define('pagos-user-list', PagosUserList);
  
  