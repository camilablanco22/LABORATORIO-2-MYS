const probabilidadesAcumuladas = [
    0.027, 0.054, 0.081, 0.108, 0.135, 0.162, 0.189, 0.216, 0.243, 0.27,
    0.297, 0.324, 0.351, 0.378, 0.405, 0.432, 0.459, 0.486, 0.513, 0.54,
    0.567, 0.594, 0.621, 0.648, 0.675, 0.702, 0.729, 0.756, 0.783, 0.81,
    0.837, 0.864, 0.891, 0.918, 0.945, 0.972, 0.999
];

let s0 = Number((Math.random() * 10).toFixed(3)); //genera un numero entre 0 y 10
let s1 = Number((Math.random() * 10).toFixed(3));
let s2 = Number((Math.random() * 10).toFixed(3));

function itamaraca() { //genera el numero pseudo-aleatorio.
    let pn = Math.abs(s2 - s0);
    let frns = Math.abs(10 - (pn * 1.97));
    let u = parseFloat((frns / 10).toFixed(3));
    s0 = s1;
    s1 = s2;
    s2 = frns;
    console.log(u);
    return u;
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
            console.log(i);
            console.log(probabilidadesAcumuladas[i]);
            return i;  // Número ganador
        }
    }
    return 36;  // Si llega aquí, es el último número (36)
}

function esPar(numero) {
    let par = false;
    if(numero % 2 === 0){
        par = true;
    }
    return par;
}

function simular_juego(){
    let tiempo_juego = 0
    let cantidad_jugadas_por_hora = 0;
    let radios = document.getElementsByName('numero_par_impar');
    let contador_par = 0;
    let contador_impar=0;
    let numeroGanadorPar = false;
    let numeroGanador = 0;
    let numeroEsperadoDeVictorias = 0;
    let tipoNumero;

    while (tiempo_juego <= 60){
        numeroGanador = numero_ganador();
        console.log(numeroGanador);
        if(numeroGanador != 0){
            numeroGanadorPar = esPar(numeroGanador);
            console.log(numeroGanadorPar);
            for(let radio of radios){
                if(radio.checked){
                    console.log(radio.getAttribute('id'));
                    if(radio.getAttribute('id') == 'numero_par' && numeroGanadorPar == true){    
                        contador_par ++;
                        tipoNumero = "par";
                    }else if(radio.getAttribute('id') == 'numero_impar' && numeroGanadorPar == false){
                        contador_impar ++;
                        tipoNumero = "impar";
                    }
                }
            }
            tiempo_juego += tiempo_tirada();
            cantidad_jugadas_por_hora ++;
        }else{
            tiempo_juego += tiempo_tirada();
            cantidad_jugadas_por_hora ++;
            continue;
        }
    }

    console.log(cantidad_jugadas_por_hora);
    console.log(numeroEsperadoDeVictorias);

    numeroEsperadoDeVictorias = cantidad_jugadas_por_hora * 0.4865; //0,4865 es la probabilidad de que salga un numero par o impar.

    document.getElementById('resultado').textContent =
            `Ganaste apostando a un número ${tipoNumero} después de aproximadamente ${tiempo_juego.toFixed(2)} minutos, ` 
            +
            `lo que serían ${(tiempo_juego/60).toFixed(2)} horas. `
            +
            `Ganaste una cantidad de ${Math.round(numeroEsperadoDeVictorias)} veces `
            +
            `despues de ${cantidad_jugadas_por_hora} jugadas.`
}

