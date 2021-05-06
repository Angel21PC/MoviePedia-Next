import { useEffect, useState } from "react";
import axios from "axios";

import useSWR from "swr";
//Next
import Link from "next/link";

//componentes
import { Container, Row, Form, Button } from "react-bootstrap";

//component-p
import Poster from "../../Min-Components/Poster/index";
import Loading from "../../Top-Components/Loading/index";
import MovieS from "../../../pages/all_pages/Movie_select";
export interface ExplorerProps {
  api_rutes: any;
  m_s: string;
  initialData: any;
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Explorer: React.SFC<ExplorerProps> = ({
  initialData,
  api_rutes,
  m_s,
}) => {
  const [fetchUrl, setFetchUrl] = useState(api_rutes.Popular); // consulta inicial
  const [movies, setMovies] = useState([]); //recoge todos los datos de la consulta
  const [genre, setGenre] = useState([]); //todos los qeneros disponibles para filtrar
  const [isPending, setIsPending] = useState(false); // variable para la pantalla de carga

  const [page, setPage] = useState<number>(1);

  const [target_genre, setTargetGenre] = useState([]); //todos los qeneros disponibles para filtrar

  const { data, error } = useSWR("/api/movie/TopM", fetcher, {
    initialData: { data: initialData.results },
  });

  useEffect(() => {
    async function fetchData() {
      setMovies([]); //vaciamos el array
      setIsPending(true); //cargamos la animacion

      const request = await data;
      console.log(request);
      setTimeout(() => {
        //ejecutamos
        setIsPending(false);
        if (request.data.results) {
          setMovies(request.data.results);
        } else {
          setMovies(initialData.results);
        }
      }, 2500);
      // console.log(request);
      return request;
    }
    fetchData();
  }, [data, page]);

  const handleSelect = (e) => {
    switch (e.currentTarget.value) {
      case "Popular":
        setFetchUrl(api_rutes.Popular);
        break;
      case "Top":
        setFetchUrl(api_rutes.Top);
        break;
      case "Upcoming":
        setFetchUrl(api_rutes.Upcoming);
        break;
      default:
        setTargetGenre(e.currentTarget.value);
        break;
    }
  };
  console.log("ei");
  console.log(movies);

  return (
    <>
      <div className="explorer">
        <div className="explorer_content">
          <Container fluid="md">
            <div className="explorer_Seach">
              <Form>
                <Form.Group controlId="SelectFilter">
                  <Form.Label>Filtrar por:</Form.Label>
                  <Form.Control
                    as="select"
                    size="sm"
                    custom
                    onChange={handleSelect}
                    className="seach"
                  >
                    <option value="Popular" key="Popular">
                      Popular
                    </option>
                    <option value="Top" key="Top">
                      Top
                    </option>
                    <option value="Upcoming" key="Upcoming">
                      Upcoming
                    </option>
                    {genre.map(
                      //generos de busqueda
                      (o) => (
                        <option value={o.id} key={o.name}>
                          {o.name}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>

            <Row
              id="laya"
              className={
                isPending
                  ? "justify-content-center"
                  : "col-xs-1 justify-content-between"
              }
              lg={4}
              sm={3}
            >
              {isPending && (
                <div className="justify-content-center">
                  <Loading />{" "}
                </div>
              )}

              {movies?.map((
                movie //saca las peliculas
              ) => (
                <div key={movie?.id} className="mt-2">
                  <Link
                    href={{
                      pathname: m_s,
                      query: { id: movie.id },
                    }}
                    key={movie?.id}
                  >
                    <a>
                      <Poster c="poster" movie={movie} />
                    </a>
                  </Link>
                </div>
              ))}
            </Row>

            <div className="explorer_button">
              <Button
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                    console.log(page);
                  }
                }}
              >
                Dame menos bb
              </Button>
              <Button
                onClick={() => {
                  setPage(page + 1);
                  console.log(page);
                }}
              >
                Dame mas bb
              </Button>
            </div>
          </Container>
        </div>
      </div>
      <style jsx>{`
        .explorer {
          margin-top: 1%;
          position: relative;
          height: 100%;
          width: 100%;
        }

        .explorer h1 {
          color: black;
          text-align: center;
        }

        .explorer_content {
          display: flex;
          justify-content: center;
          padding: 10px;
        }

        .seach {
          background-color: rgba(128, 128, 128, 0.438);
          width: 125px;
          text-align: center;
          margin-left: 10px;
        }

        .explorer_Seach {
          margin-left: 4px;
        }

        .explorer_button {
          display: flex;
          justify-content: space-between;
          margin-top: 2%;
          margin-bottom: 1%;
        }

        li {
          list-style: none;
        }
      `}</style>
    </>
  );
};

export default Explorer;
