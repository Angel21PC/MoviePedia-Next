declare module "*.png" {
    const value: any;
    export = value;
 }

type IRequest = {
    
    //Movies
    fetchPopular_Movie : string,
    fetchTop_Movie : string,
    fetchGenre_Movie : string,
    fetchDiscover_Movie: string,
    fetchOne_Movie: string,
    fetchProvider_Movie: string,
    fetchCast_Movie: string,

    //TVShows
    fetchPopular_Tv : string,
    fetchTop_Tv : string,
    fetchGenre_Tv : string,
    fetchDiscover_Tv: string,


    //de todo
    fetchTrending : string,
    fetchUpcoming : string,
}

type IApi_rutes = {

    PopularM: string,
    TopM: string,
    UpcomingM: string,
    DiscoverM: string,
    GenreM: string 
    OneMovie: string
    Cast:string
}

type INewUser = {
    birth_date: string,
    email: string,
    password: string,
    password2: string,
    phone_number: string,
    username: string
}