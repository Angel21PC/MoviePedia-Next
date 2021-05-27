import React, { FC } from "react";
import { useState, useEffect } from "react";
import { URL, api_rutesM } from "../../../config/rute_api";

//components
import FindCollectionMovie from "./FindCollectionMovie";
import FindCollectionTv from "./FindCollectionTv";
//COMPONENTS
import {
  Tabs,
  Tab,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

export interface CollectionFinderProps {
  getMovies: any;
  getShow: any;
}

const CollectionFinder: React.SFC<CollectionFinderProps> = ({
  getMovies,
  getShow,
}) => {
  const [find, setFind] = useState("");

  const change = (data: any) => {
    // console.log(data.target.value);
    setFind(data.target.value);
  };

  useEffect(() => {}, [find]);

  return (
    <>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Seach"
            aria-label="Seach"
            aria-describedby="basic-addon2"
            onChange={change}
          />
        </InputGroup>

        <Tabs
          variant="pills"
          className="justify-content-md-center"
          defaultActiveKey="Movies"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Movies" title="Movies">
            <FindCollectionMovie id={find} getMovies={getMovies} />
          </Tab>
          <Tab eventKey="Shows" title="TV Shows">
            <FindCollectionTv id={find} getShow={getShow} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default CollectionFinder;
