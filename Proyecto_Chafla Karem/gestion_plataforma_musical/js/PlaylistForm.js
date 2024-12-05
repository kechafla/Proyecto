class PlaylistForm extends HTMLElement { 
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.container = document.createElement("div");
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .form-container {
                max-width: 400px;
                margin: auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            .form-container h2 {
                text-align: center;
            }
            .form-container label {
                display: block;
                margin-top: 10px;
            }
            .form-container input, .form-container button {
                width: 100%;
                padding: 10px;
                margin-top: 5px;
            }
            .form-container button {
                background-color: #007BFF;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .form-container button:hover {
                background-color: #0056b3;
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
            <div class="form-container">
                <h2>Registro de Playlists</h2>
                <form id="playlist-form">
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" required>

                    <label for="usuarioCreador">Usuario Creador</label>
                    <input type="text" name="usuarioCreador" id="usuarioCreador" required>

                    <label for="fechaCreacion">Fecha de Creación</label>
                    <input type="date" name="fechaCreacion" id="fechaCreacion" required>

                    <button type="submit">Registrar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector("#playlist-form").addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const usuarioCreador = this.shadowRoot.querySelector('#usuarioCreador').value;
        const fechaCreacion = this.shadowRoot.querySelector('#fechaCreacion').value;

        const newPlaylist = {
            Nombre: nombre,
            UsuarioCreador: usuarioCreador,
            FechaCreacion: fechaCreacion
        }

        try {
            const response = await fetch('http://localhost:8000/playlists', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newPlaylist)
            });

            if (response.ok) {
                alert('Playlist registrada');
            } else {
                alert('Error al registrar la playlist');
            }
        } catch (error) {
            console.log(`Error al realizar fetch ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    }
}

window.customElements.define('playlist-form', PlaylistForm);
