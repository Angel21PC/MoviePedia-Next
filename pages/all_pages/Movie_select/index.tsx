import axios from "axios";

//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component
import Movie from "../../../components/MovieComponents";
import NavBar from "../../../components/NavBar/index";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

export interface MovieSProps {
  data: any;
}

const MovieS: NextPage<MovieSProps> = (props) => {
  const { data } = props;
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <NavBar />
      <Movie data={data} />
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { id } = query;

  const data = await axios
    .get(URL + api_rutesM.OneMovie, {
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

export default MovieS;
