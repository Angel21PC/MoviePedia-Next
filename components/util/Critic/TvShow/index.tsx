import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../../firebase/AuthContext";

import Modal from "./Modal";
import Critic from "./Critic";
import MinCritic from "./MinCritic";

//butons
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
export interface CriticListProps {
  id: string;
}

const CriticList: FC<CriticListProps> = ({ id }) => {
  const { getMinCriticTV } = useAuth();
  const currentUser = useAuth();

  const [critics, setCritics] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    //get comments
    async function criticsData() {
      const response = await getMinCriticTV(id);
      let orderDate = response?.sort((a, b) => a.date - b.date);
      setCritics(orderDate);
    }
    criticsData();
  }, [show]);
  return (
    <div className="border-1 rounded">
      <div className="p-2 border-1">
        {critics?.map((cri) => (
          <div key={cri.title} className="mt-2">
            <MinCritic {...{ id_movie: id, ...cri }} />
          </div>
        ))}
      </div>
      <div className="mt-2 d-flex">
        <div>
          <AwesomeButton type="primary" onPress={() => setShow(true)}>
            Open Editor
          </AwesomeButton>
          <Modal show={show} onClose={() => setShow(false)}>
            <div className="p-3 mt-3">
              <Critic id={id} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CriticList;
