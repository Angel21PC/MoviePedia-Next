import { NextPage } from "next";

//fetch
import { URL, api_rutesM } from "../../../config/rute_api";

//initialprops
import { GetStaticProps } from "next";

//components
import NavBar from "../../../components/NavBar/index";
import Banner from "../../../components/HomeComponents/Banner/index";
import Explorer from "../../../components/HomeComponents/Explorer/index";

export interface HomeMoviesProps {
  popularMovies: any;
}

const HomeMovies: NextPage<HomeMoviesProps> = (props) => {
  const { popularMovies } = props;
  console.log(popularMovies);
  return (
    <>
      <NavBar />
      <Banner data={popularMovies.data} />
      <Explorer
        URL={URL}
        initialData={popularMovies?.data.results}
        api_rutes={api_rutesM}
        m_s={"/all_pages/Movie_select"}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularMovies = await fetch(URL + api_rutesM.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return {
    props: { popularMovies },
    revalidate: 3600,
  };
};

export default HomeMovies;
