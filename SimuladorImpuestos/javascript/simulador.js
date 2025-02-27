// Array para almacenar los registros
let registros = [];

// Función para pedir el nombre del usuario con Prompt
function pedirDatos() {
    let usuario = prompt("¿Quién está utilizando el simulador?", "Nombre del usuario");
    if (usuario) {
        alert(`Bienvenido/a, ${usuario}!`);
    } else {
        alert("No se ingresó un nombre. El simulador no podrá continuar.");
    }
}

// Función para pedir confirmación antes de calcular los impuestos
function confirmarCalculo() {
    let confirmar = confirm("¿Estás seguro de que quieres realizar el cálculo?");
    if (confirmar) {
        // Llama a la función de cálculo
        actualizarTabla();
    } else {
        alert("El cálculo ha sido cancelado.");
    }
}

// Función para actualizar la tabla con los cálculos y almacenar los datos en el array
function actualizarTabla() {
    // Obtiene los valores de las variables
    let valorSinIVA = parseFloat(document.getElementById('neto').value) || 0;
    let ivaPorcentaje = parseFloat(document.getElementById('iva').value) / 100;
    let costoMercaderia = parseFloat(document.getElementById('costoMercaderia').value) || 0;

    // Si no hay un valor para "neto", muestra un alerta y sale de la función
    if (valorSinIVA <= 0) {
        alert("Por favor ingresa un valor para 'Neto' antes de calcular.");
        return;
    }

    // Calcula los impuestos y valores totales
    let ivaCalculado = valorSinIVA * ivaPorcentaje;
    let total = valorSinIVA + ivaCalculado;
    let iibb = valorSinIVA * 0.035;
    let impTransferencias = valorSinIVA * 0.023;
    let impGanancias = valorSinIVA * 0.15;
    let impuestosTotales = iibb + impTransferencias + impGanancias;

    // Calcula la ganancia
    let ganancia = valorSinIVA - impuestosTotales - costoMercaderia;

    // Crea un objeto con los datos y los cálculos
    let registro = {
        fecha: document.getElementById('fecha').value,
        nroFactura: document.getElementById('nroFactura').value,
        cliente: document.getElementById('cliente').value,
        estado: document.getElementById('estado').value,
        pago: document.getElementById('pago').value,
        neto: valorSinIVA.toFixed(2),
        iva: ivaCalculado.toFixed(2),
        total: total.toFixed(2),
        iibb: iibb.toFixed(2),
        impTransferencias: impTransferencias.toFixed(2),
        impGanancias: impGanancias.toFixed(2),
        impuestosTotales: impuestosTotales.toFixed(2),
        costoMercaderia: costoMercaderia.toFixed(2),
        ganancia: ganancia.toFixed(2)
    };

    // Agrega el objeto al array de registros
    registros.push(registro);

    // Llama a la función para mostrar los registros en la tabla
    mostrarRegistros();
}

// Función para mostrar los registros en la tabla
function mostrarRegistros() {
    let tbody = document.querySelector("#tablaResultados tbody");
    tbody.innerHTML = ''; // Limpia la tabla antes de mostrar los nuevos registros

    registros.forEach(registro => {
        let tr = document.createElement("tr");

        // Crea una fila con los datos del registro
        Object.values(registro).forEach(valor => {
            let td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        // Añade la fila a la tabla
        tbody.appendChild(tr);
    });
}

// Llama a la función pedirDatos al cargar la página
window.onload = function() {
    pedirDatos();
    document.getElementById('calcularBtn').addEventListener('click', confirmarCalculo);
};
