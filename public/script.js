// script.js

// Función para manejar la generación del QR
document.getElementById('generateForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const artworkId = document.getElementById('artworkId').value;
  const artworkName = document.getElementById('artworkName').value;

  if (!artworkId || !artworkName) {
    alert('Please enter both artwork ID and name.');
    return;
  }

  try {
    const response = await fetch('https://qr-unid-production.up.railway.app/generate-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        artworkId,
        artworkName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('qrCode').src = data.qrCode;
      document.getElementById('qrCodeContainer').style.display = 'block';
    } else {
      alert(data.error || 'Error generating QR code.');
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
    alert('Error generating QR code.');
  }
});



// Esta función se ejecuta cuando se carga la página de detalles de la obra
window.onload = async () => {
    const artworkId = window.location.pathname.split('/').pop();  // Obtener el ID de la obra desde la URL
  
    try {
      const response = await fetch(`https://qr-unid-production.up.railway.app/artwork/${artworkId}`);
      const artworkData = await response.json();
  
      if (response.ok) {
        // Mostrar los detalles de la obra
        document.getElementById('artworkName').innerText = artworkData.name;
        document.getElementById('artworkDescription').innerText = artworkData.description;
        
        // Mostrar la imagen de la obra
        const artworkImage = document.getElementById('artworkImage');
        artworkImage.src = artworkData.imageUrl;  // Asignar la URL de la imagen
        artworkImage.style.display = 'block';  // Hacer visible la imagen
      } else {
        document.getElementById('artworkInfo').innerText = 'Artwork not found';
      }
    } catch (error) {
      console.error('Error fetching artwork:', error);
      document.getElementById('artworkInfo').innerText = 'Error loading artwork details';
    }
  };
  
