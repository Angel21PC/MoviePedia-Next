//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component

import AllColl from "../../../components/Collection/AllColl";
import Footer from "../../../components/util/Footer";
export interface CollectionsProps {
  query: any;
}

const Collections: NextPage<CollectionsProps> = () => {
  return (
    <>
      <div style={{ minHeight: "900px" }}>
        <AllColl />
      </div>

      <Footer></Footer>
    </>
  );
};

export default Collections;
