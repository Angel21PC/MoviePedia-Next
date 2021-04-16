import { NextPage } from "next";

//initialprops
import { URL, api_rutes } from "../config/rute_api";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

export interface MovieProps {
  data: any;
}

const Movie: NextPage<MovieProps> = ({ data }) => {
  //console.log(data)
  return (
    <>
      <NavBar />
      <Banner data={data} />
      <Explorer URL={URL} api_rutes={api_rutes} />
    </>
  );
};

Movie.getInitialProps = async () => {
  return fetch(URL + api_rutes.PopularM)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
};

export default Movie;
