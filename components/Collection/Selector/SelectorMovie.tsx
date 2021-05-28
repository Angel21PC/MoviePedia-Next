import { mainModule } from "node:process";
import React, { FC } from "react";

//component-p
import Poster from "../../SelectUtils/Poster/index";

export interface CollectionSelectorProps {
  m: any;
  collection: any;
  mm: any;
}

const CollectionSelector: React.SFC<CollectionSelectorProps> = ({
  m,
  collection,
  mm,
}) => {
  const send = () => {
    let check = false;
    mm.map((e) => {
      if (e.id == m.id) {
        check = true;
      }
    });
    if (!check) {
      collection((oldArray) => [...oldArray, m]);
    }
  };

  return (
    <div onClick={send} key={m.id}>
      <Poster c="movie_poster" movie={m} />
    </div>
  );
};

export default CollectionSelector;
