import { NextPage } from "next";

//components
import NavBar from "../../../components/NavBar/index";
import FormS from "../../../components/util/Form/Form_singup";

export interface SingUpProps {}

const SingUp: NextPage<SingUpProps> = () => {
  return (
    <>
      <NavBar />
      <FormS />
    </>
  );
};

export default SingUp;
