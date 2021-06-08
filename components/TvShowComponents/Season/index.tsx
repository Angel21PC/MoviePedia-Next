import React, { FC, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
//request
import axios from "axios";
import { URL, api_rutesTv } from "../../../config/rute_api";

//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export interface SeasonProps {
  id: string;
  season: {
    id: string;
  };
}

const Season: FC<SeasonProps> = (props) => {
  console.log({ SEASONCOMPONENT: props });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchDataSeason() {
      ///tv/{tv_id}/season/{season_number}
      const request = await axios.get(URL + api_rutesTv.Cast, {
        params: {
          id: props.id,
          season: props.season.id,
        },
      });
    }
    fetchDataSeason();
  }, []);
  return (
    <>
      <AwesomeButton type="secondary" onPress={() => setIsOpen(!isOpen)}>
        click
      </AwesomeButton>
      <Collapse in={isOpen}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  );
};

export default Season;
