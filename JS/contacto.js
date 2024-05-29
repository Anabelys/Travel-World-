const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
});

const eventos = () => {
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');

    if (document.querySelectorAll('.pantalla-completa').length > 0) return;
    
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    }); 
});



const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function () {
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}
const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Validar los campos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const motivo = document.getElementById("motivo").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validar que los campos obligatorios no estén vacíos
        if (nombre === "" || email === "" || motivo === "" || mensaje === "") {
            return;
        }

        // Validar el formato del email utilizando una expresión regular simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return;
        }

        alert ("Formulario enviado correctamente. Muchas Gracias.");
        form.reset(); 
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    document.getElementById('contactForm').style.display = 'none'; // Oculta el formulario
    document.getElementById('thankYouMessage').style.display = 'block'; // Muestra el mensaje de agradecimiento
});