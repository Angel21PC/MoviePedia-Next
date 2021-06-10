import React, { FC, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
//request
import axios from "axios";
import { URL, api_rutesTv } from "../../../config/rute_api";

import ItemSeason from "./item";
export interface SeasonProps {
  id: string;
  seasons: [];
}

const Season: FC<SeasonProps> = (props) => {
  console.log({ SEASONCOMPONENT: props });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className="mb-5">Season</h2>
      {props.seasons?.map((s) => (
        <ItemSeason {...s} />
      ))}
    </div>
  );
};

export default Season;
