
document.addEventListener('DOMContentLoaded', () => {
  const formContacto = document.getElementById('formContacto');

  if (formContacto) {
    formContacto.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const nombre = document.getElementById('nombreContacto');
      const correo = document.getElementById('correoContacto');
      const mensaje = document.getElementById('mensajeContacto');

      let esValido = true;

      // Validación Nombre: Obligatorio y máx 100 caracteres
      if (!nombre.value.trim() || nombre.value.length > 100) {
        nombre.classList.add('is-invalid');
        esValido = false;
      } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
      }

      // Validación Correo: Formato válido y máx 100 caracteres (opcional o con formato si incluye texto)
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (correo.value.trim() !== '' && (!regexEmail.test(correo.value) || correo.value.length > 100)) {
        correo.classList.add('is-invalid');
        esValido = false;
      } else {
        correo.classList.remove('is-invalid');
        if (correo.value.trim() !== '') correo.classList.add('is-valid');
      }

      // Validación Comentario: Obligatorio y máx 500 caracteres
      if (!mensaje.value.trim() || mensaje.value.length > 500) {
        mensaje.classList.add('is-invalid');
        esValido = false;
      } else {
        mensaje.classList.remove('is-invalid');
        mensaje.classList.add('is-valid');
      }

      // Si todo está correcto
      if (esValido) {
        alert('¡Mensaje enviado exitosamente!');
        formContacto.reset();
        nombre.classList.remove('is-valid');
        correo.classList.remove('is-valid');
        mensaje.classList.remove('is-valid');
      }
    });
  }
});