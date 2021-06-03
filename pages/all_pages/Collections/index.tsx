//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component

import AllColl from "../../../components/Collection/AllColl";

export interface CollectionsProps {
  query: any;
}

const Collections: NextPage<CollectionsProps> = () => {
  return (
    <>
      <AllColl />
    </>
  );
};

export default Collections;
