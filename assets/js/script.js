if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".caja-animada", {
        x: 400,
        rotation: 720,
        duration: 3,
        scrollTrigger: {
            trigger: ".caja-animada",
            start: "top center",
            end: "bottom top",
            scrub: 1,
        }
    });
} else {
    console.error("GSAP no cargó correctamente.");
}


document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const resultadosContainer = document.getElementById('resultados-container');
    const BACKEND_URL = 'http://localhost:3000/api/juegos';
    let buscadorActive = false;
    function generatePlatformInfo(platformString) {
        if (!platformString) return '';

        const iconMap = {
            'pc': 'pc.png',
            'playstation': 'playstation.png',
            'xbox': 'xbox.png',
            'nintendo': 'nintendo.png',
            'mobile': 'androidios.png'
        };

        const platforms = platformString.toLowerCase().split(', ');
        let iconsHtml = '';
        const addedIcons = new Set();
        const specificModels = [];

        platforms.forEach(p => {
            if (p.includes('pc') && !addedIcons.has('pc')) {
                iconsHtml += `<div class="platform-icon" title="PC"><img src="assets/img/platform/${iconMap.pc}" alt="PC icon"></div>`;
                addedIcons.add('pc');
            } else if (p.includes('playstation') && !addedIcons.has('playstation')) {
                iconsHtml += `<div class="platform-icon" title="PlayStation"><img src="assets/img/platform/${iconMap.playstation}" alt="PlayStation icon"></div>`;
                addedIcons.add('playstation');
            } else if (p.includes('xbox') && !addedIcons.has('xbox')) {
                iconsHtml += `<div class="platform-icon" title="Xbox"><img src="assets/img/platform/${iconMap.xbox}" alt="Xbox icon"></div>`;
                addedIcons.add('xbox');
            } else if (p.includes('nintendo') || p.includes('switch')) {
                if (!addedIcons.has('nintendo')) {
                    iconsHtml += `<div class="platform-icon" title="Nintendo"><img src="assets/img/platform/${iconMap.nintendo}" alt="Nintendo icon"></div>`;
                    addedIcons.add('nintendo');
                }
            } else if ((p.includes('ios') || p.includes('android')) && !addedIcons.has('mobile')) {
                iconsHtml += `<div class="platform-icon" title="iOS / Android"><img src="assets/img/platform/${iconMap.mobile}" alt="Mobile icon"></div>`;
                addedIcons.add('mobile');
            }

            if ((p.includes('playstation') || p.includes('xbox') || p.includes('nintendo') || p.includes('switch')) && !p.includes('network') && !p.includes('360 game store')) {
                let modelName = p;

                if (modelName === 'playstation portable') modelName = 'PlayStation Portable';
                else if (modelName === 'playstation vita') modelName = 'PlayStation Vita';
                else if (modelName === 'xbox series x') modelName = 'Xbox Series X';
                else if (modelName === 'xbox series s') modelName = 'Xbox Series S';
                else if (modelName === 'xbox one') modelName = 'Xbox One';
                else if (modelName === 'nintendo switch') modelName = 'Switch';
                else if (modelName === 'nintendo 3ds') modelName = '3DS';
                else if (modelName === 'nintendo ds') modelName = 'DS';
                else if (modelName === 'wii u') modelName = 'Wii U';
                else if (modelName === 'wii') modelName = 'Wii';
                else if (modelName === 'gamecube') modelName = 'GameCube';
                else if (modelName.startsWith('playstation')) modelName = 'PlayStation' + modelName.slice(11);
                else modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

                specificModels.push(modelName);
            }
        });

        const finalModelStrings = [];
        const psModels = specificModels.filter(m => m.startsWith('PlayStation'));
        const xboxModels = specificModels.filter(m => m.startsWith('Xbox'));
        const nintendoModels = specificModels.filter(m => ['Switch', '3DS', 'DS', 'Wii U', 'Wii', 'GameCube'].includes(m));

        if (psModels.length > 0) {
            const psVersions = psModels.map(m => m.replace('PlayStation ', '').trim());
            finalModelStrings.push(`PlayStation ${psVersions.join('/')}`);
        }

        if (xboxModels.length > 0) {
            const xboxVersions = xboxModels.map(m => m.replace('Xbox ', '').trim());
            finalModelStrings.push(`Xbox ${xboxVersions.join('/')}`);
        }

        if (nintendoModels.length > 0) {
            finalModelStrings.push(`Nintendo ${nintendoModels.join('/')}`);
        }

        let modelsHtml = '';
        if (finalModelStrings.length > 0) {
            modelsHtml = `<p class="game-card-models"><strong>Systems:</strong> ${finalModelStrings.join(' | ')}</p>`;
        }

        return `
            <div class="platform-icons">${iconsHtml}</div>
            ${modelsHtml}
        `;
    }

    function formatDateForCard(dateString) {
        if (!dateString || dateString === 'N/A') {
            return 'N/A';
        }
        try {
            const datePart = dateString.split(' ')[0];
            const [year, month, day] = datePart.split('-');

            if (day && month && year) {
                return `${day}/${month}/${year}`;
            }
            return dateString; 
        } catch (error) {
            return dateString; 
        }
    }

    function crearTarjetaJuego(juego) {
        const imagenURL = juego.image_url || 'https://via.placeholder.com/200x200/333/fff?text=Sin+Imagen';
        const platformInfoHtml = generatePlatformInfo(juego.plataforma_principal);
        const fechaLanzamiento = formatDateForCard(juego.fecha_lanzamiento);

        return `
            <div class="game-card-link">
                <div class="game-card" data-id="${juego.id}" data-details-loaded="false">
                    <img src="${imagenURL}" alt="Imagen de ${juego.titulo}" loading="lazy" class="game-card-image">
                    <div class="game-card-content">
                        <h3 class="game-card-title">${juego.titulo}</h3>
                        ${platformInfoHtml}
                        <p class="game-card-release-date"><strong>Release:</strong> ${fechaLanzamiento}</p> 
                        <a href="detalle.html?id=${juego.id}" class="btn-view-details">View Details</a>
                    </div>
                </div>
            </div>
        `;
    }

    function aplicarAnimacionEntrada() {
        if (window.gsap) {
            gsap.from(".game-card", {
                opacity: 0, 
                y: 50,      
                duration: 0.6, 
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }


    async function buscarYMostrar(query) {
        if (!resultadosContainer) return;
        resultadosContainer.innerHTML = '';
        if (!query || query.length < 2) {
            if (buscadorActive) {
                resultadosContainer.innerHTML = '<p class="mensaje-inicio">Escribe al menos dos letras para buscar.</p>';
            } else {
                resultadosContainer.innerHTML = '';
            }
            return;
        }

        try {
            resultadosContainer.innerHTML = '<p class="mensaje-inicio">Cargando resultados...</p>';
            const response = await fetch(`${BACKEND_URL}?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const resultados = await response.json();

            if (!resultados || resultados.length === 0) {
                resultadosContainer.innerHTML = `<p class="mensaje-inicio">No se encontraron juegos para "${query}".</p>`;
                return;
            }

            resultadosContainer.innerHTML = '';
            resultados.forEach(juego => {
                resultadosContainer.insertAdjacentHTML('beforeend', crearTarjetaJuego(juego));
            });

            aplicarAnimacionEntrada();
        } catch (error) {
            console.error("Error en la función buscarYMostrar:", error);
            resultadosContainer.innerHTML = '<p class="mensaje-inicio error">Error de conexión o en la API. Revisa tu servidor Express (node server.js).</p>';
        }
    }


    if (buscador) {
        buscador.addEventListener('focus', () => {
            buscadorActive = true;
            const q = buscador.value.trim();
            if (!q || q.length < 2) {
                if (resultadosContainer) resultadosContainer.innerHTML = '<p class="mensaje-inicio">Escribe al menos dos letras para buscar.</p>';
            }
        });

        buscador.addEventListener('blur', () => {
            const q = buscador.value.trim();
            if (!q || q.length < 2) {
                if (resultadosContainer) resultadosContainer.innerHTML = '';
            }
        });

        buscador.addEventListener('input', (e) => {
            clearTimeout(buscador.timer);
            buscador.timer = setTimeout(() => {
                const query = e.target.value.trim();
                buscarYMostrar(query);
            }, 300);
        });

        if (window.gsap) {
            gsap.from(".search-bar", {
                opacity: 0,
                y: -30,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });
        }
    }


    let slides = Array.from(document.querySelectorAll('.slide'));
    let dots = Array.from(document.querySelectorAll('.dot'));
    const prev = document.querySelector('.nav.prev');
    const next = document.querySelector('.nav.next');
    let current = 0;
    let interval = null;
    const AUTO_MS = 4000;

    function show(index) {
        if (!slides.length) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
        dots.forEach((d, i) => {
            d.classList.toggle('is-active', i === index);
            d.setAttribute('aria-selected', String(i === index));
        });
        current = index;

        try {
            if (window.gsap) {
                const cap = slides[current].querySelector('.caption');
                if (cap) {
                    gsap.fromTo(cap, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 });
                }
            }
        } catch (e) {
            console.warn(e);
        }
    }

    function nextSlide() { show(current + 1); }
    function prevSlide() { show(current - 1); }

    if (next) next.addEventListener('click', () => { nextSlide(); resetAuto(); });
    if (prev) prev.addEventListener('click', () => { prevSlide(); resetAuto(); });

    dots.forEach(d => d.addEventListener('click', (e) => {
        const i = Number(e.currentTarget.dataset.index);
        if (!Number.isNaN(i)) {
            show(i);
            resetAuto();
        }
    }));

    function startAuto() {
        if (interval) return;
        interval = setInterval(nextSlide, AUTO_MS);
    }
    function stopAuto() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    function resetAuto() {
        stopAuto();
        startAuto();
    }

    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.addEventListener('mouseenter', stopAuto);
        gallery.addEventListener('mouseleave', startAuto);
        gallery.addEventListener('touchstart', stopAuto, { passive: true });
        gallery.addEventListener('touchend', startAuto, { passive: true });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { nextSlide(); resetAuto(); }
        if (e.key === 'ArrowLeft')  { prevSlide(); resetAuto(); }
    });

    async function cargarJuegosDestacados() {
        const slidesContainer = document.getElementById('carousel-slides');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!slidesContainer || !dotsContainer) return;

        try {
            const response = await fetch('http://localhost:3000/api/juegos/populares'); 
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const juegos = await response.json();

            if (!juegos || juegos.length === 0) {
                slidesContainer.innerHTML = '<article class="slide is-active"><p class="mensaje-inicio">No se encontraron juegos destacados en este momento.</p></article>';
                return;
            }

            slidesContainer.innerHTML = ''; 
            dotsContainer.innerHTML = ''; 

            juegos.forEach((juego, index) => {
                // Crear la diapositiva
                const slide = document.createElement('article');
                slide.className = 'slide';
                if (index === 0) slide.classList.add('is-active');

                slide.innerHTML = `
                    <a href="detalle.html?id=${juego.id}" class="carousel-link">
                        <img src="${juego.image_url || 'https://via.placeholder.com/1200x600/333/fff?text=Sin+Imagen'}" alt="${juego.titulo}">
                        <div class="caption">
                            <h2>${juego.titulo}</h2>
                        </div>
                    </a>
                `;
                slidesContainer.appendChild(slide);

                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.dataset.index = index;
                dot.setAttribute('role', 'tab');
                dotsContainer.appendChild(dot);
            });

            slides = Array.from(slidesContainer.querySelectorAll('.slide'));
            dots = Array.from(dotsContainer.querySelectorAll('.dot'));
            
            dots.forEach(d => d.addEventListener('click', (e) => {
                const i = Number(e.currentTarget.dataset.index);
                if (!Number.isNaN(i)) {
                    show(i);
                    resetAuto();
                }
            }));

            show(0);
            startAuto();

        } catch (error) {
            console.error('Error al cargar juegos destacados:', error);
            slidesContainer.innerHTML = '<article class="slide is-active"><p class="mensaje-inicio error">No se pudieron cargar los juegos destacados.</p></article>';
        }
    }

    async function cargarJuegosPorGenero() {
        const genreSectionsContainer = document.querySelector('.genre-sections');
        if (!genreSectionsContainer) return;

        try {
            const response = await fetch('http://localhost:3000/api/juegos/generos');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const generos = await response.json();

            genreSectionsContainer.innerHTML = '';

            generos.forEach(categoria => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'genre-category';

                const title = document.createElement('h3');
                title.className = 'genre-title';
                title.textContent = categoria.genero;

                const gridDiv = document.createElement('div');
                gridDiv.className = 'genre-games-grid';

                categoria.juegos.forEach(juego => {
                    gridDiv.innerHTML += `
                        <a href="detalle.html?id=${juego.id}" class="genre-game-card" style="background-image: url('${juego.image_url}')" title="${juego.titulo}">
                            <div class="genre-game-card-title">${juego.titulo}</div>
                        </a>
                    `;
                });

                categoryDiv.appendChild(title);
                categoryDiv.appendChild(gridDiv);
                genreSectionsContainer.appendChild(categoryDiv);
            });
        } catch (error) {
            console.error('Error al cargar juegos por género:', error);
            genreSectionsContainer.innerHTML = '<p class="mensaje-inicio error">No se pudieron cargar las categorías de juegos.</p>';
        }
    }

    cargarJuegosDestacados();
    cargarJuegosPorGenero();
});
