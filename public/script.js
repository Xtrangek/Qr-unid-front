// Obtener el formulario y el contenedor para el QR
const form = document.getElementById('generate-qr-form');
const qrContainer = document.getElementById('qr-container');

// Event listener para cuando el formulario se envíe
form.addEventListener('submit', async (event) => {
  event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

  // Obtener los valores del formulario
  const artworkId = document.getElementById('artworkId').value;
  const artworkName = document.getElementById('artworkName').value;

  try {
    // Hacer la solicitud POST al backend para generar el QR
    const response = await fetch('https://qr-unid-production.up.railway.app/generate-qr', {  // Asegúrate de reemplazar con tu URL del backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artworkId, artworkName }),  // Pasar los datos del formulario
    });

    const data = await response.json();  // Obtener la respuesta del backend

    // Verificar si se generó el QR correctamente
    if (data.qrCode) {
      // Mostrar el QR generado en el contenedor
      const qrImage = document.createElement('img');
      qrImage.src = data.qrCode;  // Usar la URL del QR devuelta
      qrContainer.innerHTML = '';  // Limpiar cualquier QR anterior
      qrContainer.appendChild(qrImage);  // Agregar el nuevo QR al contenedor
    } else {
      console.error('Error generando el QR:', data.error);
    }
  } catch (error) {
    console.error('Error al hacer la solicitud al backend:', error);
  }
});
