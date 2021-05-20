import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

//component-p
import Poster from "../../SelectUtils/Poster/index";

//api
import { URL, api_rutesTv } from "../../../config/rute_api";

export interface LstTvProps {}

const LstTv: FC<LstTvProps> = (props: any) => {
  const [movie, setMovie] = useState(undefined);
  useEffect(() => {
    //data
    async function getDataMovie() {
      let id = props.id;
      const result = await axios.get(URL + api_rutesTv.OneShow, {
        params: {
          id: { id },
        },
      });

      setMovie(result.data);
    }
    getDataMovie();
  }, []);

  return (
    <Link
      href={{
        pathname: "/all_pages/Show_select",
        query: { id: movie?.data.id },
      }}
      key={movie?.name}
    >
      <a key={movie?.name}>
        <Poster c="movie_poster" movie={movie?.data} />
      </a>
    </Link>
  );
};

export default LstTv;
