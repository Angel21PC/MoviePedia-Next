import { NextPage } from "next";
//components
import NavBar from "../../../components/NavBar/index";
import Graph from "../../../components/util/Graph/index";

export interface StadsProps {}

const Stads: NextPage<StadsProps> = () => {
  return (
    <>
      <NavBar />
      <Graph />
    </>
  );
};

export default Stads;
