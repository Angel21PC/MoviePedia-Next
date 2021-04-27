import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

//initialprops
import { URL, api_rutesM } from "../../../firebase/config/rute_api";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

export interface MyColProps {}

const MyCol: NextPage<MyColProps> = () => {
  const router = useRouter();
  const currentUser = useAuth();
  console.log(currentUser);
  if (currentUser.currentUser !== null) {
    return (
      <>
        <NavBar />
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default MyCol;
