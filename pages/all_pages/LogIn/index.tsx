import { NextPage } from "next";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import FormL from "../../../components/Min-Components/Form/Form_login";

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
