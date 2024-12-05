
class CancionesHasPlaylists extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement("div");
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .table-container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            .table-container h2 {
                text-align: center;
            }
            .table-container table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            .table-container th, .table-container td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: left;
            }
            .table-container th {
                background-color: #007BFF;
                color: white;
            }
        `;

        this.shadowRoot.append(this.estilo, this.container);
    }

    connectedCallback() {
        this.render();
    }

    render = async () => {
        this.container.innerHTML = `
            <div class="table-container">
                <h2>Listado de Canciones en Playlists</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID Canción</th>
                            <th>ID Playlist</th>
                        </tr>
                    </thead>
                    <tbody id="canciones-playlists-body">
                    </tbody>
                </table>
            </div>
        `;

        try {
            const response = await fetch('http://localhost:8000/canciones_has_playlists');
            const data = await response.json();

            const tbody = this.shadowRoot.querySelector('#canciones-playlists-body');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.idCancion}</td>
                    <td>${item.idPlaylist}</td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.log(`Error al realizar fetch ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    }
}

window.customElements.define('canciones-has-playlists', CancionesHasPlaylists);