import { NextPage } from "next";
import { useAuth } from "../../../firebase/AuthContext";
import { useRouter } from "next/router";
//components
import Stats from "../../../components/util/Graph/index";

export interface StadsProps {}

const Stads: NextPage<StadsProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();

  if (currentUser.currentUser !== null) {
    return (
      <>
        <Stats />
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Stads;
