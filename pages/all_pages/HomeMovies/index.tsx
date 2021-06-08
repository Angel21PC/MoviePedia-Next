import { NextPage } from "next";

//fetch
import { URL, api_rutesM } from "../../../config/rute_api";

//initialprops
import { GetStaticProps } from "next";

//components
import Banner from "../../../components/HomeComponents/Banner/index";
import Explorer from "../../../components/HomeComponents/Explorer/index";
import Footer from "../../../components/util/Footer";
export interface HomeMoviesProps {
  popularMovies: any;
  genreMovies: any;
}

const HomeMovies: NextPage<HomeMoviesProps> = (props) => {
  const { popularMovies, genreMovies } = props;
  // console.log(popularMovies);
  return (
    <>
      <Banner data={popularMovies.data} />
      <Explorer
        genreMovies={genreMovies?.data.genres}
        URL={URL}
        initialData={popularMovies?.data.results}
        api_rutes={api_rutesM}
        m_s={"/all_pages/Movie_select"}
      />
      <Footer></Footer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularMovies = await fetch(URL + api_rutesM.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  const genreMovies = await fetch(URL + api_rutesM.Genre)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return {
    props: { popularMovies, genreMovies },
    revalidate: 3600,
  };
};

export default HomeMovies;
