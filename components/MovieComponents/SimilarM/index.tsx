import { useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

import { URL, api_rutesM, api_rutesTv } from "../../../config/rute_api";

import Poster from "../Poster/index";

export interface SimilarProps {
  id: string;
}

const Similar: React.SFC<SimilarProps> = ({ id }) => {
  console.log(id);
  const [movies, setMovies] = useState([]); //recoge todos los datos de la consulta
  useEffect(() => {
    //request para extraer las peliculas
    async function fetchData() {
      const request = await axios.get(api_rutesM.Similar, {
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
      {movies.map((
        movie //saca las peliculas
      ) => (
        <div key={movie?.id} className="mt-2 mr-3">
          <Link
            href={{
              pathname: "/all_pages/Movie_select",
              query: { id: movie.id },
            }}
            key={movie?.id}
          >
            <a>
              <Poster c="poster" movie={movie} />
            </a>
          </Link>
        </div>
      ))}

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
