const probabilidadesAcumuladas = [
    0.027, 0.054, 0.081, 0.108, 0.135, 0.162, 0.189, 0.216, 0.243, 0.27,
    0.297, 0.324, 0.351, 0.378, 0.405, 0.432, 0.459, 0.486, 0.513, 0.54,
    0.567, 0.594, 0.621, 0.648, 0.675, 0.702, 0.729, 0.756, 0.783, 0.81,
    0.837, 0.864, 0.891, 0.918, 0.945, 0.972, 0.999
];

let s0= Number((Math.random() * 10).toFixed(3))
let s1= Number((Math.random() * 10).toFixed(3))
let s2= Number((Math.random() * 10).toFixed(3))

function itamaraca(){
    let pn = Math.abs(s2 - s0)
    let frns = Math.abs(10 - (pn * 1.97))
    let u = parseFloat((frns / 10).toFixed(3))
    s0 = s1
    s1 = s2
    s2 = frns
    return u
}


function tiempo_tirada(){
    let u = itamaraca();
    
    // Aseguramos que u sea mayor que 0 para evitar logaritmo de 0 o negativo
    if (u <= 0) {
        u = 0.0001;  
    }
    
    return -5 * Math.log(u);
}


function numero_ganador(){
    const u = itamaraca();  
    for (let i = 0; i < probabilidadesAcumuladas.length; i++) {
        if (u <= probabilidadesAcumuladas[i]) {
            return i;  // Número ganador
        }
    }
    return 36;  // Si llega aquí, es el último número (36)
}

function simular_juego(){
    let tiempo_juego = 0
    let apuesta = parseInt(document.getElementById('numero_apuesta').value);

    while (apuesta != numero_ganador()){
        tiempo_juego += tiempo_tirada() 
    }

    document.getElementById('resultado').textContent =
            `Ganaste apostando al número ${apuesta} después de aproximadamente ${tiempo_juego.toFixed(2)} minutos, ` 
            +
            `lo que serían ${(tiempo_juego/60).toFixed(2)} horas. `

}


