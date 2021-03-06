import { NextPage } from "next";

//fetch
import { URL, api_rutesTv } from "../../../config/rute_api";

//initialprops
import { GetStaticProps } from "next";

//components
import Banner from "../../../components/HomeComponents/Banner/index";
import Explorer from "../../../components/HomeComponents/Explorer/index";
import Footer from "../../../components/util/Footer";

//firebase
import { useAuth } from "../../../firebase/AuthContext";
export interface TVProps {
  popularTv: any;
  genreTv: any;
}

const TV: NextPage<TVProps> = (props) => {
  const { popularTv, genreTv } = props;
  //console.log(popularTv);
  return (
    <>
      <Banner data={popularTv?.data} m_s={"/all_pages/Show_select"} />
      <Explorer
        genreMovies={genreTv?.data.genres}
        URL={URL}
        initialData={popularTv?.data.results}
        api_rutes={api_rutesTv}
        m_s={"/all_pages/Show_select"}
      />
      <Footer></Footer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularTv = await fetch(URL + api_rutesTv.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  const genreTv = await fetch(URL + api_rutesTv.Genre)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return {
    props: { popularTv, genreTv },
    revalidate: 3600,
  };
};

export default TV;
