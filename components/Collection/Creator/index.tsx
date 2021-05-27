import React, { FC } from "react";

import { useEffect, useState } from "react";

//comp-p
import CollectionFinder from "../Finder/index";
import CollectionSelector from "../Selector/index";

//components
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

export interface CollectionCreatorProps {}

const CollectionCreator: React.SFC<CollectionCreatorProps> = () => {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState([]);

  const collectionM = (id: number | string) => {};
  return (
    <Container>
      <button
        onClick={() => {
          console.log(movies);
        }}
      >
        e
      </button>
      <Col lg="4">
        <CollectionFinder getMovies={setMovies} />
      </Col>
      <Col lg="6">{/* lista de seleccionados */}</Col>
    </Container>
  );
};

export default CollectionCreator;
