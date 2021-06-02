import { NextPage } from "next";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

//components
//firebase
import { useAuth } from "../../../firebase/AuthContext";

//componentes-p
import NavBar from "../../../components/NavBar";
import PublicPofile from "../../../components/User/PublicProfile";
export interface ProfileProps {
  data: any;
}

const PublicProfile: NextPage<ProfileProps> = (props) => {
  const { data } = props;
  console.log(data);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <>
      <NavBar />
      <PublicPofile {...data} />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const { getCollections } = useAuth();
  const data = await getCollections();
  return { props: data };
};
export default PublicProfile;
