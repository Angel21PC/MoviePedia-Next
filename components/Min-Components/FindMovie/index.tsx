import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutes } from "../../../pages/all_pages/config/rute_api";
//components-p
import LstM from "../../Min-Components/ListMovie/index";

export interface FindMovieProps {
  id: any;
}

const FindMovie: React.SFC<FindMovieProps> = ({ id }) => {
  const [fetchUrl, setFetchUrl] = useState(URL + api_rutes.FindM);
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(true);

  console.log(id);
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

      setTimeout(() => {
        //ejecutamos
        setIsPending(false);
        setMovies(request.data.data.results);
      }, 1500);
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  return (
    <>
      {movies.map((movie) => (
        <LstM {...movie} />
      ))}
    </>
  );
};

export default FindMovie;
