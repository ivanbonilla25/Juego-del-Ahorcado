const alfavetoCompleto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let alfaveto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let listaDePalabrasSecretas = ['GATO', 'PERRO', 'GALLINA', 'CABALLO', 'MARIPOSA', 'TIGRE', 'ELEFANTE', 'MARTILLO',
    'TUERCA', 'MANZANA', 'PERA', 'TENEDOR', 'TALADRO', 'CASTILLO', 'FIESTA', 'MEDICO', 'SOGA', 'SILLON', 'PARAGUAS'
];
let letrasElegidas = [];
let palabraSecretaSorteada;
let contenedorPalabraSecreta = document.getElementById('contenedor-palabra-secreta');
let contenedorLetrasNombradas = document.getElementById('contenedor-letras-nombradas');
let cabeza = document.getElementById('cabeza');
let ojos = document.getElementById('contenedor-ojos')
let cuerpo = document.getElementById('cuerpo');
let brazoIzq = document.getElementById('brazo-izq');
let brazoDer = document.getElementById('brazo-der');
let piernaIzq = document.getElementById('pierna-izq');
let piernaDer = document.getElementById('pierna-der');
let mensajeFinal = document.getElementById('mensaje-final');
let contadorHorca = 0;

function sortearPalabraSecreta() {
    let palabra = listaDePalabrasSecretas[Math.floor((Math.random() * listaDePalabrasSecretas.length))];
    palabraSecretaSorteada = Array.from(palabra);
}

function capturarTeclaYEjecutar(evObject) {
    let estado = contenedorJuego.style.display;
    if (estado != 'none' && contadorHorca != 6) {
        let caracter = String.fromCharCode(evObject.which);
        if (comprobarLetraElegida(caracter)) {
            ejecutarEleccion(caracter);
        }
    }
}

function comprobarLetraElegida(caracter) {
    if (alfaveto.includes(caracter)) {
        if (!letrasElegidas.includes(caracter)) {
            return true;
        }
    }
    return false;
}

function ejecutarEleccion(caracter) {
    let caracterElegido = alfaveto.splice(alfaveto.indexOf(caracter), 1);
    letrasElegidas.push(caracterElegido[caracterElegido.length - 1]);
    contenedorLetrasNombradas.innerHTML = contenedorLetrasNombradas.textContent + ' ' + caracterElegido + ' ';
    if (!palabraSecretaSorteada.includes(caracter)) {
        dibujarHorca();
    }
    actualizarPalabraSecreta();
    if (contadorHorca == 6) {
        cancelarEscucha();
        let mensaje = "Fin del juego"
        crearMensajeFinal(mensaje);
    }
    if (palabraSecretaEstaCompleta()) {
        cancelarEscucha();
        let mensaje = "Felicidades ganaste!"
        crearMensajeFinal(mensaje);
    }
}

function dibujarHorca() {
    switch (contadorHorca) {
        case 0:
            cabeza.style.display = 'block';
            contadorHorca++;
            break;
        case 1:
            cuerpo.style.display = 'block';
            contadorHorca++;
            break;
        case 2:
            brazoIzq.style.display = 'block';
            contadorHorca++;
            break;
        case 3:
            brazoDer.style.display = 'block';
            contadorHorca++;
            break;
        case 4:
            piernaIzq.style.display = 'block';
            contadorHorca++;
            break;
        case 5:
            piernaDer.style.display = 'block';
            ojos.style.display = 'block'
            contadorHorca++;
            break;
        default:
            console.log('Error');
    }
}

function reiniciarHorca() {

    cabeza.style.display = 'none';
    cuerpo.style.display = 'none';
    brazoIzq.style.display = 'none';
    brazoDer.style.display = 'none';
    piernaIzq.style.display = 'none';
    piernaDer.style.display = 'none';
    ojos.style.display = 'none'
    contadorHorca = 0;
}

function completarHorca() {
    cabeza.style.display = 'block';
    cuerpo.style.display = 'block';
    brazoIzq.style.display = 'block';
    brazoDer.style.display = 'block';
    piernaIzq.style.display = 'block';
    piernaDer.style.display = 'block';
    contadorHorca = 0;
}

function actualizarPalabraSecreta() {
    let palabraSecreta = [];
    for (i = 0; i < palabraSecretaSorteada.length; i++) {
        if (letrasElegidas.includes(palabraSecretaSorteada[i])) {
            palabraSecreta = palabraSecreta + palabraSecretaSorteada[i] + ' ';
        } else {
            palabraSecreta = palabraSecreta + '_ ';
        }
    }
    contenedorPalabraSecreta.innerHTML = palabraSecreta;
}

function palabraSecretaEstaCompleta() {
    if (!contenedorPalabraSecreta.textContent.includes('_')) {
        return true;
    } else {
        return false;
    }
}

function cancelarEscucha() {
    //document.onkeydown = function() {
    //    return false;
    //}
    return
}

function crearMensajeFinal(mensaje) {
    botonRetroceder.style.display = 'none';
    let divMaster = document.createElement('div');
    let p = document.createElement('p');
    divMaster.setAttribute('id', 'mensaje-final');
    divMaster.appendChild(p);
    p.classList.add('mensaje-fin-juego');
    p.innerHTML = mensaje;
    let div = document.createElement('div');
    div.classList.add('contenedor-botones');
    let botonR = document.createElement('button');
    botonR.setAttribute('id', 'boton-reiniciar');
    botonR.classList.add('boton-en-linea');
    botonR.innerHTML = 'Reiniciar';
    let botonS = document.createElement('button');
    botonS.setAttribute('id', 'boton-salir');
    botonS.classList.add('boton-en-linea');
    botonS.innerHTML = 'Salir';
    div.appendChild(botonR);
    div.appendChild(botonS);
    divMaster.appendChild(div);
    contenedorJuego.appendChild(divMaster);
    let botonReiniciar = document.getElementById('boton-reiniciar');
    let botonSalir = document.getElementById('boton-salir');
    botonReiniciar.onclick = reiniciarJuego;
    botonSalir.onclick = volverAlInicio;
}

function finalizarMensajeFinal() {
    let contenedorMensajeFinal = document.getElementById('mensaje-final');
    contenedorMensajeFinal.style.top = '-40%';
    setTimeout(() => {
        contenedorJuego.removeChild(contenedorMensajeFinal);
    }, 1400);
}

function reiniciar() {
    cancelarEscucha();
    finalizarMensajeFinal();
    alfaveto = alfavetoCompleto.slice();
    letrasElegidas = [];
    reiniciarHorca();
    contenedorLetrasNombradas.innerHTML = '';
    actualizarPalabraSecreta();
    botonRetroceder.style.display = 'block';
}

function reinicioSuave() {
    cancelarEscucha();
    alfaveto = alfavetoCompleto.slice();
    letrasElegidas = [];
    reiniciarHorca();
    contenedorLetrasNombradas.innerHTML = '';
    actualizarPalabraSecreta();
}

function reiniciarJuego() {
    reiniciar();
    arrancarJuego();
}

function arrancarJuego() {
    sortearPalabraSecreta();
    actualizarPalabraSecreta();
    document.onkeydown = capturarTeclaYEjecutar;
}