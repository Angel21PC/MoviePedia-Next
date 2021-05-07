import { NextPage } from "next";

//fetch
import { URL, api_rutesTv } from "../../../config/rute_api";

//initialprops
import { GetStaticProps } from "next";

//components
import NavBar from "../../../components/NavBar/index";
import Banner from "../../../components/HomeComponents/Banner/index";
import Explorer from "../../../components/HomeComponents/Explorer/index";

export interface TVProps {
  popularTv: any;
}

const TV: NextPage<TVProps> = (props) => {
  const { popularTv } = props;
  console.log(popularTv);
  return (
    <>
      <NavBar />
      <Banner data={popularTv?.data} />
      <Explorer
        URL={URL}
        initialData={popularTv?.data.results}
        api_rutes={api_rutesTv}
        m_s={"/all_pages/Show_select"}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularTv = await fetch(URL + api_rutesTv.Popular)
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return {
    props: { popularTv },
    revalidate: 3600,
  };
};

export default TV;
