class CancionesForm extends HTMLElement { 
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
                <h2>Registro de Canciones</h2>
                <form id="song-form">
                    <label for="titulo">Título</label>
                    <input type="text" name="titulo" id="titulo" required>

                    <label for="artista">Artista</label>
                    <input type="text" name="artista" id="artista" required>

                    <label for="duracion">Duración</label>
                    <input type="text" name="duracion" id="duracion" required>

                    <button type="submit">Registrar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector("#song-form").addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const titulo = this.shadowRoot.querySelector('#titulo').value;
        const artista = this.shadowRoot.querySelector('#artista').value;
        const duracion = this.shadowRoot.querySelector('#duracion').value;

        const newSong = {
            Titulo: titulo,
            Artista: artista,
            Duracion: duracion
        }

        try {
            const response = await fetch('http://localhost:8000/canciones', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newSong)
            });

            if (response.ok) {
                alert('Canción registrada');
            } else {
                alert('Error al registrar la canción');
            }
        } catch (error) {
            console.log(`Error al realizar fetch ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    }
}

window.customElements.define('canciones-form', CancionesForm);