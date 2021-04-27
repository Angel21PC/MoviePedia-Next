import { NextPage } from "next";
import { useRouter } from "next/router";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import Graph from "../../../components/Min-Components/Graph/index";
//firebase
import { useAuth } from "../../../firebase/AuthContext";

export interface StadsProps {}

const Stads: NextPage<StadsProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();
  console.log(currentUser);
  if (currentUser.currentUser !== null) {
    return (
      <>
        <NavBar />
        <Graph />
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Stads;
