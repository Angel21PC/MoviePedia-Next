import { NextPage } from "next";

//initialprops
import { URL, api_rutesM } from "../../../firebase/config/rute_api";
import { GetStaticProps } from "next";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

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

export interface MovieProps {
  popularMovies: any;
}

const Movie: NextPage<MovieProps> = ({ popularMovies }) => {
  // console.log(popularMovies.data);
  return (
    <>
      <NavBar />
      <Banner data={popularMovies.data} />
      <Explorer
        initialData={popularMovies.data}
        api_rutes={api_rutesM}
        m_s={"/all_pages/Movie_select"}
      />
    </>
  );
};

// Movie.getInitialProps = async () => {
//   return fetch(URL + api_rutesM.Popular)
//     .then((res) => res.json())
//     .then((response) => {
//       return response;
//     });
// };

// async function getStaticProps() {
//   return await fetch(URL + api_rutesM.Popular)
//     .then((res) => res.json())
//     .then((response) => {
//       return response;
//     });
// }

export default Movie;
