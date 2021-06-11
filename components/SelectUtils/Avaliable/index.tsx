import React, { FC } from "react";

export interface AvaliableProps {
  provider: any;
}

//style
import style from "./Available.module.scss";

const Avaliable: FC<AvaliableProps> = ({ provider }) => {
  //url base para las imagenes
  const base_Url = "https://image.tmdb.org/t/p/original/";
  //console.log(provider);

  if (provider?.data.results?.US?.flatrate === undefined) {
    return <></>;
  }

  return (
    <>
      <h4>Stream avaliable on:</h4>
      <div className="available_logo mt-2 d-flex justify-content-center">
        {provider?.data.results?.US?.flatrate?.map((e) =>
          e.logo_path ? (
            <li key="f" className="providers_logo">
              <img
                key={e}
                className="providers_logo"
                src={`${base_Url}${e?.logo_path}`}
                alt={e}
              ></img>
            </li>
          ) : (
            <></>
          )
        )}
        <style jsx>{`
          .providers_logo {
            border-radius: 10px;
            object-fit: cover;
            max-height: 60px;
          }

          li {
            list-style: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default Avaliable;
