import { NextPage } from "next";

//components
import Footer from "../../../components/util/Footer";
import FormS from "../../../components/util/Form/Form_singup";

export interface SingUpProps {}

const SingUp: NextPage<SingUpProps> = () => {
  return (
    <>
      <FormS />
      <Footer></Footer>
    </>
  );
};

export default SingUp;
