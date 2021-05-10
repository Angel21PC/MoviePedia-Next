import React, { FC } from "react";
import { useEffect, useState } from "react";

//components
import Porter from "../../SelectUtils/Poster/index";

//style
import style from "./Banner.module.scss";

export interface BannerProps {
  data: any;
}

const Banner: FC<BannerProps> = ({ data }) => {
  const [movie, setMovie] = useState<any>([]); //recoge todos los datos de la consulta

  useEffect(() => {
    //request
    async function fetchData() {
      //console.log(request);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      // console.log(movie);
    }

    fetchData();

    if (movie === undefined) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div
        className={style.banner}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
          backgroundPosition: "center center",
          backgroundColor: "rgb(0 0 0 / 22%)",
          backgroundBlendMode: "darken",
        }}
      >
        <div className={style.banner_content}>
          <div className="poster_container d-flex">
            <Porter c="banner_poster ml-5 mt-5" movie={movie} />
            <div className="banner_text mt-5 ml-5 pt-5">
              <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
              <p>{movie?.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 634px) {
          .banner_text {
            display: none;
          }
        }
        .banner_text p {
          font-size: 20px;
        }
      `}</style>
    </>
  );
};

export default Banner;
