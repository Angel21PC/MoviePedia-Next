import { NextPage } from "next";
import { useRouter } from "next/router";
//components
import NavBar from "../../../components/Top-Components/NavBar/index";
export interface FindProps {
  data: any;
}

const Find: NextPage<FindProps> = () => {
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

export default Find;
