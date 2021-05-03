import { useEffect, useState } from "react";
import axios from "axios";
import { URL, api_rutesM } from "../../../firebase/config/rute_api";
//components-p
import LstM from "../../Min-Components/ListMovie/index";

export interface FindMovieProps {
  id: any;
}

const FindMovie: React.SFC<FindMovieProps> = ({ id }) => {
  const [fetchUrl, setFetchUrl] = useState(URL + api_rutesM.Find);
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    //request para extraer las peliculas
    async function fetchData() {
      setMovies([]); //vaciamos el array
      setIsPending(true); //cargamos la animacion

      const request = await axios.get(
        "https://movie-pedia-next-e0dkngyfb-angel21pc.vercel.app" + fetchUrl,
        {
          params: {
            text: id,
          },
        }
      );

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
        <LstM {...movie} />
      ))}
    </div>
  );
};

export default FindMovie;
