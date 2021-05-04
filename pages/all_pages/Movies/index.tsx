import { NextPage } from "next";
import { GetStaticProps } from "next";
import api from "../../api/index";
import DataCache from "../../../util/DataCache";
import { transformMovie } from "../../../util/transform";
//initialprops
import { URL, api_rutesM } from "../../../firebase/config/rute_api";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

const genresCache = new DataCache(api.genres, false, 60 * 24);
const popularMoviesCache = new DataCache(api.popularMovies, false, 10);
const nowPlayingMoviesCache = new DataCache(api.nowPlayingMovies, false, 10);

export const getStaticProps: GetStaticProps = async () => {
  const [
    genresResponse,
    popularMoviesResponse,
    nowPlayingMoviesResponse,
  ] = await Promise.all([
    genresCache.getData(),
    popularMoviesCache.getData(),
    nowPlayingMoviesCache.getData(),
  ]);
  const [movieGenres, tvGenres] = genresResponse;
  const genres = [...movieGenres.genres, ...tvGenres.genres];

  const popularMovies = popularMoviesResponse.results.map(
    transformMovie(genres)
  );
  const nowPlayingMovies = nowPlayingMoviesResponse.results.map(
    transformMovie(genres)
  );
  return {
    props: { popularMovies, nowPlayingMovies, genres },
    revalidate: 3600,
  };
};

export interface MovieProps {
  data: any;
  popularMovies: any;
  nowPlayingMovies: any;
  genres: any;
}

const Movie: NextPage<MovieProps> = ({
  popularMovies,
  nowPlayingMovies,
  genres,
}) => {
  console.log(popularMovies);
  return (
    <>
      <NavBar />
      <Banner data={popularMovies} />
      <Explorer
        popular={popularMovies}
        genres={genres}
        URL={URL}
        api_rutes={api_rutesM}
      />
    </>
  );
};

export default Movie;
