class Miapi extends HTMLElement {
    constructor() {
        super();

        // Configuración inicial del componente
        this.shadow = this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.estilo = document.createElement('style');
        this.estilo.innerHTML = `
            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                padding: 20px;
            }
            .card {
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
                text-align: center;
                background: #f9f9f9;
                width: 250px;
                margin: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            .card h3 {
                margin: 10px 0;
                font-size: 1.2em;
                color: #333;
            }
            .card p {
                font-size: 0.9em;
                color: #666;
                margin: 0 10px 10px;
            }
        `;

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="card">
                <img src="" alt="Imagen de Perro" />
                <h3></h3>
                <p></p>
            </div>
        `;

        // Agrega los elementos al Shadow DOM
        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.container);
    }

    connectedCallback() {
        this.fetchData();
    }

    async fetchData() {
        const url = `https://api.thedogapi.com/v1/breeds`;
        const apiKey = 'live_8UKarNFSQd3UHhAZRwLEA1yzxgriCYxd37XReOjYcfCtQFKOxdpZ2Pn4dhb2DgNS'; // Tu API Key

        try {
            const response = await fetch(url, {
                headers: {
                    'x-api-key': apiKey // Agrega la API Key en la cabecera
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            this.render(data); // Procesa el array de resultados
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            this.container.innerHTML = `<p class="error-alert">No se pudo conectar a la API.</p>`;
        }
    }

    render(dogs) {
        this.container.innerHTML = ''; // Limpia la galería antes de renderizar
        dogs.forEach(dog => {
            const card = this.template.content.cloneNode(true);
            if (dog.image) {
                card.querySelector('img').src = dog.image.url; // Imagen del perro
                card.querySelector('img').alt = dog.name;
            } else {
                card.querySelector('img').src = 'https://via.placeholder.com/250x200.png?text=No+Image';
                card.querySelector('img').alt = 'Imagen no disponible';
            }
            card.querySelector('h3').textContent = dog.name;
            card.querySelector('p').textContent = `Origen: ${dog.origin || 'Desconocido'} | Temperamento: ${dog.temperament || 'No especificado'}`;
            this.container.appendChild(card);
        });
    }
}

// Define el nuevo elemento custom
window.customElements.define('mi-api', Miapi);
