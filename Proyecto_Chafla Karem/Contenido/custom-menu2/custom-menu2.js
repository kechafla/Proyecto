// spell-checker: disable
class MenuPersonalizado extends HTMLElement{
    constructor(){
        super();

        const menuContainer = document.createElement('div');
        menuContainer.classList.add("container-menu");
        
        const menuOptions = [
            {texto:"Inicio", enlace:"../../gestion_plataforma_musical/index.html", icono:"https://cdn.icon-icons.com/icons2/4233/PNG/512/marshall_badge_canine_patrol_paw_patrol_icon_263862.png"},
            {texto:"Playlist", enlace:"../../gestion_plataforma_musical/playlists.html", icono:"https://cdn.icon-icons.com/icons2/4233/PNG/512/skye_canine_patrol_paw_patrol_icon_263867.png"},
            {texto:"Canciones", enlace:"../../gestion_plataforma_musical/canciones.html", icono:"https://cdn.icon-icons.com/icons2/4233/PNG/512/skye_canine_patrol_paw_patrol_icon_263867.png"},
            {texto:"Relacion", enlace:"../../gestion_plataforma_musical/relacion.html", icono:"https://cdn.icon-icons.com/icons2/4233/PNG/512/skye_canine_patrol_paw_patrol_icon_263867.png"},
            {texto:"Acerca", enlace:"../../gestion_plataforma_musical/acerca.html", icono:"https://cdn.icon-icons.com/icons2/4233/PNG/512/rubble_canine_patrol_paw_patrol_icon_263842.png"},

        ];
        
        menuOptions.forEach(op => {
            const listItem = document.createElement('li');
            const icon = document.createElement('img');
            icon.src = op.icono;
            icon.alt = op.texto;
            listItem.appendChild(icon);

            const link = document.createElement('a');
            link.href = op.enlace;
            link.textContent = op.texto;
            listItem.appendChild(link);

            menuContainer.appendChild(listItem);

        });
        
        this.appendChild(menuContainer);
    }
}

window.customElements.define('custom-menu', MenuPersonalizado);