import React, { FC } from "react";
export interface OverviewProps {
  movie: any;
  cast: any;
}

const Overview: FC<OverviewProps> = ({ movie, cast }) => {
  return (
    <>
      <p>{movie.overview}</p>
      <h5>
        Directed by:{" "}
        {movie.created_by.map((e) => (
          <a key={e.name}>{e.name} </a>
        ))}
      </h5>
    </>
  );
};

export default Overview;
