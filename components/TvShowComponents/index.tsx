import React, { FC } from "react";
import { useEffect, useState } from "react";

//request
import axios from "axios";
import { URL, api_rutesTv } from "../../config/rute_api";

//components-p
import Poster from "../SelectUtils/Poster/index";
import Overview from "./Overview/index";
import Cast from "../SelectUtils/Cast/index";
import Avaliable from "../SelectUtils/Avaliable/index";
import M_B_F from "./M_button_F/index";
import Video from "../MovieComponents/Video/index";
import Loading from "../util/Loading/index";
import Similar from "../SelectUtils/SimilarM/index";
import Comments from "./Comments/index";
import CriticList from "../util/Critic/TvShow/index";
import Season from "./Season";
//components
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
export interface TvProps {
  data: any;
}

const Tv: FC<TvProps> = ({ data }) => {
  const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
  const movie = data; //recoge todos los datos de la consulta
  const [cast, setCast] = useState();
  const [provider, setProvider] = useState();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    //request para extraer el cast
    async function fetchDataCast() {
      const request = await axios.get(URL + api_rutesTv.Cast, {
        params: {
          id: movie.id,
        },
      });
      setCast(request.data);
      return request;
    }

    //request para extraer los providers
    async function fetchDataProvider() {
      const request = await axios.get(URL + api_rutesTv.Provider, {
        params: {
          id: movie.id,
        },
      });
      setProvider(request.data);
      // console.log(request)
      return request;
    }

    async function fetchDataViedo() {
      const request = await axios.get(URL + api_rutesTv.Video, {
        params: {
          id: movie.id,
        },
      });
      //console.log("mira el video ");
      //console.log(request.data.data);
      setVideo(request.data.data);
      return request;
    }

    //request para extraer las peliculas
    async function go() {
      setIsPending(true); //cargamos la animacion
      setTimeout(() => {
        //ejecutamos
        fetchDataCast();
        fetchDataProvider();
        fetchDataViedo();
        setIsPending(false);
        //console.log(cast);
      }, 2500);
    }
    go();
  }, [data]);

  return (
    <Container className="containerr" fluid>
      <Row className="justify-content-md-center" xs={1} md={2}>
        {isPending ? (
          <div className="vertical-center justify-content-center">
            <Loading />
          </div>
        ) : (
          <>
            <Col className="movie" xs lg="4">
              <div className="justify-content-center">
                <Poster c="movie_poster" movie={movie} />
                <div className="mt-4">
                  <Avaliable provider={provider} />
                </div>
              </div>
              <div>
                <Tabs
                  className="justify-content-center mt-4"
                  defaultActiveKey="Comments"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="Comments" title="Comments">
                    <div className="comentarios_container mt-4  ">
                      <Comments id={movie.id} />
                    </div>
                  </Tab>
                  <Tab eventKey="Critics" title="Critics">
                    <div className="comentarios_container mt-4  ">
                      <CriticList id={movie.id} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
              <div>
                <Season {...movie} />
              </div>
            </Col>
            <Col className="text" xs lg="6">
              <div className="text_title">
                <M_B_F movie={movie} />
              </div>
              <hr />
              <Overview movie={movie} cast={cast} />

              <div className="actors_container">
                <Cast cast={cast} />
              </div>
              <div className="video_container">
                <Video data={video}></Video>
              </div>
              <div className="similar_container mt-3 mb-5">
                <Similar m_s={"/all_pages/Show_select"} id={movie.id} />
              </div>
            </Col>
          </>
        )}
      </Row>
      <style jsx>{`
        .text {
          margin-top: 7vh;
          padding-left: 30px;
        }

        .actors_container {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
        }

        .actor p {
          padding-top: 5px;
          padding-left: 15px;
        }

        .providers_container {
          width: 90%;
        }
        .movie h5 {
          margin-top: 2vh;
          width: 80%;
          text-align: center;
        }
        .text_title {
          display: flex;
        }
        .video_container {
          margin-top: 10%;
          width: 100%;
        }
      `}</style>
    </Container>
  );
};

export default Tv;
