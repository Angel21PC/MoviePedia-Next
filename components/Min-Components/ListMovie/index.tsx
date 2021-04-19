import { useEffect, useState } from "react";
import { IListM } from "../../../types";
import axios from "axios";

//Next
import Link from "next/link";

//component-p
import Poster from "../Poster/index";

//api
import { URL, api_rutes } from "../../../firebase/config/rute_api";

export interface LstMProps {}

const LstM: React.SFC<LstMProps> = (props: any) => {
  console.log(props);
  const [movie, setMovie] = useState(undefined);
  useEffect(() => {
    //data
    async function getDataMovie() {
      let id = props.id;
      const result = await axios.get(URL + api_rutes.OneMovie, {
        params: {
          id: { id },
        },
      });

      setMovie(result.data);
    }
    getDataMovie();
  }, []);

  return (
    <Link
      href={{
        pathname: "/all_pages/Movie_select",
        query: { id: movie?.data.id },
      }}
      key={movie?.name}
    >
      <a key={movie?.name}>
        <Poster c="movie_poster" movie={movie?.data} />
      </a>
    </Link>
  );
};

export default LstM;
