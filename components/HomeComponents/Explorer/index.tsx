import React, { FC } from "react";

import { useEffect, useState } from "react";
import axios from "axios";

//Next
import Link from "next/link";

//componentes
import { Container, Row, Form, Button } from "react-bootstrap";

//component-p
import Poster from "../../SelectUtils/Poster/index";
import Loading from "../../util/Loading/index";

//style
import style from "./Explorer.module.scss";

export interface ExplorerProps {
  URL: string;
  api_rutes: any;
  m_s: string;
  initialData: any;
  genreMovies: any;
}

const Explorer: FC<ExplorerProps> = ({
  URL,
  api_rutes,
  m_s,
  initialData,
  genreMovies,
}) => {
  const [fetchUrl, setFetchUrl] = useState(""); // consulta inicial
  const [movies, setMovies] = useState(initialData); //recoge todos los datos de la consulta

  //load
  const [isPending, setIsPending] = useState(false); // variable para la pantalla de carga

  //datos consulta
  const [genre, setGenre] = useState(genreMovies); //todos los qeneros disponibles para filtrar
  const [page, setPage] = useState<number>(1);
  const [target_genre, setTargetGenre] = useState([]); //todos los qeneros disponibles para filtrar

  useEffect(() => {
    async function fetchDataMovie() {
      if (fetchUrl != "") {
        //request para extraer las peliculas
        setMovies([]); //vaciamos el array
        setIsPending(true); //cargamos la animacion

        const request = await axios.get(fetchUrl, {
          params: {
            p: page,
            g: target_genre,
          },
        });

        setTimeout(() => {
          //ejecutamos
          setIsPending(false);
          setMovies(request.data.data.results);
        }, 1500);

        return request;
      } else {
        setMovies(initialData);
      }
    }
    fetchDataMovie();
  }, [fetchUrl, page, target_genre]);

  const handleSelect = (e) => {
    switch (e.currentTarget.value) {
      case "Popular":
        setFetchUrl(URL + api_rutes.Popular);
        break;
      case "Top":
        setFetchUrl(URL + api_rutes.Top);
        break;
      case "Upcoming":
        setFetchUrl(URL + api_rutes.Upcoming);
        break;
      default:
        setTargetGenre(e.currentTarget.value);
        setFetchUrl(URL + api_rutes.Discover);
        break;
    }
  };

  return (
    <div className={style.explorer}>
      <div className={style.explorer_content}>
        <Container fluid="md">
          <div className={style.explorer_Seach}>
            <Form>
              <Form.Group controlId="SelectFilter">
                <Form.Label>Filtrar por:</Form.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  onChange={handleSelect}
                  className={style.seach}
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
                : "col-xs-1 justify-content-center"
            }
            lg={4}
            sm={3}
          >
            {isPending && (
              <div className="justify-content-center">
                <Loading />
              </div>
            )}

            {movies.map((
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
                    <Poster c="poster mt-2" movie={movie} />
                  </a>
                </Link>
              </div>
            ))}
          </Row>

          <div className={style.explorer_button}>
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
  );
};

export default Explorer;
