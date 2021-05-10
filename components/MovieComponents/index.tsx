import { useEffect, useState } from "react";

//request
import axios from "axios";
import { URL, api_rutesM } from "../../config/rute_api";

//components-p
import Poster from "../SelectUtils/Poster/index";
import Overview from "./Overview/index";
import Cast from "../SelectUtils/Cast/index";
import Avaliable from "../SelectUtils/Avaliable/index";
import M_B_F from "./M_button_F/index";
import Video from "./Video/index";
import Loading from "../util/Loading/index";
import Similar from "../SelectUtils/SimilarM/index";

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
  const [video, setVideo] = useState(null);
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    //request para extraer el cast
    async function fetchDataCast() {
      const request = await axios.get(URL + api_rutesM.Cast, {
        params: {
          id: movie.id,
        },
      });
      setCast(request.data);
      return request;
    }

    //request para extraer los providers
    async function fetchDataProvider() {
      const request = await axios.get(URL + api_rutesM.Provider, {
        params: {
          id: movie.id,
        },
      });
      setProvider(request.data);
      // console.log(request)
      return request;
    }

    async function fetchDataViedo() {
      const request = await axios.get(URL + api_rutesM.Video, {
        params: {
          id: movie.id,
        },
      });
      setVideo(request.data.data);
      return request;
    }

    async function fetchDataSimilar() {
      const request = await axios.get(api_rutesM.Similar, {
        params: {
          id: movie.id,
        },
      });

      setSimilar(request.data.data.results);
      console.log(similar);
      return request;
    }
    //request para extraer las peliculas
    async function go() {
      setIsPending(true); //cargamos la animacion
      setTimeout(() => {
        //ejecutamos
        fetchDataSimilar();
        fetchDataCast();
        fetchDataProvider();
        fetchDataViedo();

        setIsPending(false);
        console.log(cast);
      }, 2500);
    }
    go();
  }, [data]);

  return (
    <Container className="containerr" fluid>
      <Row className="justify-content-md-center" xs={1} md={2}>
        {isPending ? (
          <div className="vertical-center justify-content-md-center">
            <Loading />
          </div>
        ) : (
          <>
            <Col className="movie" xs lg="4">
              <div className="justify-content-center">
                <Poster c="movie_poster" movie={movie} />
                <div className="mt-4">
                  <h4>Avaliable on:</h4>
                  <Avaliable provider={provider} />
                </div>
              </div>
              <div className="comentarios_container mt-4  ">
                <h5>Seccion de comentarios/criticas</h5>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
                <p>nsnnsnfnsnnf</p>
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
              <div className="similar_container mt-3">
                <Similar m_s={"/all_pages/Movie_select"} id={movie.id} />
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

export default Movie;
