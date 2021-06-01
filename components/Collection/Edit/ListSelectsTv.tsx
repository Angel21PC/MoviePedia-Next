import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

//component-p
import Poster from "../../SelectUtils/Poster/index";
//components
import { Container, Row, Col, Button } from "react-bootstrap";
//api
import { URL, api_rutesTv } from "../../../config/rute_api";

export interface listSelcProps {
  id: any;
  deleteMovies: any;
}

const base_Url: string = "https://image.tmdb.org/t/p/original/";

const Selc: FC<listSelcProps> = ({ id, deleteMovies }) => {
  console.log(id);
  const [movie, setMovie] = useState(undefined);
  useEffect(() => {
    //data
    async function getDataMovie() {
      const result = await axios.get(URL + api_rutesTv.OneShow, {
        params: {
          id: { id },
        },
      });
      console.log({ eo: result });
      setMovie(result.data.data);
    }
    getDataMovie();
  }, [id]);
  console.log(movie);

  if (movie != undefined) {
    return (
      <>
        <Col>
          <div className="actor" key={movie.id}>
            <img
              onClick={() => deleteMovies(id)}
              key={movie.id}
              className="actor_poster"
              src={`${base_Url}${movie?.poster_path}`}
              alt={movie?.name}
            ></img>
          </div>
        </Col>
        <style jsx>{`
          .actor_poster {
            object-fit: cover;
            max-height: 200px;

            transition: transform 450ms;
            border-radius: 10px;
            -webkit-box-shadow: 0 5px 5px 0 rgba(80, 79, 79, 0.3);
            box-shadow: 0 5px 5px 0 rgba(19, 18, 18, 0.3);
            margin-top: 5vh;
            margin-left: 1vw;
          }
        `}</style>
      </>
    );
  } else {
    return <></>;
  }
};

export default Selc;
