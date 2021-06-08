import React, { FC, useState, useEffect } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//components
import { Container, Row, Image } from "react-bootstrap";
import LstM from "../../List/ListMovie/index";
import LstTv from "../../List/ListTv/index";

import M_B_F from "./M_button_F";
export interface OneCollectionProps {
  id: any;
}

const OneCollection: FC<OneCollectionProps> = ({ id }) => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [result, setResult] = useState({
    response: { data: { title: "s", description: "" } },
    url: "a",
    userLikes: [],
  });
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
    <Container className="mt-3">
      <Container>
        <div className="d-flex justify-content-center">
          <div className="justify-content-center">
            <M_B_F
              id={id}
              title={result?.response.data.title}
              userLikes={result?.userLikes}
            />
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: result?.response?.data?.description,
              }}
            ></div>
          </div>
          <Image src={result?.url} alt="s" className="poster rounded" />
        </div>
      </Container>

      <Container fluid>
        <hr />
        <Row className="justify-content-between" lg={4} sm={2} xs={1}>
          {movies?.map((m) => (
            <div key={m.id}>
              <LstM {...{ id: m }} />
            </div>
          ))}

          {shows?.map((s) => (
            <div key={s.id}>
              <LstTv {...{ id: s }} />
            </div>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default OneCollection;
