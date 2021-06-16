import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutesTv } from "../../../config/rute_api";

//components-p
import LstTv from "../../List/ListTv/index";

export interface FindShowProps {
  id: any;
}

const FindShow: FC<FindShowProps> = ({ id }) => {
  const [fetchUrl, setFetchUrl] = useState(URL + api_rutesTv.Find);
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    //request para extraer las peliculas
    async function fetchData() {
      setMovies([]); //vaciamos el array
      setIsPending(true); //cargamos la animacion

      const request = await axios.get(fetchUrl, {
        params: {
          text: id,
        },
      });
      console.log(request);
      setTimeout(() => {
        //ejecutamos
        setIsPending(false);
        setMovies(request.data.data.results);
      }, 1500);

      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="justify-content-center">
      {movies.map((movie) => (
        <LstTv {...movie} />
      ))}
    </div>
  );
};

export default FindShow;
