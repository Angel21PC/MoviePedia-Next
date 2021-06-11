import React, { FC, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

import styles from "./Season.module.scss";

export interface ItemSeasonProps {
  name: any;
  overview: any;
  air_date: any;
  episode_count: any;
}

const ItemSeason: FC<ItemSeasonProps> = (props) => {
  const { name, overview, air_date, episode_count } = props;
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)} className={styles.seasonBox}>
      <div className="d-flex justify-content-center mt-2">
        <h5 className="mr-3 pr-3">{name}</h5>
        <h5 className="ml-3 pl-3">Episode Count:{episode_count}</h5>
      </div>
      <Collapse in={open} className={styles.seasonContent}>
        <div className="text-center">
          {overview == "" ? "Sorry, the overview is not defined" : overview}
        </div>
      </Collapse>
    </div>
  );
};

export default ItemSeason;
