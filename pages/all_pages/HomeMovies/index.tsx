import { NextPage } from "next";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Banner from "../../../components/Top-Components/Banner/index";
import Explorer from "../../../components/Top-Components/Explorer/index";

export interface HomeMoviesProps {
  data: any;
}

const HomeMovies: NextPage<HomeMoviesProps> = (props) => {
  const { data } = props;
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

export const getServerSideProps = async () => {
  const data = await fetch(URL + api_rutesM.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });

  return { props: data };
};
export default HomeMovies;
