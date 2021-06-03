import React, { FC, useEffect, useState } from "react";

import { Tabs, Tab, Container, Row } from "react-bootstrap";

//components-p
import LstM from "../../../List/ListMovie/index";
import LstTv from "../../../List/ListTv/index";

export interface ListMTVProps {
  Movie: any;
  TV: any;
}

const ListMTV: FC<ListMTVProps> = ({ Movie, TV }) => {
  return (
    <Row>
      {Movie.map((e) => (
        <LstM {...e} />
      ))}
      {TV.map((e) => (
        <LstTv {...e} />
      ))}
    </Row>
  );
};

export default ListMTV;
