import axios from "axios";
import { useEffect, useState } from "react";

//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//Top-component
import Movie from "../../../components/Top-Components/Movie";
import NavBar from "../../../components/Top-Components/NavBar/index";
//initialprops
import { URL, api_rutes } from "../../../firebase/config/rute_api";

export interface MovieSProps {
  data: any;
}

const MovieS: NextPage<MovieSProps> = ({ data }) => {
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

// MovieS.getInitialProps = async ({ query }) => {
//   const { id } = query;

//   return await axios
//     .get(URL + api_rutes.OneMovie, {
//       params: {
//         id: { id },
//       },
//     })
//     .then((res) => res)
//     .then((response) => {
//       return response.data;
//     });
// };
async function getStaticProps({ query }) {
  const { id } = query;

  return await axios
    .get(URL + api_rutes.OneMovie, {
      params: {
        id: { id },
      },
    })
    .then((res) => res)
    .then((response) => {
      return response.data;
    });
}
export default MovieS;
