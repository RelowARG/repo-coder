// simulador.js

// Selección de elementos del DOM
const form = document.getElementById("formulario");
const tabla = document.getElementById("tabla-body");
const mensaje = document.getElementById("mensaje");
let registros = JSON.parse(localStorage.getItem("registros")) || [];

// Función para calcular impuestos
function calcularImpuestos(neto, iva) {
    const ivaCalculado = neto * (iva / 100);
    const iibb = neto * 0.035;
    const impTransf = neto * 0.023;
    const impGanancias = neto * 0.15;
    const totalImpuestos = ivaCalculado + iibb + impTransf + impGanancias;
    return { ivaCalculado, iibb, impTransf, impGanancias, totalImpuestos };
}

// Función para actualizar la tabla
function actualizarTabla() {
    tabla.innerHTML = "";
    registros.forEach((registro, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${registro.fecha}</td>
            <td>${registro.cliente}</td>
            <td>${registro.factura}</td>
            <td>$${registro.neto}</td>
            <td>${registro.iva}%</td>
            <td>$${registro.ivaCalculado.toFixed(2)}</td>
            <td>$${registro.total.toFixed(2)}</td>
            <td>$${registro.iibb.toFixed(2)}</td>
            <td>$${registro.impTransf.toFixed(2)}</td>
            <td>$${registro.impGanancias.toFixed(2)}</td>
            <td>$${registro.totalImpuestos.toFixed(2)}</td>
            <td>
                <button class='btn-eliminar' data-index='${index}'>❌</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
    localStorage.setItem("registros", JSON.stringify(registros));
}

// Función para mostrar mensaje en pantalla
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
    setTimeout(() => mensaje.textContent = "", 3000);
}

// Evento para manejar el envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const fecha = form.fecha.value;
    const cliente = form.cliente.value;
    const factura = form.factura.value;
    const neto = parseFloat(form.neto.value);
    const iva = parseFloat(form.iva.value);
    
    if (!fecha || !cliente || !factura || isNaN(neto) || isNaN(iva)) {
        mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }
    
    const impuestos = calcularImpuestos(neto, iva);
    const total = neto + impuestos.totalImpuestos;
    
    registros.push({ fecha, cliente, factura, neto, iva, ...impuestos, total });
    actualizarTabla();
    form.reset();
    mostrarMensaje("Registro agregado correctamente", "success");
});

// Evento para eliminar un registro
tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;
        registros.splice(index, 1);
        actualizarTabla();
        mostrarMensaje("Registro eliminado", "warning");
    }
});

// Cargar registros al iniciar
actualizarTabla();
