import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//components
import NavBar from "../../../components/NavBar/index";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

export interface MyColProps {}

const MyCol: NextPage<MyColProps> = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default MyCol;
