// Selección de elementos del DOM
const form = document.getElementById("formulario");
const tabla = document.getElementById("tablaResultados").querySelector("tbody");
const calcularBtn = document.getElementById("calcularBtn");
const limpiarBtn = document.getElementById("limpiarBtn");

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

// Función para mostrar mensaje con SweetAlert2
function mostrarMensaje(texto, tipo) {
    let icon;
    switch (tipo) {
        case "success": icon = "success"; break;
        case "error": icon = "error"; break;
        case "warning": icon = "warning"; break;
        default: icon = "info";
    }

    Swal.fire({
        icon: icon,
        title: texto,
        timer: 2000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    });
}

// Función para actualizar la tabla
function actualizarTabla() {
    tabla.innerHTML = "";
    registros.forEach((registro, index) => {
        const ganancia = registro.total - registro.totalImpuestos - (registro.costoMercaderia || 0);

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${registro.fecha}</td>
            <td>${registro.factura}</td>
            <td>${registro.cliente}</td>
            <td>${registro.estado}</td>
            <td>${registro.pago}</td>
            <td>$${registro.neto.toFixed(2)}</td>
            <td>${registro.iva}%<br>($${registro.ivaCalculado.toFixed(2)})</td>
            <td>$${registro.total.toFixed(2)}</td>
            <td>$${registro.iibb.toFixed(2)}</td>
            <td>$${registro.impTransf.toFixed(2)}</td>
            <td>$${registro.impGanancias.toFixed(2)}</td>
            <td>$${registro.totalImpuestos.toFixed(2)}</td>
            <td>$${(registro.costoMercaderia || 0).toFixed(2)}</td>
            <td>$${ganancia.toFixed(2)}</td>
            <td><button class='btn-eliminar' data-index='${index}'>❌</button></td>
        `;
        tabla.appendChild(fila);
    });
    localStorage.setItem("registros", JSON.stringify(registros));
}

// Evento botón calcular
calcularBtn.addEventListener("click", () => {
    const fecha = document.getElementById("fecha").value;
    const factura = document.getElementById("nroFactura").value;
    const cliente = document.getElementById("cliente").value;
    const estado = document.getElementById("estado").value;
    const pago = document.getElementById("pago").value;
    const neto = parseFloat(document.getElementById("neto").value);
    const iva = parseFloat(document.getElementById("iva").value);
    const costoMercaderia = parseFloat(document.getElementById("costoMercaderia").value);

    if (!fecha || !factura || !cliente || isNaN(neto) || isNaN(iva)) {
        mostrarMensaje("Todos los campos obligatorios deben estar completos", "error");
        return;
    }

    const impuestos = calcularImpuestos(neto, iva);
    const total = neto + impuestos.totalImpuestos;

    registros.push({
        fecha, factura, cliente, estado, pago, neto, iva,
        costoMercaderia: isNaN(costoMercaderia) ? 0 : costoMercaderia,
        ...impuestos,
        total
    });

    actualizarTabla();
    mostrarMensaje("Registro agregado correctamente", "success");
    document.getElementById("formulario").reset();
});

// Evento eliminar registro
tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;
        registros.splice(index, 1);
        actualizarTabla();
        mostrarMensaje("Registro eliminado", "warning");
    }
});

// Botón limpiar formulario
limpiarBtn.addEventListener("click", () => {
    document.getElementById("formulario").reset();
});

// Precargar datos desde JSON si no hay registros en localStorage
if (!localStorage.getItem("registros")) {
    fetch("./javascript/registros.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(registro => {
                const impuestos = calcularImpuestos(registro.neto, registro.iva);
                const total = registro.neto + impuestos.totalImpuestos;
                registros.push({
                    ...registro,
                    ...impuestos,
                    total
                });
            });
            actualizarTabla();
        })
        .catch(error => console.error("Error cargando datos iniciales:", error));
} else {
    actualizarTabla();
}
