import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutesM } from "../../../config/rute_api";
//components-p
import CollectionSelector from "../Selector/index";

export interface FindCollectionMovieProps {
  id: string;
  getMovies: any;
}

const FindCollectionMovie: FC<FindCollectionMovieProps> = ({
  id,
  getMovies,
}) => {
  console.log(id);
  const [fetchUrl, setFetchUrl] = useState(URL + api_rutesM.Find);
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

      //   console.log({ request: request });

      setMovies(request.data?.data?.results);

      return request;
    }
    fetchData();
  }, [id]);

  return (
    <div className="justify-content-center">
      {movies?.map((movie) => (
        <CollectionSelector movie={movie} collection={getMovies} />
      ))}
    </div>
  );
};

export default FindCollectionMovie;
