import React, { FC } from "react";

import { useEffect, useState, useLayoutEffect } from "react";

//comp-p
import CollectionFinder from "../Finder/index";
import SelectedMovies from "../Selector/Selected";
import CreatorForm from "./CreatorForm";
//components
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import Modal from "./Modal/index";
export interface CollectionCreatorProps {}

const CollectionCreator: React.SFC<CollectionCreatorProps> = () => {
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
    <Container>
      <button onClick={() => setIsOpen(true)}>Listo</button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <CreatorForm
          movies={movies}
          shows={shows}
          close={() => setIsOpen(false)}
        />
      </Modal>
      <Col lg="6">
        <SelectedMovies movie={movies} show={shows} deleteMovies={deleteM} />
      </Col>
      <Col lg="4">
        <CollectionFinder
          getMovies={setMovies}
          getShow={setShow}
          m={movies}
          s={shows}
        />
      </Col>
    </Container>
  );
};

export default CollectionCreator;
