import { NextPage } from "next";

//initialprops
import { URL, api_rutesM } from "../../../firebase/config/rute_api";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

export interface MovieProps {
  data: any;
}

const Movie: NextPage<MovieProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <NavBar />
      <Banner data={data} />
      <Explorer
        URL={URL}
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

export const getServerSideProps = async () => {
  return await fetch(URL + api_rutesM.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
};
export default Movie;
