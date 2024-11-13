import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const apiKey = 'ce529d6a7e8e4650a916d6b772f637c6';

// Função para converter de graus para radianos
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

// Função para calcular a distância entre dois pontos (lat1, lon1) e (lat2, lon2)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Função para buscar coordenadas
async function obterCoordenadas(endereco) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(endereco)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lon: lng };
    }
    throw new Error("Endereço não encontrado");
}

// Rota para calcular distância e frete
app.post('/calcular-distancia', async (req, res) => {
    try {
        const { endereco1, endereco2, peso } = req.body;
        const coordenadas1 = await obterCoordenadas(endereco1);
        const coordenadas2 = await obterCoordenadas(endereco2);

        const distancia = calcularDistancia(
            coordenadas1.lat, coordenadas1.lon,
            coordenadas2.lat, coordenadas2.lon
        );

        const taxaPorKm = 0.02;  // Taxa de frete por km e por kg
        const frete = distancia * peso * taxaPorKm;

        res.json({ distancia: distancia.toFixed(2), frete: frete.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
