import { NextPage } from "next";
import { useRouter } from "next/router";

//components
import NavBar from "../../../components/NavBar/index";

//componentes-p
import ProfileComp from "../../../components/User/ProfileComp";

export interface ProfileProps {}
//firebase
import { useAuth } from "../../../firebase/AuthContext";

const Profile: NextPage<ProfileProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();

  if (currentUser.currentUser !== null) {
    return (
      <>
        <NavBar />
        <ProfileComp />
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Profile;
