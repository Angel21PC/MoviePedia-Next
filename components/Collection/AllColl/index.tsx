import React, { FC, useEffect, useState } from "react";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Container, Row, Col, Button } from "react-bootstrap";
import ItemFlip from "./item";
export interface AllColProps {}

const AllCol: FC<AllColProps> = () => {
  const { getCollections } = useAuth();
  const [collections, setCollections] = useState([]);
  //   const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getCollections();
      setCollections(response);
    }
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-between" lg={3} sm={2} xs={1}>
        {collections.map((c) => (
          <div className="collection mt-4 p-1">
            <ItemFlip data={c}></ItemFlip>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default AllCol;
