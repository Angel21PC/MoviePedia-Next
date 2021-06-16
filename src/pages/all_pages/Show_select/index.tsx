import axios from "axios";

//next
import { NextPage } from "next";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
//component
import Tv from "../../../components/TvShowComponents";
import Footer from "../../../components/util/Footer";
//initialprops
import { URL, api_rutesTv } from "../../../config/rute_api";

export interface TvSProps {
  data: any;
}

const TvS: NextPage<TvSProps> = (props) => {
  const { data } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(data);
  return (
    <>
      <Tv data={data} />
      <Footer></Footer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const data = await axios
    .get(URL + api_rutesTv.OneShow, {
      params: {
        id: { id },
      },
    })
    .then((res) => res)
    .then((response) => {
      return response.data;
    });

  return { props: data };
};

export default TvS;
