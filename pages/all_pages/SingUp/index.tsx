import { NextPage } from "next";

//components

import FormS from "../../../components/util/Form/Form_singup";

export interface SingUpProps {}

const SingUp: NextPage<SingUpProps> = () => {
  return (
    <>
      <FormS />
    </>
  );
};

export default SingUp;
