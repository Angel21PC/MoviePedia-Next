import React, { FC, useEffect, useState } from "react";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ItemFlip from "./item";
export interface AllColProps {}

const AllCol: FC<AllColProps> = () => {
  const { getCollections, getCollectionsByDate, getCollectionsByLike } =
    useAuth();
  const [collections, setCollections] = useState([]);
  const [filter, setFilter] = useState("New");
  useEffect(() => {
    async function fetchDataNew() {
      const response = await getCollections();
      setCollections(response);
    }

    async function fetchDataDate() {
      //del primero al ultimo
      const response = await getCollectionsByDate();
      setCollections(response);
    }

    async function fetchDataLikes() {
      const response = await getCollectionsByLike();
      setCollections(response);
    }
    switch (filter) {
      case "New":
        fetchDataNew();
        break;
      case "Date":
        fetchDataDate();
        break;
      case "Liked":
        fetchDataLikes();
        break;
      default:
        break;
    }
  }, [filter]);

  const handleSelect = (e) => {
    switch (e.currentTarget.value) {
      case "New":
        setFilter("New");
        break;
      case "Date":
        setFilter("Date");
        break;
      case "Liked":
        setFilter("Liked");
        break;

      default:
        break;
    }
  };

  return (
    <Container fluid>
      <div>
        <Form>
          <Form.Group controlId="SelectFilter">
            <Form.Label>Filtrar por:</Form.Label>
            <Form.Control as="select" size="sm" custom onChange={handleSelect}>
              <option value="New" key="New">
                New
              </option>
              <option value="Date" key="Date">
                Date
              </option>
              <option value="Liked" key="Liked">
                Liked
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
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
