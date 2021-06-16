import { NextPage } from "next";
import { useRouter } from "next/router";

//componentes-p
import PublicPofile from "../../../components/User/PublicProfile";
import Footer from "../../../components/util/Footer";
export interface ProfileProps {
  query: any;
}

const PublicProfile: NextPage<ProfileProps> = ({ query }) => {
  const router = useRouter();

  const id = router.query.id;
  //console.log(id);
  return (
    <>
      <PublicPofile id={id.toString()} />
      <Footer></Footer>
    </>
  );
};

export default PublicProfile;
