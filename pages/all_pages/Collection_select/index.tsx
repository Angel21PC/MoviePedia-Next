//next
import { NextPage } from "next";
import { useRouter } from "next/router";

//component
import OneCollection from "../../../components/Collection/PageCollection/index";
import Footer from "../../../components/util/Footer";
export interface SelectCollProps {
  query: any;
}

const SelectColl: NextPage<SelectCollProps> = ({ query }) => {
  const router = useRouter();

  const id = router.query.id;
  return (
    <>
      <OneCollection id={id} />
      <Footer></Footer>
    </>
  );
};

export default SelectColl;
