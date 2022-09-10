let botonIniciarJuego = document.getElementById('iniciar-juego');
let botonAgregarPalabra = document.getElementById('agregar-palabra');
let botonRetroceder = document.getElementById('boton-retroceso');
let botonAceptar = document.getElementById('boton-aceptar');
let botonCancelar = document.getElementById('boton-cancelar');
let contenedorInicio = document.getElementById('contenedor-inicio');
let contenedorJuego = document.getElementById('contenedor-juego');
let contenedorPalabraPersonalizada = document.getElementById('contenedor-palabra-personalizada');
let palabraPersonalizada = document.getElementById('palabra-personalizada');
let lista = document.getElementById('texto-informacion-auxiliar');
const regex = /(\d+)/g;
const regex2 = /[ñÑáéíóúÁÉÍÓÚ\s]+/;
let errores = [];

function iniciarJuego() {
    contenedorInicio.style.display = 'none';
    contenedorJuego.style.display = 'flex';
    arrancarJuego();
}

function comprobarPalabraPersonalizada() {
    if (listaDePalabrasSecretas.includes(palabraPersonalizada.value.toUpperCase())) {
        errores.push('La palabra ya esta en la lista');
        return;
    }
    if (palabraPersonalizada.value.length < 3) {
        errores.push('Debe tener al menos 3 caracteres!');
    }
    if (regex.test(palabraPersonalizada.value)) {
        errores.push('No se aceptan numeros!')
    }
    if (regex2.test(palabraPersonalizada.value)) {
        errores.push('No se aceptan caracteres especiales!')
    }
}

function crearErrores(errores) {
    lista.innerHTML = '';
    for (i = 0; i < errores.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = errores[i];
        li.classList.add('texto-incorrecto');
        lista.appendChild(li);
    }
}

function mostrarCajaPalabraPersonalizada() {
    contenedorPalabraPersonalizada.style.top = '60%';
    palabraPersonalizada.focus();
}

function quitarCajaPalabraPersonalizada() {
    contenedorPalabraPersonalizada.style.top = '-40%';
    palabraPersonalizada.value = '';
    lista.innerHTML = '';
}

function agregarPalabraPersonalizada() {
    comprobarPalabraPersonalizada();
    if (errores.length == 0) {
        let palabraParaAgregar = palabraPersonalizada.value;
        listaDePalabrasSecretas.push(palabraParaAgregar.toUpperCase());
        palabraPersonalizada.value = '';
        palabraPersonalizada.focus();
        let lista = document.getElementById('texto-informacion-auxiliar');
        lista.innerHTML = '';
        let li = document.createElement('li');
        li.innerHTML = 'La palabra se agrego correcramente!';
        li.classList.add('texto-correcto');
        lista.appendChild(li);
    } else {
        crearErrores(errores);
        palabraPersonalizada.focus;
    }
    errores = [];
}

function volverAlInicio() {
    contenedorInicio.style.display = 'flex';
    contenedorJuego.style.display = 'none';
    reinicioSuave();
}

botonIniciarJuego.onclick = iniciarJuego;
botonAgregarPalabra.onclick = mostrarCajaPalabraPersonalizada;
botonCancelar.onclick = quitarCajaPalabraPersonalizada;
botonAceptar.onclick = agregarPalabraPersonalizada;
botonRetroceder.onclick = volverAlInicio;