const probabilidadesAcumuladas = [
    0.027, 0.054, 0.081, 0.108, 0.135, 0.162, 0.189, 0.216, 0.243, 0.27,
    0.297, 0.324, 0.351, 0.378, 0.405, 0.432, 0.459, 0.486, 0.513, 0.54,
    0.567, 0.594, 0.621, 0.648, 0.675, 0.702, 0.729, 0.756, 0.783, 0.81,
    0.837, 0.864, 0.891, 0.918, 0.945, 0.972, 0.999
];

let s0 = Number((Math.random() * 10).toFixed(3));
let s1 = Number((Math.random() * 10).toFixed(3));
let s2 = Number((Math.random() * 10).toFixed(3));

function itamaraca() {
    let pn = Math.abs(s2 - s0);
    let frns = Math.abs(10 - (pn * 1.97));
    let u = parseFloat((frns / 10).toFixed(3));
    s0 = s1;
    s1 = s2;
    s2 = frns;
    return u;
}

function generarNumeroGanador() {
    const u = itamaraca();
    for (let i = 0; i < probabilidadesAcumuladas.length; i++) {
        if (u <= probabilidadesAcumuladas[i]) {
            return i;
        }
    }
    return 36;
}

function calcularTiempo() {
    const u = itamaraca();
    // Aseguramos que u sea mayor que 0 para evitar logaritmo de 0 o negativo
    if (u <= 0) {
        u = 0.001;  
    }
    return -5 * Math.log(u);
}

function agregarFilaTabla(intentos, numeroGanador, tiempoTirada, perdidaAcumulada) {
    const tabla = document.getElementById("tablaResultados").getElementsByTagName("tbody")[0];
    let nuevaFila = tabla.insertRow();

    let celdaIntento = nuevaFila.insertCell(0);
    let celdaNumero = nuevaFila.insertCell(1);
    let celdaTiempo = nuevaFila.insertCell(2);
    let celdaPerdida = nuevaFila.insertCell(3);

    celdaIntento.textContent = intentos;
    celdaNumero.textContent = numeroGanador;
    celdaTiempo.textContent = tiempoTirada.toFixed(2);
    celdaPerdida.textContent = `$${perdidaAcumulada.toFixed(2)}`;
}

function simularJuego() {
    const numeroUsuario = parseInt(document.getElementById("numeroUsuario").value);
    const valorApuesta = parseFloat(document.getElementById("valorApuesta").value);
    document.getElementById("resultado").textContent = "";

    if (isNaN(numeroUsuario) || numeroUsuario < 0 || numeroUsuario > 36 || isNaN(valorApuesta) || valorApuesta <= 0) {
        document.getElementById("resultado").textContent = "Por favor, ingrese un número válido entre 0 y 36 y un valor de apuesta positivo.";
        return;
    }

    const tabla = document.getElementById("tablaResultados").getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";

    let tiempoTotal = 0;
    let intentos = 0;
    let numeroGanador = null;
    let perdidaAcumulada = 0;
    const pagoPorVictoria = valorApuesta * 36;

    while (numeroGanador !== numeroUsuario) {
        numeroGanador = generarNumeroGanador();
        const tiempoTirada = calcularTiempo();
        tiempoTotal += tiempoTirada;
        intentos++;
        perdidaAcumulada += valorApuesta;
        agregarFilaTabla(intentos, numeroGanador, tiempoTirada, perdidaAcumulada);
    }

// Cálculo del balance final
const gananciaTotal = pagoPorVictoria - perdidaAcumulada;
const resultadoFinal = gananciaTotal >= 0 ? "ganaste" : "perdiste";
const balanceMensaje = gananciaTotal >= 0 ? "Ganaste dinero." : "Perdiste dinero.";

// Mostrar el resultado final
document.getElementById("resultado").textContent =
    `Ganaste apostando al número ${numeroUsuario} después de ${intentos} intentos. ` +
    `El tiempo total transcurrido fue de aproximadamente ${tiempoTotal.toFixed(2)} minutos. Equivalente a ${(tiempoTotal/60).toFixed(2)} horas.` +
    `Has perdido un total de $${perdidaAcumulada.toFixed(2)} y ganaste $${pagoPorVictoria.toFixed(2)}. ` +
    `El balance total es $${gananciaTotal.toFixed(2)}. En resumen, ${balanceMensaje}`;
}