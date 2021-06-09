import { NextPage } from "next";

//components
import Footer from "../../../components/util/Footer";
import FormS from "../../../components/util/Form/Form_singup";

export interface SignUpProps {}

const SignUp: NextPage<SignUpProps> = () => {
  return (
    <>
      <FormS />
      <Footer></Footer>
    </>
  );
};

export default SignUp;
