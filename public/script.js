// Generar el QR al enviar el ID de la obra
async function generateQR() {
    const artworkId = document.getElementById('artworkId').value;
  
    if (!artworkId) {
      alert('Please enter a valid Artwork ID');
      return;
    }
  
    try {
      const response = await fetch('https://qr-unid-production.up.railway.app/generateQR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        document.getElementById('qr-container').innerHTML = `<img src="${data.qrCodeUrl}" alt="QR Code">`;
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error generating QR:', error);
      alert('Error generating QR code');
    }
  }
  
  // Cargar la información de la obra desde la URL
  async function loadArtworkInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('id');
  
    if (artworkId) {
      try {
        const response = await fetch(`https://qr-unid-production.up.railway.app/artwork/${artworkId}`);
        const artwork = await response.json();
        document.getElementById('name').textContent = artwork.name;
        document.getElementById('description').textContent = artwork.description;
        document.getElementById('artwork-image').src = artwork.image_url;
      } catch (error) {
        console.error('Error loading artwork info:', error);
        alert('Error loading artwork info');
      }
    }
  }
  
  // Si estamos en la página de detalles, cargamos la información
  if (window.location.pathname === '/display.html') {
    loadArtworkInfo();
  }
  