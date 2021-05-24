import { NextPage } from "next";
import { useEffect, useState } from "react";

import axios from "axios";

//initialprops
import { URL, api_rutesM } from "../../../config/rute_api";

//components
import NavBar from "../../../components/NavBar/index";

//firebase
import { useAuth } from "../../../firebase/AuthContext";

import Modal from "../../../components/util/Critic/Modal";
import Critic from "../../../components/util/Critic/Critic";
export interface MyColProps {}

const MyCol: NextPage<MyColProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <NavBar />

      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal show={show} onClose={() => setShow(false)}>
        <div className="p-3 mt-3">
          <Critic />
        </div>
      </Modal>
    </>
  );
};

export default MyCol;
