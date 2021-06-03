import { NextPage } from "next";

//components

import FormL from "../../../components/util/Form/Form_login";

export interface LogInProps {}

const LogIn: NextPage<LogInProps> = () => {
  return (
    <>
      <FormL />
    </>
  );
};

export default LogIn;
