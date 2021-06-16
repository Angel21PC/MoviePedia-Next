import { NextPage } from "next";
import { useRouter } from "next/router";

//componentes-p
import ProfileComp from "../../../components/User/ProfileComp";
import Footer from "../../../components/util/Footer";
export interface ProfileProps {}
//firebase
import { useAuth } from "../../../firebase/AuthContext";

const Profile: NextPage<ProfileProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();

  if (currentUser.currentUser !== null) {
    return (
      <>
        <div style={{ minHeight: "900px" }}>
          <ProfileComp />
        </div>

        <Footer></Footer>
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Profile;
