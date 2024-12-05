class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        // Crear contenedor del header
        this.headerContainer = document.createElement('header');
        this.headerContainer.classList.add('app-header');

        // Crear estilos
        this.styles = document.createElement('style');
        this.styles.textContent = `
            .app-header {
                display: flex;
                justify-content: center; /* Centrar horizontalmente */
                align-items: center; /* Alinear verticalmente */
                padding: 16px;
                background-color: #FFA561;
                color: white;
                font-family: Arial, sans-serif;
            }
            .welcome-message {
                font-size: 24px;
                font-weight: bold;
            }
        `;

        // Crear mensaje de bienvenida
        this.welcomeMessage = document.createElement('div');
        this.welcomeMessage.classList.add('welcome-message');
        this.welcomeMessage.textContent = 'Bienvenido a mi plataforma musical';

        // Adjuntar estilos y contenedor al shadow DOM
        this.shadow.appendChild(this.styles);
        this.headerContainer.appendChild(this.welcomeMessage);
        this.shadow.appendChild(this.headerContainer);
    }
}

window.customElements.define('app-header', AppHeader);