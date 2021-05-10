import { IApi_rutesM, IApi_rutesTV } from "../types";

export const URL:string = 'https://movie-pedia-next.vercel.app';

export const api_rutesM: IApi_rutesM = {
    Popular: '/api/movie/PopularM',
    Top:'/api/movie/TopM',
    Upcoming: '/api/movie/UpcomingM',
    Discover: '/api/movie/DiscoverM',
    Genre: '/api/movie/GenreM',
    Find: '/api/movie/FindM',

    OneMovie: '/api/movie/GetMovie',
    Cast: '/api/movie/GetCast',
    Provider: '/api/movie/GetProvider',
    Video: '/api/movie/GetVideo',
    Similar: '/api/movie/SimilarM',
}

export const api_rutesTv: IApi_rutesTV = {
    Popular: '/api/tv/PopularTV',
    Top:'/api/tv/TopTV',
    Upcoming: '/api/tv/UpcomingTV',
    Discover: '/api/tv/DiscoverTV',
    Genre: '/api/tv/GenreTV',

    OneShow: '/api/tv/GetShow',
    Cast: '/api/tv/GetCast',
    Provider: '/api/tv/GetProvider',
    Video: '/api/tv/GetVideo',
    Similar: '/api/tv/SimilarTV',
}