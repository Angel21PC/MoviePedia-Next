import React, { FC, useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

import { URL, api_rutesM, api_rutesTv } from "../../../config/rute_api";

import Poster from "../Poster/index";

export interface SimilarProps {
  id: string;
  m_s: string;
}

const Similar: FC<SimilarProps> = ({ id, m_s }) => {
  console.log(id);
  const fetch: string =
    m_s == "/all_pages/Movie_select" ? api_rutesM.Similar : api_rutesTv.Similar;
  const [movies, setMovies] = useState([]); //recoge todos los datos de la consulta
  useEffect(() => {
    //request para extraer las peliculas
    async function fetchData() {
      const request = await axios.get(fetch, {
        params: {
          id: id,
        },
      });

      setMovies(request.data.data.results);
      return request;
    }
    fetchData();
  }, []);
  return (
    <div className="similar">
      {movies.map(
        (
          movie //saca las peliculas
        ) => (
          <div key={movie?.id} className="mt-2 mr-3">
            <Link
              href={{
                pathname: m_s,
                query: { id: movie.id },
              }}
              key={movie?.id}
            >
              <a>
                <Poster c="poster" movie={movie} />
              </a>
            </Link>
          </div>
        )
      )}

      <style jsx>{`
        .similar {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
        }
      `}</style>
    </div>
  );
};

export default Similar;
