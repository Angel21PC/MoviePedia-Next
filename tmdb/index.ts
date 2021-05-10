import axios from "axios";

import { API_KEY } from "./key";
import {IRequest} from '../types'

export const request: IRequest = {

    //Movies
    fetchPopular_Movie : `/movie/popular?api_key=${API_KEY}`,
    fetchTop_Movie :`/movie/top_rated?api_key=${API_KEY}`,
    fetchGenre_Movie : `/genre/movie/list?api_key=${API_KEY}`,
    fetchDiscover_Movie: `/discover/movie?api_key=${API_KEY}`,

    //OneMovie
    fetchOne_Movie: `/movie/{movie_id}?api_key=${API_KEY}`,
    fetchProvider_Movie: `/movie/{movie_id}/watch/providers?api_key=${API_KEY}`,
    fetchCast_Movie: `/movie/{movie_id}/credits?api_key=${API_KEY}`,
    fetchVideo_Movie: `/movie/{movie_id}/videos?api_key=${API_KEY}`,

    fetchSimilar_Movie:`/movie/{movie_id}/similar?api_key=${API_KEY}`,

    //Find
    fetchFindMovie: `/search/movie?api_key=${API_KEY}`,

    //TVShows
    fetchPopular_Tv : `/tv/popular?api_key=${API_KEY}`,
    fetchTop_Tv :`/tv/top_rated?api_key=${API_KEY}`,
    fetchGenre_Tv : `/genre/tv/list?api_key=${API_KEY}`,
    fetchDiscover_Tv: `/discover/tv?api_key=${API_KEY}`,
    fetchOne_Tv: `/tv/{tv_id}?api_key=${API_KEY}`,


    //de todo
    fetchTrending :`/trending/all/day?api_key=${API_KEY}`,
    fetchUpcoming : `/movie/upcoming?api_key=${API_KEY}`,

}

//base url para requests
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',  
});

export default instance;