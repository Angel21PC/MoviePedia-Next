import React, { FC, useState, useEffect } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//components
import { Container, Row, Col, Image } from "react-bootstrap";
import LstM from "../../List/ListMovie/index";
import LstTv from "../../List/ListTv/index";
export interface OneCollectionProps {
  id: any;
}

const OneCollection: FC<OneCollectionProps> = ({ id }) => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [result, setResult] = useState();
  const { getCollectionByID } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getCollectionByID(id);
      setResult(response);
      setMovies(response.response.data.objArray.movies);
      setShows(response.response.data.objArray.tv);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center">
          <h3>{result?.response.data.title}</h3>
          <Image src={result?.url} alt="s" className="poster rounded" />
        </div>
        <div className="justify-content-center">
          <div
            dangerouslySetInnerHTML={{
              __html: result?.response?.data?.description,
            }}
          ></div>
        </div>
      </div>
      <Container fluid>
        <Col lg="5" className="justify-content-center">
          {movies?.map((m) => (
            <div key={m.id}>
              <LstM {...m} />
            </div>
          ))}
        </Col>
        <Col lg="5" className="justify-content-center">
          {shows?.map((s) => (
            <div key={s.id}>
              <LstTv {...s} />
            </div>
          ))}
        </Col>
      </Container>
    </div>
  );
};

export default OneCollection;
