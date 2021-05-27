import React, { FC, useEffect, useRef, useState, useLayoutEffect } from "react";
import axios from "axios";
import { URL, api_rutesM } from "../../../config/rute_api";
//components
import NavBar from "../../NavBar/index";
import FindMovie from "../../Find/FindMovie/index";
import FindShow from "../../Find/FindShow/index";
export interface SelectedMoviesProps {
  movie: any;
  show: any;
  deleteMovies: any;
}
const base_Url: string = "https://image.tmdb.org/t/p/original/";
const SelectedMovies: FC<SelectedMoviesProps> = ({
  movie,
  show,
  deleteMovies,
}) => {
  const [movies, setMovies] = useState([]);
  useLayoutEffect(() => {
    setMovies([]);
    setMovies(movie);
  }, [movie]);

  console.log({ movie: movie });
  return (
    <>
      <div className="actors_container">
        {movie.map((m) => (
          <div className="actor" key={m.id} onClick={() => deleteMovies(m)}>
            <img
              key={m.id}
              className="actor_poster"
              src={`${base_Url}${m?.poster_path}`}
              alt={m?.name}
            ></img>
          </div>
        ))}
      </div>

      <style jsx>{`
        .actors_container {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
        }
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
};

export default SelectedMovies;
