import React, { FC } from "react";
//components
import Image from "react-bootstrap/Image";

export interface PosterProps {
  c: string;
  movie: any;
}

const Poster: FC<PosterProps> = ({ movie, c }) => {
  const base_Url: string = "https://image.tmdb.org/t/p/original/";

  if (movie?.poster_path != null) {
    return (
      <Image
        className={c}
        src={`${base_Url}${movie?.poster_path}`}
        alt={movie?.name}
        key={movie?.name}
      />
    );
  } else {
    return (
      <Image
        className={c}
        src="/file-not-found.png"
        alt={movie?.name}
        key={movie?.name}
      />
    );
  }
};

export default Poster;
