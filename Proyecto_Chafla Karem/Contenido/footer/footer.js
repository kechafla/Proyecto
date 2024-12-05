class Footer extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({ mode: "open" });
  
      const container = document.createElement("footer");
      container.textContent = "Todos los derechos reservados";
  
      const estilo = document.createElement("style");
      estilo.textContent = `
        footer {
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-align: center;
          padding: 10px;
          background-color: #333;
          color: white;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      `;
  
      this.shadowRoot.appendChild(estilo);
      this.shadowRoot.appendChild(container);
    }
  }
  
  window.customElements.define("mi-footer", Footer);
  