import { IApi_rutes } from "../../types";

export const URL:string = 'https://my-bassist-chris.mybassistchris.now.sh';

export const api_rutes: IApi_rutes = {
    PopularM: '/api/movie/PopularM',
    TopM:'/api/movie/TopM',
    UpcomingM: '/api/movie/UpcomingM',
    DiscoverM: '/api/movie/DiscoverM',
    GenreM: '/api/movie/GenreM',
    FindM: '/api/movie/FindM',

    OneMovie: '/api/movie/GetMovie',
    Cast: '/api/movie/GetCast',
    Provider: '/api/movie/GetProvider',
    Video: '/api/movie/GetVideo',

}