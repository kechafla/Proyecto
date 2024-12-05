class PlaylistList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
            }
            th, td {
                padding: 10px;
                border: 1px solid #ccc;
            }
            th {
                background-color: #f4f4f4;
            }
            .actions button {
                margin: 0 5px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-update {
                background-color: #4caf50;
                color: white;
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
            .empty-alert {
                color: gray;
                font-style: italic;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        // Obtenemos la URL de la API desde el atributo del componente
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url); // Llamada a la API
            const data = await response.json(); // Parseamos la respuesta
            const playlists = data || []; // Asumimos que la respuesta contiene una lista de libros
            this.render(playlists); // Pasamos los datos al render
        } catch (error) {
            console.error("Error con la API", error);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    };

    render = (playlists) => {
        if (playlists.length === 0) {
            // Si no hay libros disponibles, mostramos un mensaje
            this.container.innerHTML = `
                <p class="empty-alert">No hay libros disponibles</p>
            `;
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario Creador</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        playlists.forEach((playlist) => {
            tableHTML += `
                <tr>
                    <td>${playlist.idPlaylist}</td>
                    <td>${playlist.Nombre}</td>
                    <td>${playlist.UsuarioCreador}</td>
                    <td>${new Date(playlist.FechaCreacion).toLocaleDateString()}</td>
                    <td class="actions">
                        <button class="btn-update" data-id="${playlist.idPlaylist}">Actualizar</button>
                        <button class="btn-delete" data-id="${playlist.idPlaylist}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        this.container.innerHTML = tableHTML;

        this.container.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });

        this.container.querySelectorAll('.btn-update').forEach((button) => {
            button.addEventListener('click', () => this.handleUpdate(button.dataset.id));
        });
    };

    handleDelete = async (id) => {
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la playlist con ID: ${id}?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/playlists/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Playlist eliminada con éxito');
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    alert('Error al eliminar la playlist');
                    console.error('Error al eliminar la playlist:', response.statusText);
                }
            } catch (error) {
                console.error("Error en la eliminación", error);
                alert('Error con la conexión de la API');
            }
        }
    };

    handleUpdate = async (id) => {
        const newName = prompt('Ingrese el nuevo nombre de la playlist:');
        const newUser = prompt('Ingrese el nuevo usuario creador de la playlist:');
        const newDate = prompt('Ingrese la nueva fecha de creación de la playlist (YYYY-MM-DD):');
        
        if (newName && newUser && newDate) {
            try {
                const response = await fetch(`http://localhost:8000/playlists/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        Nombre: newName,
                        UsuarioCreador: newUser,
                        FechaCreacion: newDate
                    })
                });
                if (response.ok) {
                    alert('Playlist actualizada con éxito');
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    const errorData = await response.json();
                    alert(`Error al actualizar la playlist: ${errorData.message}`);
                    console.error('Error al actualizar la playlist:', response.statusText);
                }
            } catch (error) {
                console.error("Error en la actualización", error);
                alert('Error con la conexión de la API');
            }
        } else {
            alert('Todos los campos deben ser completados');
        }
    };
}

window.customElements.define('playlist-list', PlaylistList);