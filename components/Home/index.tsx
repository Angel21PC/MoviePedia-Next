import React, { FC } from "react";

import { useRouter } from "next/router";
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
//firebase
import { useAuth } from "../../firebase/AuthContext";
//style
import style from "./Home.module.scss";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export interface CasaProps {}

const Casa: FC<CasaProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();
  const [find, setFind] = useState(null);
  const [name, setName] = useState("");
  const { ConsultaID, getUserNameIDColl } = useAuth();

  useEffect(() => {
    async function getName() {
      const response = await ConsultaID();
      const name = await getUserNameIDColl(response);
      setName(name);
    }
    if (currentUser.currentUser.email) {
      getName();
    }
  }, []);

  const change = (data: any) => {
    //console.log(data.target.value);
    setFind(data.target.value);
  };

  const send = () => {
    if (find !== null && find !== "") {
      router.push({
        pathname: "/all_pages/Find",
        query: { id: find },
      });
    }
  };

  return (
    <Container fluid>
      <Col className={style.text}>
        <h1 className="mt-5 p-5 animate__animated animate__backInLeft">
          Welcome to MoviePedia {name}
        </h1>
        <div className={style.from}>
          <InputGroup className="mb-3 ml-5">
            <FormControl
              className="w-90"
              placeholder={"Search..."}
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={change}
            />
            <InputGroup.Append>
              <Button variant="dark" onClick={send}>
                <FontAwesomeIcon icon={faSearch} /> Find
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </Col>

      <video className={style.myVideo} autoPlay loop muted id="myVideo">
        <source
          src="https://agoodmovietowatch.com/wp-content/uploads/firstreformed-1.mp4"
          type="video/mp4"
        />
      </video>
    </Container>
  );
};

export default Casa;
