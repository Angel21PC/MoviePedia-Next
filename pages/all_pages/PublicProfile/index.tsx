import { NextPage } from "next";
import { useRouter } from "next/router";

//components
import NavBar from "../../../components/NavBar/index";

//componentes-p

export interface ProfileProps {}

const PublicProfile: NextPage<ProfileProps> = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <NavBar />
    </>
  );
};

export default PublicProfile;
