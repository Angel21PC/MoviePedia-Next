import React, { FC, useEffect, useState } from "react";
//firebase
import { useAuth } from "../../../firebase/AuthContext";
import { Row } from "react-bootstrap";
import ItemFlip from "../AllColl/item";
export interface IntComGetDataProps {
  Coll: any;
}

const IntComGetData: FC<IntComGetDataProps> = ({ Coll }) => {
  const { getCollectionByID } = useAuth();
  const [collection, setCollection] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await getCollectionByID(Coll);
      setCollection(result.response);
    }
    fetchData();
  }, []);

  console.log({ aaaaaaaaaaaaaaaaaaaaaaaa: collection });
  return (
    <Row lg={2}>
      {collection !== "" ? (
        <div className="collection mt-4 p-1">
          <ItemFlip data={{ data: collection }}></ItemFlip>
        </div>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default IntComGetData;
