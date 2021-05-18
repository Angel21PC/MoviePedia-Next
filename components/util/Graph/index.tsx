import React, { FC } from "react";
import { useEffect, useState } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

import { Pie, PolarArea, Radar, Bar } from "react-chartjs-2";
import {
  PieController,
  PolarAreaController,
  RadarController,
  BarControllerDatasetOptions,
  BarController,
} from "chart.js";
export interface GraphProps {}

const Graph: FC<GraphProps> = () => {
  /*
    Graficos que necesito:
        Visualizaciones por tiempo (Ej: peliculas vistas en un mes)
            -https://nivo.rocks/calendar/

        Generos mas vistos (DONE)
            -https://nivo.rocks/bubble/ 
            -https://nivo.rocks/sunburst/api/

        Años de las peliculas o series (Uff) 


        ¿¿¿¿¿¿Lista de paises de origen???????
            -https://nivo.rocks/geomap/canvas/
    */
  /*
    Datos que necesito:
        Dia de visualizacion
        Generos por peliculas
        Año de extreno
        ¿¿¿¿¿¿Paises de origen???????
    
    */
  const [data, setData] = useState();
  const [dataMovieYear, setDataMovieYear] = useState();
  const [dataW, setDataW] = useState();
  const currentUser = useAuth();
  const { getDateRelease, getGenreStads, getTimeStatsWeek } = useAuth();
  useEffect(() => {
    async function getData() {
      if (currentUser.currentUser !== null) {
        let response = await getDateRelease();
        console.log(response);
        setDataMovieYear(response);
      }
    }
    getData();

    async function getDataGenre() {
      if (currentUser.currentUser !== null) {
        let response = await getGenreStads();
        console.log(response);
        setData(response);
      }
    }
    getDataGenre();

    async function getTime() {
      if (currentUser.currentUser !== null) {
        let response = await getTimeStatsWeek();
        console.log(response);
        setDataW(response);
      }
    }
    getTime();
  }, []);

  const options = {
    responsive: true,
  };

  return (
    <>
      <h1>Works</h1>

      <h1>Genre Stats</h1>
      <Pie type={PieController} data={data} options={options} />
      <PolarArea type={PolarAreaController} data={data} options={options} />

      {/* <h1>Time Stats</h1>
      <Bar type={BarController} data={dataW} options={options2} /> */}

      <h1>Release Movies</h1>
      <Pie type={PieController} data={dataMovieYear} options={options} />
    </>
  );
};

export default Graph;
