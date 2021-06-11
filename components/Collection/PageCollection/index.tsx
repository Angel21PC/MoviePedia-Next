import React, { FC, useState, useEffect } from "react";

//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { useRouter } from "next/router";
//components
import { Container, Row, Image, Col } from "react-bootstrap";
import LstM from "../../List/ListMovie/index";
import LstTv from "../../List/ListTv/index";

import M_B_F from "./M_button_F";
export interface OneCollectionProps {
  id: any;
}

const OneCollection: FC<OneCollectionProps> = ({ id }) => {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const [email, setEmail] = useState("");
  const [creator, setCreator] = useState("");
  const [result, setResult] = useState({
    response: { data: { title: "", description: "" }, userLikes: [] },
    url: "",
  });
  const { getCollectionByID, getUserNameIDColl } = useAuth();
  const [like, setLike] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCollectionByID(id);
      setResult(response);
      setMovies(response?.response.data.objArray.movies);
      setShows(response?.response.data.objArray.tv);
      setCreator(response?.response.data.user);
      setLike(response?.response.userLikes);
      const eml = await getUserNameIDColl(response.response.data.user);
      setEmail(eml);
    }
    fetchData();
  }, [id]);
  //console.log({ uuuu: like });
  return (
    <Container className="mt-3">
      <Col>
        <Row className="justify-content-center" md={2}>
          <Col className="justify-content-center mb-4">
            <Image src={result?.url} alt="s" className="poster rounded mb-4" />
            <h3>
              Created by{" "}
              <a
                className="text-link"
                onClick={() =>
                  router.push({
                    pathname: "/all_pages/PublicProfile",
                    query: { id: creator },
                  })
                }
              >
                {email}
              </a>
            </h3>
          </Col>
          <Col className="justify-content-center">
            <M_B_F
              id={id}
              title={result?.response.data.title}
              userLikes={like}
            />
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: result?.response?.data?.description,
              }}
            ></div>
          </Col>
        </Row>

        <Row>
          <hr />
          <Row className="justify-content-center" lg={3} sm={2} xs={1}>
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
        </Row>
      </Col>
    </Container>
  );
};

export default OneCollection;
