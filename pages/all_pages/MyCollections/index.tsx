import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//components
import NavBar from "../../../components/NavBar/index";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

import CollectionCreator from "../../../components/Collection/Creator";

export interface MyColProps {}

const MyCol: NextPage<MyColProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <NavBar />
      <CollectionCreator></CollectionCreator>
    </>
  );
};

export default MyCol;
