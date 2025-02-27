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

    // Guarda los resultados en un objeto para almacenarlos en el localStorage
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
        ganancia: ganancia.toFixed(2),
    };

    // Recuperar los registros del localStorage
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);

    // Guardar los registros actualizados en localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    // Llama a la función para actualizar la tabla
    mostrarRegistros();
}

// Función para mostrar los registros almacenados en la tabla
function mostrarRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let tablaBody = document.querySelector("#tablaResultados tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos datos

    registros.forEach((registro, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${registro.fecha}</td>
            <td>${registro.nroFactura}</td>
            <td>${registro.cliente}</td>
            <td>${registro.estado}</td>
            <td>${registro.pago}</td>
            <td>${registro.neto}</td>
            <td>${registro.iva}</td>
            <td>${registro.total}</td>
            <td>${registro.iibb}</td>
            <td>${registro.impTransferencias}</td>
            <td>${registro.impGanancias}</td>
            <td>${registro.impuestosTotales}</td>
            <td>${registro.costoMercaderia}</td>
            <td>${registro.ganancia}</td>
            <td><button onclick="editarRegistro(${index})">Editar</button></td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Función para editar un registro de la tabla
function editarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let registro = registros[index];

    // Pre-llenar los campos con los datos del registro
    document.getElementById('fecha').value = registro.fecha;
    document.getElementById('nroFactura').value = registro.nroFactura;
    document.getElementById('cliente').value = registro.cliente;
    document.getElementById('estado').value = registro.estado;
    document.getElementById('pago').value = registro.pago;
    document.getElementById('neto').value = registro.neto;
    document.getElementById('iva').value = registro.iva;
    document.getElementById('costoMercaderia').value = registro.costoMercaderia;

    // Eliminar el registro original del localStorage
    registros.splice(index, 1);
    localStorage.setItem("registros", JSON.stringify(registros));

    // Llamar a la función para actualizar la tabla
    mostrarRegistros();
}

// Función para limpiar el localStorage y la tabla
function limpiarDatos() {
    localStorage.removeItem("registros");
    mostrarRegistros(); // Limpiar la tabla visualmente
}

// Llama a la función pedirDatos al cargar la página
window.onload = function() {
    pedirDatos();
    mostrarRegistros(); // Mostrar los registros al cargar la página

    // Agregar evento para el botón de cálculo
    document.getElementById('calcularBtn').addEventListener('click', confirmarCalculo);

    // Agregar evento para el botón de limpiar
    document.getElementById('limpiarBtn').addEventListener('click', limpiarDatos);
};
