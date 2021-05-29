//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component
import NavBar from "../../../components/NavBar/index";
import AllColl from "../../../components/Collection/AllColl";

export interface CollectionsProps {
  query: any;
}

const Collections: NextPage<CollectionsProps> = () => {
  return (
    <>
      <NavBar />
      <AllColl />
    </>
  );
};

export default Collections;
