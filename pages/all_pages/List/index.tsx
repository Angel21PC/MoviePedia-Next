import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

//components
import NavBar from "../../../components/NavBar/index";
import ListM from "../../../components/User/List/index";

export interface ListProps {
  data: any;
}

const List: NextPage<ListProps> = () => {
  //firebase
  const currentUser = useAuth();
  const { getListMovies, getListTv, getCollectionSaved } = useAuth();

  const [dataM, setDataM] = useState();
  const [dataTV, setDataTV] = useState();
  const [collection, setDataCollection] = useState();
  useEffect(() => {
    async function getDataListM() {
      if (currentUser.currentUser !== null) {
        let r = await getListMovies();
        console.log(r);
        setDataM(r);
      }
    }
    getDataListM();
    async function getDataListTV() {
      if (currentUser.currentUser !== null) {
        let r = await getListTv();
        console.log(r);
        setDataTV(r);
      }
    }
    getDataListTV();
    async function getDataCollection() {
      if (currentUser.currentUser !== null) {
        let r = await getCollectionSaved();
        console.log(r);
        setDataCollection(r);
      }
    }
    getDataCollection();
  }, []);

  return (
    <>
      <NavBar />
      <ListM dataM={dataM} dataTV={dataTV} dataC={collection} />
    </>
  );
};

export default List;
