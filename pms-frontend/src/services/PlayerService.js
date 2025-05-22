import axios from "axios";
// Bas-URl till REST-API
const REST_API_BASE_URL = 'http://localhost:8080/api/players';

// funktioner för hämta alla spelare
export const listPlayers = () => {
    return axios.get(REST_API_BASE_URL);
}

// funktion för att skapa en ny spelare, POST
export const createplayer = (player) => axios.post(REST_API_BASE_URL, player);
// funktion för att hämta en specifik spelare med id, GET
export const getPlayer = (playerId) => axios.get(REST_API_BASE_URL + '/' + playerId);
// funktion för updatera spelare via id, PUT
export const updatePlayer = (playerId, player) => axios.put(REST_API_BASE_URL + '/' + playerId, player);
// funktion för att ta bort en spelare, DELETE
export const deletPlayer = (playerId) => axios.delete(REST_API_BASE_URL + '/' + playerId);