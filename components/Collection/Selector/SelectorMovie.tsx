import React, { FC } from "react";

//component-p
import Poster from "../../SelectUtils/Poster/index";

export interface CollectionSelectorProps {
  m: any;
  collection: any;
}

const CollectionSelector: React.SFC<CollectionSelectorProps> = ({
  m,
  collection,
}) => {
  const send = () => {
    collection((oldArray) => [...oldArray, m]);
  };

  return (
    <div onClick={send} key={m.id}>
      <Poster c="movie_poster" movie={m} />
    </div>
  );
};

export default CollectionSelector;
