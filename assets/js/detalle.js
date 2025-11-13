const detalleContainer = document.getElementById('game-detail');
const BACKEND_URL = 'http://localhost:3000/api/juegos';

if (!detalleContainer) {
    console.warn('No se encontró #game-detail en el DOM.');
}

function getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function formatDate(iso) {
    if (!iso) return '—';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return iso;
    }
}

async function fetchGameDetails(gameId) {
    if (!detalleContainer) return;
    if (!gameId) {
        detalleContainer.innerHTML = '<div class="detail-error"><h2>Error: ID de juego no especificado.</h2></div>';
        return;
    }

    detalleContainer.innerHTML = `
        <div class="detail-skeleton">
            <div class="img-skel"></div>
            <div class="info-skel">
                <div class="line short"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line half"></div>
            </div>
        </div>
    `;

    try {
        const response = await fetch(`${BACKEND_URL}/${gameId}`);
        if (!response.ok) {
            if (response.status === 404) {
                detalleContainer.innerHTML = `<div class="detail-error"><h2>Juego con ID ${gameId} no encontrado.</h2></div>`;
                return;
            }
            throw new Error(`HTTP ${response.status}`);
        }

        const juego = await response.json();
        renderGameDetails(juego);
        aplicarAnimacionDetalle();
    } catch (error) {
        console.error("Error al obtener detalles:", error);
        detalleContainer.innerHTML = '<div class="detail-error"><h2>Error de conexión con el servidor.</h2><p>Revisa tu API (node server.js).</p></div>';
    }
}

function renderGameDetails(juego) {
    if (!detalleContainer) return;

    document.title = juego.titulo || 'Detalle';

    const deck = juego.deck || '';
    const descripcion = juego.descripcion || 'ERROR: Description not available.';
    const plataformas = juego.plataforma_principal || 'Desconocida';
    const fecha = formatDate(juego.fecha_lanzamiento || juego.release_date);
    const genero = juego.genero || juego.tags?.join(', ') || '—';
    const desarrollador = juego.desarrollador || juego.developer || '—';
    const puntuacion = juego.rating ?? juego.score ?? '—';

    let pcStoresHtml = '';
    let mobileStoresHtml = ''; 
    let repacksHtml = ''; 
    let directDownloadsHtml = ''; 
    let romsHtml = ''; 

    if (juego.titulo) {
        const encodedTitle = encodeURIComponent(juego.titulo);
        const steamUrl = `https://store.steampowered.com/search/?term=${encodedTitle}`;
        const epicUrl = `https://store.epicgames.com/es-ES/browse?q=${encodedTitle}`;
        const gogUrl = `https://www.gog.com/en/games?query=${encodedTitle}`;

        const playStoreUrl = `https://play.google.com/store/search?q=${encodedTitle}`;
        const appStoreUrl = `https://www.apple.com/es/search/?q=${encodedTitle}`;

        const fitgirlUrl = `https://fitgirl-repacks.site/?s=${encodedTitle}`;
        const dodiUrl = `https://dodi-repacks.site/?s=${encodedTitle}`;

        const steamripUrl = `https://steamrip.com/?s=${encodedTitle}`;
        const ankergamesUrl = `https://ankergames.net/games-list`; 
        const goggamesUrl = `https://gog-games.to/?search=${encodedTitle}`;

        const vimmUrl = `https://vimm.net/vault/?p=list&q=${encodedTitle}`;
        const crocdbUrl = `https://crocdb.net/search/?title=${encodedTitle}`;

        pcStoresHtml = `
            <a href="${steamUrl}" target="_blank" rel="noopener" class="detail-link-btn">Steam</a>
            <a href="${epicUrl}" target="_blank" rel="noopener" class="detail-link-btn">Epic Games</a>
            <a href="${gogUrl}" target="_blank" rel="noopener" class="detail-link-btn">GOG</a>
        `;
        mobileStoresHtml = `
            <a href="${playStoreUrl}" target="_blank" rel="noopener" class="detail-link-btn">Play Store</a>
            <a href="${appStoreUrl}" target="_blank" rel="noopener" class="detail-link-btn">App Store</a>
        `;
        repacksHtml = `
            <a href="${fitgirlUrl}" target="_blank" rel="noopener" class="detail-link-btn">Fitgirl Repacks</a>
            <a href="${dodiUrl}" target="_blank" rel="noopener" class="detail-link-btn">DODI Repacks</a>
        `;
        directDownloadsHtml = `
            <a href="${steamripUrl}" target="_blank" rel="noopener" class="detail-link-btn">SteamRIP</a>
            <a href="${ankergamesUrl}" target="_blank" rel="noopener" class="detail-link-btn">Ankergames</a>
            <a href="${goggamesUrl}" target="_blank" rel="noopener" class="detail-link-btn">GOGgames</a>
        `;
        romsHtml = `
            <a href="${vimmUrl}" target="_blank" rel="noopener" class="detail-link-btn">Vimm's Lair</a>
            <a href="${crocdbUrl}" target="_blank" rel="noopener" class="detail-link-btn">CrocDB</a>
        `;
    } else {
        pcStoresHtml = '<span class="no-links">Game title not available.</span>';
        mobileStoresHtml = '<span class="no-links">Game title not available.</span>';
        repacksHtml = '<span class="no-links">Game title not available.</span>';
        directDownloadsHtml = '<span class="no-links">Game title not available.</span>';
        romsHtml = '<span class="no-links">Game title not available.</span>';
    }

    detalleContainer.innerHTML = `
        <div class="detail-container">
            <a class="back-btn" href="index.html" aria-label="Volver">← Volver</a>
 
            <div class="detail-grid">
                <div class="media">
                    <img src="${juego.image_url || 'assets/images/placeholder.jpg'}" alt="Imagen de ${escapeHtml(juego.titulo)}" class="game-image" loading="lazy">
                </div>

                <div class="info">
                    <h1 class="game-title">${escapeHtml(juego.titulo)}</h1>
                    <p class="game-deck">${escapeHtml(deck)}</p>

                    <div class="game-meta">
                        <span class="meta-item"><strong>Platforms:</strong> ${escapeHtml(plataformas)}</span>
                        <span class="meta-item"><strong>Release Date:</strong> ${escapeHtml(fecha)}</span>
                        <span class="meta-item"><strong>Developer:</strong> ${escapeHtml(desarrollador)}</span> 
                    </div>

                    <hr class="section-separator">

                    <!-- Eliminada la descripción larga, solo se muestra el deck (descripción corta) -->
                    <h3 class="links-title">PC Stores</h3>
                    <div class="links-detail-container">
                        ${pcStoresHtml}
                    </div>

                    <h3 class="links-title">Mobile Stores</h3> 
                    <div class="links-detail-container">
                        ${mobileStoresHtml}
                    </div>

                    <h3 class="links-title">Repacks</h3>
                    <div class="links-detail-container">
                        ${repacksHtml}
                    </div>

                    <h3 class="links-title">Direct Downloads</h3>
                    <div class="links-detail-container">
                        ${directDownloadsHtml}
                    </div>

                    <h3 class="links-title">Roms</h3>
                    <div class="links-detail-container">
                        ${romsHtml}
                    </div> 
                </div>
            </div>

        </div>
    `;
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function aplicarAnimacionDetalle() {
    if (window.gsap) {
        try {
            gsap.from(".detail-container .media img", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
            gsap.from(".detail-container .info > *", { opacity: 0, y: 20, duration: 0.6, stagger: 0.08, delay: 0.12, ease: "power2.out" });
        } catch (e) {
            console.warn('GSAP anim error', e);
        }
    }
}

fetchGameDetails(getGameIdFromUrl());