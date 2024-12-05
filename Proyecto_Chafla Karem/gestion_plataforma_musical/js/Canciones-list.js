class CancionesList extends HTMLElement {
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
        const apiUrl = this.getAttribute('api-url');
        this.fetchData(apiUrl);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const canciones = data || [];
            this.render(canciones);
        } catch (error) {
            console.error("Error con la API", error);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    };

    render = (canciones) => {
        if (canciones.length === 0) {
            this.container.innerHTML = `
                <p class="empty-alert">No hay canciones disponibles</p>
            `;
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Duración</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        canciones.forEach((cancion) => {
            tableHTML += `
                <tr>
                    <td>${cancion.idCancion}</td>
                    <td>${cancion.Titulo}</td>
                    <td>${cancion.Artista}</td>
                    <td>${cancion.Duracion}</td>
                    <td class="actions">
                        <button class="btn-update" data-id="${cancion.idCancion}">Actualizar</button>
                        <button class="btn-delete" data-id="${cancion.idCancion}">Eliminar</button>
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
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la canción con ID: ${id}?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/canciones/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert('Canción eliminada con éxito');
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    alert('Error al eliminar la canción');
                    console.error('Error al eliminar la canción:', response.statusText);
                }
            } catch (error) {
                console.error("Error en la eliminación", error);
                alert('Error con la conexión de la API');
            }
        }
    };

    handleUpdate = async (id) => {
        const newTitle = prompt('Ingrese el nuevo título de la canción:');
        const newArtist = prompt('Ingrese el nuevo artista de la canción:');
        const newDuration = prompt('Ingrese la nueva duración de la canción:');
        
        if (newTitle && newArtist && newDuration) {
            try {
                const response = await fetch(`http://localhost:8000/canciones/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        Titulo: newTitle,
                        Artista: newArtist,
                        Duracion: newDuration
                    })
                });
                if (response.ok) {
                    alert('Canción actualizada con éxito');
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    const errorData = await response.json();
                    alert(`Error al actualizar la canción: ${errorData.message}`);
                    console.error('Error al actualizar la canción:', response.statusText);
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

window.customElements.define('canciones-list', CancionesList);