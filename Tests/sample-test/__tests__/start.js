const axios = require('axios');

const API = 'http://3.71.0.11:8080/roulette-api'
async function createPlayer() {
    const response = await axios.post(`${API}/players`);
    return response.data.hashname;
}

async function getChips(player) {
    let config = { headers: { Authorization : player } }
    const response = await axios.get(`${API}/chips`, config);
    return response.data.chips;
}

async function bet(player, chips, uri) {
    let config = { headers: { Authorization : player } }
    let data = { "chips": chips }
    const response = await axios.post(`${API}/bets/${uri}`, data, config);
    return response.data;
}

async function spin(player, number) {
    let config = { headers: { Authorization : player } }
    const response = await axios.post(`${API}/spin/${number}`, {}, config);
    return response.data.chips;
}


describe("Roulette API test ", () => {

    test('the player should lose 10 chips when he bet on red and the result is 2', async () => {
        const player = await createPlayer()
        await bet(player, 10, 'red')
        await spin(player, 2)

        const chips = await getChips(player)
        expect(chips).toBe(90)
    })
});

