import React, { FC, useEffect, useState, useLayoutEffect } from "react";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { Container, Row, Form } from "react-bootstrap";
import ItemFlip from "./item";
import Loading from "../../util/Loading/index";
export interface AllColProps {}

const AllCol: FC<AllColProps> = () => {
  const { getCollections, getCollectionsByDate, getCollectionsByLike } =
    useAuth();
  const [collections, setCollections] = useState([]);
  //load
  const [isPending, setIsPending] = useState(false); // variable para la pantalla de carga
  const [filter, setFilter] = useState("New");
  useEffect(() => {
    async function fetchDataNew() {
      setIsPending(true);
      const response = await getCollections();
      setCollections(response);
      setIsPending(false);
    }

    async function fetchDataDate() {
      setIsPending(true);
      //del primero al ultimo
      const response = await getCollectionsByDate();
      setCollections(response);
      setIsPending(false);
    }

    async function fetchDataLikes() {
      setIsPending(true);
      const response = await getCollectionsByLike();
      setCollections(response);
      setIsPending(false);
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
      {isPending === true ? (
        <div className="d-flex justify-content-center mt-5">
          <Loading />
        </div>
      ) : (
        <Row className="justify-content-between" lg={3} sm={2} xs={1}>
          {collections.map((c) => (
            <div className="collection mt-4 p-1 animate__animated animate__backInUp">
              <ItemFlip data={c}></ItemFlip>
            </div>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllCol;
