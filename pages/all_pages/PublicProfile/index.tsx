import { NextPage } from "next";
import { useRouter } from "next/router";

//componentes-p
import PublicPofile from "../../../components/User/PublicProfile";
export interface ProfileProps {
  query: any;
}

const PublicProfile: NextPage<ProfileProps> = ({ query }) => {
  const router = useRouter();

  const id = router.query.id;
  console.log(id);
  return (
    <>
      <PublicPofile id={id.toString()} />
    </>
  );
};

export default PublicProfile;
