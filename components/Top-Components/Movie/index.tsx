import { useEffect, useState } from "react";

//request
import axios from "axios";
import { URL, api_rutes } from "../../../pages/all_pages/config/rute_api";

//components-p
import Poster from "../../Min-Components/Poster/index";
import Overview from "../../Min-Components/Overview/index";
import Cast from "../../Min-Components/Cast/index";
import Avaliable from "../../Min-Components/Avaliable/index";
import M_B_F from "../../Min-Components/M_button_F/index";
import Video from "../../Min-Components/Video/index";

//components
import { Container, Row, Col } from "react-bootstrap";

export interface MovieProps {
  data: any;
}

const Movie: React.SFC<MovieProps> = ({ data }) => {
  const [isPending, setIsPending] = useState(true); // variable para la pantalla de carga
  const movie = data; //recoge todos los datos de la consulta
  const [cast, setCast] = useState();
  const [provider, setProvider] = useState();

  useEffect(() => {
    //request para extraer el cast
    async function fetchDataCast() {
      const request = await axios.get(URL + api_rutes.Cast, {
        params: {
          id: movie.id,
        },
      });
      setCast(request.data);
      return request;
    }

    //request para extraer los providers
    async function fetchDataProvider() {
      const request = await axios.get(URL + api_rutes.Provider, {
        params: {
          id: movie.id,
        },
      });
      setProvider(request.data);
      // console.log(request)
      return request;
    }

    //request para extraer las peliculas
    async function go() {
      setIsPending(true); //cargamos la animacion
      setTimeout(() => {
        //ejecutamos
        fetchDataCast();
        fetchDataProvider();
        setIsPending(false);
        console.log(cast);
      }, 1500);
    }
    go();
  }, []);

  return (
    <Container className="containerr" fluid>
      <Row className="justify-content-md-center" xs={1} md={2}>
        {isPending ? (
          <div className="load">
            {" "}
            <img
              src="https://rubico.com.mx/cultivandoelentendimiento_no_PHP/assets/img/demo/loader.gif"
              alt=""
            />
          </div>
        ) : (
          <>
            <Col className="movie" xs lg="4">
              <div className="movie_back">
                <Poster c="movie_poster" movie={movie} />
              </div>
              <div className="providers_container">
                <Avaliable provider={provider} />
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
                <Video {...movie}></Video>
              </div>
            </Col>
          </>
        )}
      </Row>
      <style jsx>{`
        .load {
          position: absolute;
        }

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
          width: 80%;
          display: flex;
          justify-content: center;
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

export default Movie;
