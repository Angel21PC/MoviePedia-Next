import { type } from "node:os";

declare module "*.png" {
  const value: any;
  export = value;
}

type IRequest = {
  //Movies
  fetchPopular_Movie: string;
  fetchTop_Movie: string;
  fetchGenre_Movie: string;
  fetchDiscover_Movie: string;
  fetchOne_Movie: string;
  fetchProvider_Movie: string;
  fetchCast_Movie: string;
  fetchVideo_Movie: string;
  fetchFindMovie: string;
  fetchSimilar_Movie: string;

  //TVShows
  fetchPopular_Tv: string;
  fetchTop_Tv: string;
  fetchGenre_Tv: string;
  fetchDiscover_Tv: string;
  fetchOne_Tv: string;
  fetchProvider_TV: string;
  fetchVideo_TV: string;
  fetchCast_TV: string;
  fetchSimilar_TV: string;
  fetchFindTV: string;
  fetchSeason_TV: string;

  //de todo
  fetchTrending: string;
  fetchUpcoming: string;
};

type IApi_rutesM = {
  Popular: string;
  Top: string;
  Upcoming: string;
  Discover: string;
  Genre: string;
  OneMovie: string;
  Cast: string;
  Provider: string;
  Video: string;
  Find: string;
  Similar: string;
};

type IApi_rutesTV = {
  Popular: string;
  Top: string;
  Upcoming: string;
  Discover: string;
  Genre: string;
  Find: string;
  OneShow: string;
  Cast: string;
  Provider: string;
  Video: string;
  Similar: string;
  Season: string;
};

type INewUser = {
  birth_date: string;
  email: string;
  password: string;
  password2: string;
  phone_number: string;
  username: string;
  currentPassword?: string;
  file: any;
  size: any;
};

type IListM = {
  Like: any;
  Bookmark: any;
  Watch: any;
};

type Idatapublic = {
  Movie: [];
  Tv: [];
};
