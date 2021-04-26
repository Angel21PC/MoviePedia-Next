import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";
//initialprops
import { URL, api_rutesM } from "../../../firebase/config/rute_api";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//components
import NavBar from "../../../components/Top-Components/NavBar/index";
import ListM from "../../../components/Top-Components/List/index";

export interface ListProps {
  data: any;
}

const List: NextPage<ListProps> = () => {
  //firebase
  const currentUser = useAuth();
  const { getListMovies } = useAuth();

  const [data, setData] = useState();

  useEffect(() => {
    async function getDataList() {
      if (currentUser.currentUser !== null) {
        let r = await getListMovies(currentUser.currentUser.email);
        setData(r);
      }
    }
    getDataList();
  }, []);

  const router = useRouter();

  if (currentUser.currentUser !== null) {
    return (
      <>
        <NavBar />
        <ListM {...data} />
      </>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default List;
