import React, { FC, useEffect, useState } from "react";

import { Tabs, Tab, Container, Row } from "react-bootstrap";

//components-p
import LstM from "../../../List/ListMovie/index";
import LstTv from "../../../List/ListTv/index";

export interface ListEyeMTVProps {
  Movie: any;
  TV: any;
}

const ListEyeMTV: FC<ListEyeMTVProps> = ({ Movie, TV }) => {
  useEffect(() => {}, []);

  return (
    <Row>
      {Movie.map((e) => (
        <LstM {...e} />
      ))}
      {TV.map((e) => (
        <LstM {...e} />
      ))}
    </Row>
  );
};

export default ListEyeMTV;
