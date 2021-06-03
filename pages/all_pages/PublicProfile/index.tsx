import { NextPage } from "next";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

//components
//firebase
import { useAuth } from "../../../firebase/AuthContext";

//componentes-p
import PublicPofile from "../../../components/User/PublicProfile";
export interface ProfileProps {
  query: any;
}

const PublicProfile: NextPage<ProfileProps> = ({ query }) => {
  const router = useRouter();

  const id = router.query.id;

  return (
    <>
      <PublicPofile id={id.toString()} />
    </>
  );
};

export default PublicProfile;
