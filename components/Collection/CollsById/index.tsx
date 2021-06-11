import React, { FC, useEffect, useState } from "react";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
import ItemFlip from "../AllColl/item";
export interface IntComGetDataProps {
  Coll: any;
}

const IntComGetData: FC<IntComGetDataProps> = ({ Coll }) => {
  //console.log(Coll);
  const { getCollectionByID } = useAuth();
  const [collection, setCollection] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await getCollectionByID(Coll);
      setCollection(result.response);
    }
    fetchData();
  }, []);

  return (
    <>
      {collection !== "" ? (
        <div className="collection mt-4 p-1">
          <ItemFlip data={{ data: collection }} id={Coll}></ItemFlip>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default IntComGetData;
