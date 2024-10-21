const numerosRojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const numerosNegro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        
    function obtenerColor(numero) {
        if (numerosRojo.includes(numero)) {
            return "rojo";
        } else if (numerosNegro.includes(numero)) {
            return "negro";
        } else {
            return "verde"; // para el 0
        }
    }

    function simular() {
        const colorSeleccionado = document.getElementById("color").value;
        let contadorColor = 0;
        const tablaTiradas = document.getElementById("tabla-tiradas");
        tablaTiradas.innerHTML = ''; // Limpiar tabla
        let resultadoHTML = "";

        // Simular 25 tiradas
        for (let i = 1; i <= 25; i++) {
            const numero = Math.floor(Math.random() * 37); // Números de 0 a 36
            const color = obtenerColor(numero);

            // Contar cuántas veces salió el color seleccionado
            if (color === colorSeleccionado) {
                contadorColor++;
            }

            // Añadir fila a la tabla
            const fila = `<tr>
                            <td>${i}</td>
                            <td>${numero}</td>
                            <td>${color}</td>
                            </tr>`;
            tablaTiradas.innerHTML += fila;
        }

        resultadoHTML = `El color "${colorSeleccionado}" salió ${contadorColor} veces en 25 tiradas.`;
        document.getElementById("resultado").innerText = resultadoHTML;
    }