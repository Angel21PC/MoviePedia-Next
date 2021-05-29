import React, { FC } from "react";

import { useEffect, useState, useLayoutEffect } from "react";

//comp-p
import CollectionFinder from "../Finder/index";
import SelectedMovies from "../Selector/Selected";
import CreatorForm from "./CreatorForm";
//components
import { Container, Row, Col, Button } from "react-bootstrap";
import Modal from "./Modal/index";
export interface CollectionCreatorProps {}

const CollectionCreator: FC<CollectionCreatorProps> = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShow] = useState([]);

  const collectionM = (id: number | string) => {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteM = (movie: any) => {
    setMovies(movies.filter((item) => item.id !== movie.id));
  };
  useEffect(() => {
    console.log({ movie: movies, shows: shows });
  }, [deleteM, movies]);

  return (
    <Container fluid>
      <Row>
        <Col xs lg="5">
          <div className="mt-4">
            <div className="d-flex justify-content-center">
              <button
                disabled={movies.length > 0 || shows.length > 0 ? false : true}
                className="btn btn-block create-account"
                onClick={() => setIsOpen(true)}
              >
                Listo
              </button>
              <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                <CreatorForm
                  movies={movies}
                  shows={shows}
                  close={() => setIsOpen(false)}
                />
              </Modal>
            </div>

            <SelectedMovies
              movie={movies}
              show={shows}
              deleteMovies={deleteM}
            />
          </div>
        </Col>

        <Col lg="7">
          <CollectionFinder
            getMovies={setMovies}
            getShow={setShow}
            m={movies}
            s={shows}
          />
        </Col>
      </Row>
      <style jsx>{`
        .create-account {
          border-radius: 30px;
          padding: 10px 20px;
          font-size: 18px;
          font-weight: bold;
          background-color: #5791ff;
          border: none;
          color: white;
          margin-top: 20px;
        }
      `}</style>
    </Container>
  );
};

export default CollectionCreator;
