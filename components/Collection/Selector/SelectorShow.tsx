import { mainModule } from "node:process";
import React, { FC } from "react";

//component-p
import Poster from "../../SelectUtils/Poster/index";

export interface CollectionSelectorSProps {
  s: any;
  collection: any;
  ss: any;
}

const CollectionSelectorS: FC<CollectionSelectorSProps> = ({
  s,
  collection,
  ss,
}) => {
  const send = () => {
    let check = false;
    ss.map((e) => {
      if (e.id == s.id) {
        check = true;
      }
    });
    if (!check) {
      collection((oldArray) => [...oldArray, s]);
    }
  };

  return (
    <div onClick={send} key={s.id}>
      <Poster c="movie_posterCOL" movie={s} />
    </div>
  );
};

export default CollectionSelectorS;
