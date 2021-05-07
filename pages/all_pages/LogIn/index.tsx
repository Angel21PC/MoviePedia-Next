import { NextPage } from "next";

//components
import NavBar from "../../../components/NavBar/index";
import FormL from "../../../components/util/Form/Form_login";

export interface LogInProps {}

const LogIn: NextPage<LogInProps> = () => {
  return (
    <>
      <NavBar />
      <FormL />
    </>
  );
};

export default LogIn;
