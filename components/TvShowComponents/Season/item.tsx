import React, { FC, useEffect, useState } from "react";

export interface ItemSeasonProps {
  title: any;
  overview: any;
  air_date: any;
  episode_count: any;
}

const ItemSeason: FC<ItemSeasonProps> = (props) => {
  const { title, overview, air_date, episode_count } = props;
  return (
    <div>
      <div></div>
    </div>
  );
};

export default ItemSeason;
