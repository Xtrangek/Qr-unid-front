document.addEventListener('DOMContentLoaded', function () {
    // Extraer el ID de la obra desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('artworkId');

    if (artworkId) {
        fetchArtworkData(artworkId);
    } else {
        document.getElementById('artwork-details').innerHTML = '<p>No se ha encontrado ID de obra.</p>';
    }
});

async function fetchArtworkData(artworkId) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/artwork/${artworkId}`);
        
        if (response.ok) {
            const artwork = await response.json();
            displayArtworkDetails(artwork);
        } else {
            document.getElementById('artwork-details').innerHTML = '<p>No se pudo encontrar la obra de arte.</p>';
        }
    } catch (error) {
        console.error('Error fetching artwork:', error);
        document.getElementById('artwork-details').innerHTML = '<p>Error al cargar los datos.</p>';
    }
}

function displayArtworkDetails(artwork) {
    const detailsContainer = document.getElementById('artwork-details');
    detailsContainer.innerHTML = `
        <h2>${artwork.name}</h2>
        <p><strong>Descripción:</strong> ${artwork.description}</p>
        <p><strong>Artista:</strong> ${artwork.artist}</p>
    `;
}
