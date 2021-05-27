import React, { FC } from "react";
import { useState, useEffect } from "react";

import { URL, api_rutesM } from "../../../config/rute_api";
import axios from "axios";

//component-p
import Poster from "../../SelectUtils/Poster/index";

export interface CollectionSelectorProps {
  movie: any;
  collection: any;
}

const CollectionSelector: React.SFC<CollectionSelectorProps> = ({
  movie,
  collection,
}) => {
  //   const [movie, setMovie] = useState([]);

  //   useEffect(() => {
  //     async function getDataMovie() {
  //       const result = await axios.get(URL + api_rutesM.OneMovie, {
  //         params: {
  //           id: { id },
  //         },
  //       });

  //       setMovie(result.data);
  //     }
  //     getDataMovie();
  //   }, [id]);

  const send = () => {
    collection((oldArray) => [...oldArray, movie]);
  };
  //   console.log(movie);
  return (
    <div onClick={send}>
      <Poster c="movie_poster" movie={movie} />
    </div>
  );
};

export default CollectionSelector;
