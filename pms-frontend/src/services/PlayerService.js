import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/players';

export const listPlayers = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createplayer = (player) => axios.post(REST_API_BASE_URL, player);

export const getPlayer = (playerId) => axios.get(REST_API_BASE_URL + '/' + playerId);

export const updatePlayer = (playerId, player) => axios.put(REST_API_BASE_URL + '/' + playerId, player);

export const deletPlayer = (playerId) => axios.delete(REST_API_BASE_URL + '/' + playerId);