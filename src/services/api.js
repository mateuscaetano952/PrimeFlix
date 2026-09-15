import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
//Url da api /movie/now_playing?api_key=0d44fb9b7640b129404bf39a3e6ddd57&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;