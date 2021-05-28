//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component
import NavBar from "../../../components/NavBar/index";
import OneCollection from "../../../components/Collection/PageCollection/index";

export interface SelectCollProps {
  query: any;
}

const SelectColl: NextPage<SelectCollProps> = ({ query }) => {
  const router = useRouter();

  const id = router.query.id;
  return (
    <>
      <NavBar />
      <OneCollection id={id} />
    </>
  );
};

export default SelectColl;
