import React, { FC, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
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
    <div onClick={() => setOpen(!open)} className="border border-dark rounded">
      <div className="d-flex mt-1">
        <h4 className="mr-3 pr-3">{name}</h4>
        <h3 className="ml-3 pl-3">Episode Count:{episode_count}</h3>
      </div>
      <Collapse in={open} className="border border-dark border-bottom-0">
        <div>
          {overview == "" ? "Sorry, the overview is not defined" : overview}
        </div>
      </Collapse>
    </div>
  );
};

export default ItemSeason;
