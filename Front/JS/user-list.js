class UsuarioList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');

    this.estilo = document.createElement('style');
    this.estilo.textContent=`
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

      .actions .btn-edit {
        background-color: #ffb74d;
        color: white;
        transition: background-color 0.3s;
      }

      .actions .btn-edit:hover {
        background-color: #f57c00;
      }`;

    this.shadowRoot.appendChild(this.estilo);
    this.shadowRoot.appendChild(this.container);
  
  }
  
  connectedCallback() {
    const apiUrl = this.getAttribute('api-url');
    this.fetchData(apiUrl);

    window.addEventListener('user-added', () => {
      this.fetchData(apiUrl);
    });
  }
  
  fetchData = async (url) =>{
    try {
      const response = await fetch(url);
      const data = await response.json();
      const books = data || [];
      this.render(books);
    }catch (error) {
      console.log(`Erro al realizar fetch ${error}`);
      this.container.innerHTML=`
      <p class="error-alert">Error de la API</p>`;
    }
  }
  
  render = (usuarios) => {
    this.container.innerHTML = `
      <div>
        <h1>Lista de Usuarios</h1>
      </div>
    `;

    if(usuarios.length == 0){
      this.container.innerHTML=`
      <p class="empty-alert">No hay usuarios registrados.</p>`;
      return;
    }
  
    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    usuarios.forEach((usuario) => {
      tableHTML += `
        <tr>
          <td>${usuario.id_usuario}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td class="actions">
            <button class="btn-delete" data-id="${usuario.id_usuario}">Eliminar</button>
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
      btn.addEventListener('click', async () => {
        const userId = btn.getAttribute('data-id');
        try {
          const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            alert('Usuario eliminado exitosamente');
            const apiUrl = this.getAttribute('api-url');
            this.fetchData(apiUrl);
          } else {
            alert('Error al eliminar el usuario');
          }
        } catch (error) {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el usuario');
        }
      });
    });
  };
  
}
  
window.customElements.define('user-list', UsuarioList);
  