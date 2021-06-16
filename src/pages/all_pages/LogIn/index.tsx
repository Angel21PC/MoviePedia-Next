import { NextPage } from "next";

//components

import FormL from "../../../components/util/Form/Form_login";
import Footer from "../../../components/util/Footer";
export interface LogInProps {}

const LogIn: NextPage<LogInProps> = () => {
  return (
    <>
      <FormL />
      <Footer></Footer>
    </>
  );
};

export default LogIn;
