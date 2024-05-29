const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnCanaimas = document.querySelector('.canaimas');
const btnCalafate = document.querySelector('.calafate');
const btnAmazona = document.querySelector('.amazona');
const btnIguazus = document.querySelector('.iguazus');
const contenedorDestinos = document.querySelector('.destinos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    destinos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});




const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const destinos = () =>{
    let destinosArreglo = [];
    const destinos = document.querySelectorAll('.destino');

    destinos.forEach(destino=> destinosArreglo = [...destinosArreglo,destino]);

    const canaimas = destinosArreglo.filter(canaima  => canaima.getAttribute('data-destino') === 'canaima');
    const calafates = destinosArreglo.filter(calafate => calafate.getAttribute('data-destino') === 'calafate');
    const amazonas = destinosArreglo.filter(amazona => amazona.getAttribute('data-destino') === 'amazona');
    const iguazus = destinosArreglo.filter(iguazu=> iguazu.getAttribute('data-destino') === 'iguazu');

    mostrarDestinos(canaimas, calafates, amazonas, iguazus, destinosArreglo);

}

const mostrarDestinos = (canaimas, calafates, amazonas, iguazus, todos) =>{
    btnCanaimas.addEventListener('click', ()=>{
        limpiarHtml(contenedorDestinos);
        canaimas.forEach(canaima=> contenedorDestinos.appendChild(canaima));
    });

    btnCalafate.addEventListener('click', ()=>{
        limpiarHtml(contenedorDestinos);
        calafates.forEach(calafate=> contenedorDestinos.appendChild(calafate));
    });

    btnAmazona.addEventListener('click', ()=>{
        limpiarHtml(contenedorDestinos);
        amazonas.forEach(amazona=> contenedorDestinos.appendChild(amazona));
    });
    btnIguazus.addEventListener('click', ()=>{
        limpiarHtml(contenedorDestinos);
        iguazus.forEach(iguazu=> contenedorDestinos.appendChild(iguazu));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorDestinos);
        todos.forEach(todo=> contenedorDestinos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

const validarFormulario = () => {
    const form = document.getElementById("travelForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Validar los campos del formulario
        const nombre = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const destino = document.getElementById("destination").value;
        const mensaje = document.getElementById("message").value.trim();
        const terminos = document.getElementById("terms").checked;

        let valid = true;

        if (nombre === "") {
            document.getElementById("nameError").textContent = "El nombre es obligatorio.";
            valid = false;
        } else {
            document.getElementById("nameError").textContent = "";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Introduce un correo válido.";
            valid = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        if (destino === "") {
            document.getElementById("destinationError").textContent = "Selecciona un destino.";
            valid = false;
        } else {
            document.getElementById("destinationError").textContent = "";
        }

        if (mensaje === "") {
            document.getElementById("messageError").textContent = "El mensaje es obligatorio.";
            valid = false;
        } else {
            document.getElementById("messageError").textContent = "";
        }

        if (!terminos) {
            document.getElementById("termsError").textContent = "Debes aceptar los términos y condiciones.";
            valid = false;
        } else {
            document.getElementById("termsError").textContent = "";
        }

        if (valid) {
            alert("Formulario enviado correctamente. Muchas gracias.");
            form.reset(); // Limpiar el formulario después de enviarlo
        }
    });
}
