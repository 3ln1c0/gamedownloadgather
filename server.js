const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const { JUEGOS_DESTACADOS, JUEGOS_POR_GENERO } = require('./assets/js/data');

const app = express();
const PORT = 3000;
const GIANTBOMB_API_KEY = process.env.GIANTBOMB_API_KEY;
const GIANTBOMB_BASE_URL = 'https://www.giantbomb.com/api/search';

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

app.use(cors()); 
app.get('/api/juegos', async (req, res) => {
    const query = req.query.q;

    if (!query || query.length < 2) {
        return res.json([]);
    }

    try {
        const cacheKey = `search:${query}`;
        const cachedResults = cache.get(cacheKey);
        if (cachedResults) {
            console.log(`[CACHE HIT] ${query}`);
            return res.json(cachedResults);
        }

        const searchUrl = `${GIANTBOMB_BASE_URL}?api_key=${GIANTBOMB_API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=game&field_list=name,id,platforms,image,original_release_date`;
        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) {
            throw new Error(`Error al conectar con GiantBomb: ${searchResponse.status}`);
        }
        const searchData = await searchResponse.json();
        const juegosProcesados = searchData.results.map(juego => {
            return {
                id: juego.id,
                titulo: juego.name,
                plataforma_principal: juego.platforms ? juego.platforms.map(p => p.name).join(', ') : 'N/A',
                image_url: juego.image ? juego.image.original_url : juego.image ? juego.image.small_url : 'https://via.placeholder.com/300x200/333/fff?text=Sin+Imagen',
                generos: null,
                desarrollador: null,
                fecha_lanzamiento: juego.original_release_date || 'N/A',
                links: [
                    { plataforma: "Ver en GiantBomb", url: `https://www.giantbomb.com/game/${juego.id}/` }
                ]
            };
        });

        cache.set(cacheKey, juegosProcesados);
        console.log(`[CACHE SET] ${query}`);
        res.json(juegosProcesados);
    } catch (error) {
        console.error('Error en el servidor al buscar juegos:', error);
        res.status(500).json({ error: 'Fallo al buscar en la base de datos externa.' });
    }
});

app.get('/api/juegos/populares', async (req, res) => {
    try {
        const cacheKey = 'juegosPopulares';
        const cachedResults = cache.get(cacheKey);
        if (cachedResults) {
            console.log(`[CACHE HIT] Juegos Populares`);
            return res.json(cachedResults);
        }

        const juegosPopulares = JUEGOS_DESTACADOS;

        cache.set(cacheKey, juegosPopulares);
        console.log(`[CACHE SET] Juegos Populares`);
        res.json(juegosPopulares);
    } catch (error) {
        console.error('Error al obtener juegos populares:', error);
        res.status(500).json({ error: 'Fallo al buscar juegos populares.' });
    }
});

app.get('/api/juegos/generos', (req, res) => {
    res.json(JUEGOS_POR_GENERO);
});

app.get('/api/juegos/:id', async (req, res) => {
    const gameId = req.params.id;
    if (!gameId) {
        return res.status(400).json({ error: 'ID de juego requerido.' });
    }

    try {
        const cacheKey = `gameDetail:${gameId}`;
        const cachedDetails = cache.get(cacheKey);
        if (cachedDetails) {
            console.log(`[CACHE HIT] Detalles ${gameId}`);
            return res.json(cachedDetails);
        }

        const detailUrl = `https://www.giantbomb.com/api/game/3030-${gameId}/?api_key=${GIANTBOMB_API_KEY}&format=json&field_list=name,id,platforms,description,image,site_detail_url,genres,developers,original_release_date,deck,original_game_rating`;
        const gbResponse = await fetch(detailUrl);
        if (!gbResponse.ok) {
            return res.status(gbResponse.status).json({ error: 'Juego no encontrado o error en la API externa.' });
        }

        const data = await gbResponse.json();
        if (!data.results) {
            return res.status(404).json({ error: 'Juego no encontrado.' });
        }

        const juego = data.results;
        const juegoProcesado = {
            id: juego.id,
            titulo: juego.name,
            deck: juego.deck || '',
            plataforma_principal: juego.platforms ? juego.platforms.map(p => p.name).join(', ') : 'N/A',
            descripcion: juego.description ? juego.description.replace(/<[^>]*>?/gm, '') : 'ERROR: Description not found.',
            image_url: juego.image ? juego.image.original_url : 'placeholder.jpg',
            generos: juego.genres ? juego.genres.map(g => g.name).join(', ') : 'N/A',
            desarrollador: juego.developers ? juego.developers.map(d => d.name).join(', ') : 'N/A',
            fecha_lanzamiento: juego.original_release_date || 'N/A',
            rating: juego.original_game_rating || null,
            links: [
                { plataforma: "Steam", url: juego.site_detail_url || '#' },
                { plataforma: "GOG", url: juego.site_detail_url || '#' },
                { plataforma: "Ver en GiantBomb", url: juego.site_detail_url }
            ]
        };
        cache.set(cacheKey, juegoProcesado);
        console.log(`[CACHE SET] Detalles ${gameId}`);
        res.json(juegoProcesado);
    } catch (error) {
        console.error('Error al obtener el detalle del juego:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


app.listen(PORT, () => {
    console.log('Ahora contactando a la API de GiantBomb (con carga de detalles para búsqueda).');
});
