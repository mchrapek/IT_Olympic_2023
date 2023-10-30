const axios = require('axios');
async function createPlayer() {
    const response = await axios.post('http://52.58.115.237:8080/roulette-api/players');
    return response.data.hashname;
}

async function getChips(player) {
    let config = { headers: { Authorization : player } }
    const response = await axios.get('http://52.58.115.237:8080/roulette-api/chips', config);
    return response.data.chips;
}

async function bet(player, chips, uri) {
    let config = { headers: { Authorization : player } }
    let data = { "chips": chips }
    const response = await axios.post(`http://52.58.115.237:8080/roulette-api/bets/${uri}`, data, config);
    return response.data;
}

async function spin(player, number) {
    let config = { headers: { Authorization : player } }
    const response = await axios.post(`http://52.58.115.237:8080/roulette-api/spin/${number}`, {}, config);
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

