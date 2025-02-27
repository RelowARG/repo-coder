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

// Función para actualizar la tabla con los cálculos
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

    // Muestra los resultados en la tabla
    document.getElementById('colFecha').textContent = document.getElementById('fecha').value;
    document.getElementById('colNroFactura').textContent = document.getElementById('nroFactura').value;
    document.getElementById('colCliente').textContent = document.getElementById('cliente').value;
    document.getElementById('colEstado').textContent = document.getElementById('estado').value;
    document.getElementById('colPago').textContent = document.getElementById('pago').value;
    document.getElementById('colNeto').textContent = valorSinIVA.toFixed(2);
    document.getElementById('colIVA').textContent = ivaCalculado.toFixed(2);
    document.getElementById('colTotal').textContent = total.toFixed(2);
    document.getElementById('colIIBB').textContent = iibb.toFixed(2);
    document.getElementById('colImpTransf').textContent = impTransferencias.toFixed(2);
    document.getElementById('colImpGanancias').textContent = impGanancias.toFixed(2);
    document.getElementById('colImpTotales').textContent = impuestosTotales.toFixed(2);
    document.getElementById('colCostoMercaderia').textContent = costoMercaderia.toFixed(2);
    document.getElementById('colGanancia').textContent = ganancia.toFixed(2);
}

// Llama a la función pedirDatos al cargar la página
window.onload = function() {
    pedirDatos();
    document.getElementById('calcularBtn').addEventListener('click', confirmarCalculo);
};
