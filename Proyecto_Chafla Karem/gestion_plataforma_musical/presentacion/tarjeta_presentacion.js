class Mitarjeta extends HTMLElement {
    constructor() {
        super();

        // Crear Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.container.classList.add('container-presentacion');

        // Crear estilos
        const estilo = document.createElement('style');
        estilo.textContent = `
            .container-presentacion {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100vw;
            }
                
            .tarjeta-presentacion {
                border: 1px solid #000;
                padding: 80px;
                margin: 10px 300px;
                align-items: center;

                display: flex;
                flex-direction: column;
                justify-content: center;

            }
            .card-imagen {
                display: flex;
                justify-content: center;
                align-items: center;
                height: auto;
                overflow: hidden;
            }
            .card-imagen img {
                width: 100%;
                height: auto;
            }
            .header {
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
            }
            .description {
                text-align: center;
            }
        `;

        // Crear estructura HTML de la tarjeta
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="tarjeta-presentacion">
                <div class="card-imagen">
                    <slot name="imagen">
                        <img src="https://placehold.co/600x400" alt="Default Image">
                    </slot>
                </div>
                <div class="header">
                    <slot name="titulo">Default Title</slot>
                </div>
                <div class="description">
                    <slot name="descripcion">Default Description</slot>
                </div>
            </div>
        `;

        // Adjuntar elementos al Shadow DOM
        this.shadow.appendChild(estilo);
        this.shadow.appendChild(template.content.cloneNode(true));
        
    }
}

// Registrar el Custom Element
window.customElements.define('mi-tarjeta', Mitarjeta);
