import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutesTv } from "../../../config/rute_api";
//components-p
import CollectionSelectorS from "../Selector/SelectorShow";

export interface FindCollectionTvProps {
  id: string;
  getShow: any;
  s;
}

const FindCollectionTv: FC<FindCollectionTvProps> = ({ id, getShow, s }) => {
  const [fetchUrl, setFetchUrl] = useState(URL + api_rutesTv.Find);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //request para extraer las peliculas
    async function fetchData() {
      setMovies([]); //vaciamos el array

      const request = await axios.get(fetchUrl, {
        params: {
          text: id,
        },
      });

      setMovies(request.data?.data?.results);
      return request;
    }
    fetchData();
  }, [id]);

  return (
    <div className="justify-content-center">
      {movies?.map((movie) => (
        <div key={movie.id}>
          <CollectionSelectorS s={movie} collection={getShow} ss={s} />
        </div>
      ))}
    </div>
  );
};

export default FindCollectionTv;
