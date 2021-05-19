import React, { FC } from "react";
import { useEffect, useState } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";
//stats
import { Pie, PolarArea, Radar, Bar, Line } from "react-chartjs-2";
//COMPONENTS
import { Container, Row, Col } from "react-bootstrap";

import { PieController, PolarAreaController, LineController } from "chart.js";

import style from "./Graph.module.scss";

export interface GraphProps {}

const Graph: FC<GraphProps> = () => {
  const [data, setData] = useState();
  const [dataMovieYear, setDataMovieYear] = useState();
  const [dataY, setDataY] = useState();
  const [dataW, setDataW] = useState();
  const currentUser = useAuth();
  const { getDateRelease, getGenreStads, getTimeStatsYear, getTimeStatsWeek } =
    useAuth();

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
        let response = await getTimeStatsYear();
        console.log(response);
        setDataY(response);
      }
    }
    getTime();

    async function getTimeWeek() {
      if (currentUser.currentUser !== null) {
        let response = await getTimeStatsWeek();
        console.log(response);
        setDataW(response);
      }
    }
    getTimeWeek();
  }, []);

  const options = {
    responsive: true,
  };

  return (
    <Container>
      <div>
        <h1>Genre Stats</h1>
        <div className="d-flex justify-content-around">
          <Row className={style.stat}>
            <Pie type={PieController} data={data} options={options} />
          </Row>
          <Row className={style.stat}>
            <PolarArea
              type={PolarAreaController}
              data={data}
              options={options}
            />
          </Row>
        </div>
      </div>
      <div>
        <h1>Time Stats</h1>
        <div className="d-flex justify-content-around">
          <Row className={style.stat}>
            <Line type={LineController} data={dataY} options={options} />
          </Row>
          <Row className={style.stat}>
            <Line type={LineController} data={dataW} options={options} />
          </Row>
        </div>
      </div>
      <div>
        <h1>Release Movies Stat</h1>
        <Col className={style.stat}>
          <Pie type={PieController} data={dataMovieYear} options={options} />
        </Col>
      </div>
    </Container>
  );
};

export default Graph;
