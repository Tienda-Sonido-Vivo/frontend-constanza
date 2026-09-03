/* =========================================================
   SCRIPT PERSONALIZADO - CONFIRMACIÓN DE PEDIDO
   ========================================================= */

/**
 * Función para descargar el comprobante del pedido en PDF
 */
function descargarComprobante() {
  alert(
    "Comprobante descargado:\nSonido_Vivo_Pedido_SV-2026-001234.pdf"
  );

  // En producción, aquí se generaría un PDF real con:
  // - fetch() a /api/pedidos/SV-2026-001234/comprobante
  // - O usar librería como jsPDF/PDFKit
  // - Descargar archivo automáticamente
}

/**
 * Función para enviar correo de confirmación (simulado)
 */
function reenviarcorreoConfirmacion() {
  alert(
    "Correo de confirmación reenviado a juan@ejemplo.com"
  );

  // En producción:
  // fetch('/api/pedidos/SV-2026-001234/reenviar-correo', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' }
  // })
}

/**
 * Función para copiar número de pedido al portapapeles
 */
function copiarNumeroPedido() {
  const numeroPedido = "#SV-2026-001234";
  navigator.clipboard.writeText(numeroPedido).then(() => {
    alert("Número de pedido copiado: " + numeroPedido);
  });
}

/**
 * Animación de los elementos al cargar la página
 */
document.addEventListener("DOMContentLoaded", function () {
  // Animar timeline items al cargar
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = "fadeInUp 0.6s ease";
    }, index * 200);
  });

  // Reproducir sonido de éxito (opcional)
  // reproducirSonidoExito();

  // Mostrar notificación de éxito
  mostrarNotificacion();
});

/**
 * Función para mostrar notificación de éxito
 */
function mostrarNotificacion() {
  // Crear elemento de notificación
  const notificacion = document.createElement("div");
  notificacion.className =
    "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3";
  notificacion.style.zIndex = "9999";
  notificacion.style.maxWidth = "500px";
  notificacion.innerHTML = `
    <strong>✓ Éxito:</strong> Tu pedido ha sido confirmado y se ha enviado un correo de confirmación.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(notificacion);

  // Remover después de 5 segundos
  setTimeout(() => {
    notificacion.remove();
  }, 5000);
}

/**
 * Función para reproducir sonido de éxito (opcional)
 */
function reproducirSonidoExito() {
  // Crear un oscilador de sonido simple usando Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

/**
 * Función para exportar detalles del pedido a JSON
 */
function exportarDetallesPedido() {
  const detallesPedido = {
    numeroPedido: "#SV-2026-001234",
    fecha: "2026-09-01",
    estado: "Confirmado",
    cliente: {
      nombre: "Juan Pérez García",
      correo: "juan@ejemplo.com",
      telefono: "+56 9 1234 5678",
    },
    entrega: {
      metodo: "Despacho a Domicilio",
      direccion: "Calle Principal 123, Depto 42",
      ciudad: "Viña del Mar",
      region: "Valparaíso",
      codigoPostal: "2520000",
    },
    productos: [
      {
        nombre: "Guitarra Acústica Yamaha",
        cantidad: 1,
        precio: 89990,
      },
      {
        nombre: "Púas de Guitarra (Pack 10)",
        cantidad: 2,
        precio: 5990,
      },
      {
        nombre: "Cable de Guitarra 5m",
        cantidad: 1,
        precio: 12990,
      },
    ],
    totales: {
      subtotal: 108970,
      envio: 8990,
      iva: 20704,
      total: 138664,
    },
    pago: {
      metodo: "Tarjeta de Crédito",
      ultimosDigitos: "3456",
    },
  };

  // Descargar como archivo JSON
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(detallesPedido, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute(
    "download",
    "pedido_SV-2026-001234.json"
  );
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

/**
 * Función para actualizar estado del pedido (simulado)
 */
function actualizarEstadoPedido() {
  // En producción, esto obtendría el estado real de la BD
  const estadoActual = "Confirmado";
  const proximos = ["En Preparación", "Enviado", "Entregado"];

  console.log("Estado actual del pedido: " + estadoActual);
  console.log("Próximos estados: " + proximos.join(" → "));

  // Simular obtención de estado desde API
  // fetch('/api/pedidos/SV-2026-001234')
  //   .then(res => res.json())
  //   .then(data => {
  //     actualizarTimelineUI(data.estado);
  //   });
}

/**
 * Función para actualizar el timeline UI según estado real
 */
function actualizarTimelineUI(nuevoEstado) {
  const estados = ["Confirmado", "Preparación", "Enviado", "Entregado"];
  const indiceEstado = estados.indexOf(nuevoEstado);

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    if (index <= indiceEstado) {
      item.classList.add("activo");
    } else {
      item.classList.remove("activo");
    }
  });
}
