import React, { FC, useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import ItemSeason from "./item";

import styles from "./Season.module.scss";
export interface SeasonProps {
  id: string;
  seasons: [];
}

const Season: FC<SeasonProps> = (props) => {
  //console.log({ SEASONCOMPONENT: props });
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2 className="mb-5" onClick={() => setOpen(!open)}>
        View Season{" "}
        <FontAwesomeIcon className={styles.seasonIcon} icon={faThList} />
      </h2>
      <Collapse in={open}>
        <div>
          {props.seasons?.map((s) => (
            <ItemSeason {...s} />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Season;
