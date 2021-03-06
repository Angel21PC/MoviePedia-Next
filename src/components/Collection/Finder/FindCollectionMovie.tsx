import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutesM } from "../../../config/rute_api";
//components-p
import CollectionSelector from "../Selector/SelectorMovie";
//components
import { Row } from "react-bootstrap";
export interface FindCollectionMovieProps {
  id: string;
  getMovies: any;
  m: any;
}

const FindCollectionMovie: FC<FindCollectionMovieProps> = ({
  id,
  getMovies,
  m,
}) => {
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
      setMovies(request.data?.data?.results);
      return request;
    }
    fetchData();
  }, [id]);

  return (
    <Row className="justify-content-center" lg={2} md={1} sm={1}>
      {movies?.map((movie) => (
        <div key={movie.id}>
          <CollectionSelector m={movie} collection={getMovies} mm={m} />
        </div>
      ))}
    </Row>
  );
};

export default FindCollectionMovie;
