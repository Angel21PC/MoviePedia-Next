import React, { FC } from "react";

import { Row } from "react-bootstrap";

//components-p
import LstM from "../../../List/ListMovie/index";
import LstTv from "../../../List/ListTv/index";

export interface ListMTVProps {
  Movie: any;
  TV: any;
  list?: boolean;
  title: string;
}

const ListMTV: FC<ListMTVProps> = ({ Movie, TV, list, title }) => {
  console.log({ Movies: Movie, Shows: TV });
  if (list === true) {
    return (
      <div className="mt-3">
        <h2>{title}</h2>
        <Row>
          {Movie[0].list.map((e) => (
            <LstM {...{ id: e.id }} />
          ))}
          {TV[0].list.map((e) => (
            <LstTv {...{ id: e.id }} />
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h2>{title}</h2>
      <Row>
        {Movie[0].id_movie.map((e) => (
          <LstM {...{ id: e.id }} />
        ))}
        {TV[0].id_movie.map((e) => (
          <LstTv {...{ id: e.id }} />
        ))}
      </Row>
    </div>
  );
};

export default ListMTV;
