import React, { FC, useState } from "react";
//components
// import Image from "react-bootstrap/Image";
import Image from "next/image";

import styles from "./Poster.module.scss";
export interface PosterProps {
  c: string;
  movie: any;
}

const Poster: FC<PosterProps> = ({ movie, c }) => {
  const base_Url: string = "https://image.tmdb.org/t/p/original/";

  if (movie?.poster_path != null) {
    return (
      <div className={c}>
        <Image
          width={200}
          height={300}
          className={styles.border}
          src={`${base_Url}${movie?.poster_path}`}
          alt={movie?.name}
          key={movie?.name}
        />
      </div>
    );
  } else {
    return (
      <div className={c}>
        <Image
          width={200}
          height={300}
          className={c}
          src="/file-not-found.png"
          alt={movie?.name}
          key={movie?.name}
        />
      </div>
    );
  }
};

export default Poster;
