import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//components
import CollectionCreator from "../../../components/Collection/Creator";
import Footer from "../../../components/util/Footer";

export interface MyColProps {}

const MyCol: NextPage<MyColProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <CollectionCreator />
      <Footer></Footer>
    </>
  );
};

export default MyCol;
